import { useCallback, useRef, useState } from 'react';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

interface UseChatResult {
  messages: ChatMessage[];
  streamingText: string;
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  reset: () => void;
}

const ENDPOINT = '/api/chat';

/**
 * Hook che gestisce lo stato della chat e la comunicazione streaming SSE
 * con la Vercel Function. Espone una API minimale per la UI.
 */
export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Evita race condition se l'utente invia in rapida successione.
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStreamingText('');
    setIsLoading(false);
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      setIsLoading(true);
      setStreamingText('');

      const controller = new AbortController();
      abortRef.current = controller;

      // Snapshot dello storico al momento dell'invio.
      const history = messages;
      const userMessage: ChatMessage = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            messages: history,
            userMessage: trimmed,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          let errorMessage =
            response.status === 404
              ? 'Endpoint non trovato. Assicurati che il dev server sia in esecuzione.'
              : response.status === 429
                ? 'Hai raggiunto il limite di messaggi. Riprova più tardi.'
                : 'Errore di rete. Riprova tra poco.';
          try {
            const data = await response.json();
            if (data?.error) errorMessage = data.error;
          } catch {
            // Mantiene il messaggio derivato dallo status code.
          }
          throw new Error(errorMessage);
        }

        if (!response.body) {
          throw new Error('Risposta del server vuota.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let assembled = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex = buffer.indexOf('\n\n');
          while (newlineIndex !== -1) {
            const rawEvent = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 2);

            const dataLine = rawEvent
              .split('\n')
              .find((line) => line.startsWith('data: '));
            if (dataLine) {
              const payload = dataLine.slice(6);
              if (payload === '[DONE]') {
                buffer = '';
                break;
              }
              try {
                const parsed = JSON.parse(payload) as {
                  text?: string;
                  error?: string;
                };
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  assembled += parsed.text;
                  setStreamingText(assembled);
                }
              } catch (err) {
                if (err instanceof Error) throw err;
              }
            }
            newlineIndex = buffer.indexOf('\n\n');
          }
        }

        if (assembled.length === 0) {
          throw new Error('Risposta vuota dal modello. Riprova.');
        }

        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: assembled,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingText('');
      } catch (err) {
        // Abort silenzioso se l'utente ha chiuso la chat o resettato.
        if (err instanceof DOMException && err.name === 'AbortError') return;

        const message = err instanceof Error ? err.message : 'Errore sconosciuto.';
        setError(message);
        setStreamingText('');
        // Rimuove l'ultimo messaggio user, così l'utente può riprovare.
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages],
  );

  return { messages, streamingText, isLoading, error, sendMessage, reset };
}
