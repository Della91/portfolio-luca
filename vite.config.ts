import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from './src/lib/buildSystemPrompt';
import {
  CLAUDE_MODEL,
  MAX_OUTPUT_TOKENS,
  MAX_USER_MESSAGE_LENGTH,
  MAX_HISTORY_TURNS,
} from './api/_constants';

interface ClientMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Plugin Vite che simula la Vercel Function /api/chat durante lo sviluppo locale.
 * In produzione (Vercel) il file api/chat.ts viene usato direttamente.
 */
function devChatApiPlugin(apiKey: string): Plugin {
  return {
    name: 'dev-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(
            JSON.stringify({
              error:
                'ANTHROPIC_API_KEY non configurata. Crea il file .env.local con ANTHROPIC_API_KEY=<tua_chiave>.',
            }),
          );
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body) as {
              userMessage?: unknown;
              messages?: unknown;
            };

            const userMessage =
              typeof parsed.userMessage === 'string' ? parsed.userMessage.trim() : '';

            if (!userMessage || userMessage.length > MAX_USER_MESSAGE_LENGTH) {
              res.statusCode = 400;
              res.setHeader('content-type', 'application/json');
              res.end(
                JSON.stringify({ error: 'Messaggio non valido. Controlla lunghezza e formato.' }),
              );
              return;
            }

            const rawMessages = Array.isArray(parsed.messages) ? parsed.messages : [];
            if (rawMessages.length > MAX_HISTORY_TURNS) {
              res.statusCode = 400;
              res.setHeader('content-type', 'application/json');
              res.end(JSON.stringify({ error: 'Storico conversazione troppo lungo.' }));
              return;
            }

            const anthropic = new Anthropic({ apiKey });

            const messages: Anthropic.MessageParam[] = [
              ...(rawMessages as ClientMessage[]).map((m) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
              })),
              { role: 'user', content: userMessage },
            ];

            res.setHeader('content-type', 'text/event-stream; charset=utf-8');
            res.setHeader('cache-control', 'no-cache, no-transform');
            res.setHeader('connection', 'keep-alive');

            const stream = anthropic.messages.stream({
              model: CLAUDE_MODEL,
              max_tokens: MAX_OUTPUT_TOKENS,
              system: buildSystemPrompt(),
              messages,
            });

            for await (const chunk of stream) {
              if (
                chunk.type === 'content_block_delta' &&
                chunk.delta.type === 'text_delta'
              ) {
                res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
              }
            }

            res.write('data: [DONE]\n\n');
            res.end();
          } catch (err) {
            const raw = err instanceof Error ? err.message : 'Errore sconosciuto';
            let message: string;

            if (raw.includes('401') || raw.includes('authentication')) {
              message = 'Chiave API non valida. Controlla ANTHROPIC_API_KEY in .env.local.';
            } else if (raw.includes('429') || raw.toLowerCase().includes('rate limit')) {
              message = 'Il servizio AI è temporaneamente occupato. Attendi un momento e riprova.';
            } else {
              message = `Errore del modello AI: ${raw.slice(0, 120)}`;
            }

            if (!res.headersSent) {
              res.statusCode = 502;
              res.setHeader('content-type', 'application/json');
              res.end(JSON.stringify({ error: message }));
            } else {
              res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
              res.end();
            }
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carica TUTTE le variabili d'ambiente (anche quelle senza prefisso VITE_).
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 5173,
      strictPort: false,
    },
    plugins: [
      react(),
      // Attivo solo in modalità development: gestisce /api/chat senza Vercel CLI.
      ...(mode === 'development' ? [devChatApiPlugin(env.ANTHROPIC_API_KEY ?? '')] : []),
    ],
  };
});
