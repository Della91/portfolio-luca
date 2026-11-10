import { MAX_HISTORY_TURNS, MAX_USER_MESSAGE_LENGTH } from "./chatConfig";

export interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatPayload {
  messages: ClientMessage[];
  userMessage: string;
}

/**
 * Valida il body ricevuto da /api/chat. Usata sia dalla funzione Vercel
 * sia dal dev server, così locale e produzione accettano gli stessi dati.
 * Restituisce null se il payload non è valido.
 */
export function validateChatPayload(data: unknown): ChatPayload | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;

  const userMessage = obj.userMessage;
  if (typeof userMessage !== "string") return null;
  const trimmed = userMessage.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_USER_MESSAGE_LENGTH) return null;

  const messages = obj.messages;
  if (!Array.isArray(messages)) return null;
  if (messages.length > MAX_HISTORY_TURNS) return null;

  for (const m of messages) {
    if (!m || typeof m !== "object") return null;
    const msg = m as Record<string, unknown>;
    if (msg.role !== "user" && msg.role !== "assistant") return null;
    if (typeof msg.content !== "string") return null;
    // Le risposte dell'assistente possono essere più lunghe dei messaggi utente.
    if (msg.content.length > MAX_USER_MESSAGE_LENGTH * 4) return null;
  }

  return { messages: messages as ClientMessage[], userMessage: trimmed };
}
