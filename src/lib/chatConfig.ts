// Impostazioni del chatbot in un unico posto: le usano il sito, api/chat.ts e vite.config.ts.

export const CLAUDE_MODEL = "claude-haiku-4-5-20251001";

export const MAX_OUTPUT_TOKENS = 512;

// Massimo numero di caratteri accettati nel singolo messaggio dell'utente.
export const MAX_USER_MESSAGE_LENGTH = 1000;

// Quanti messaggi precedenti della conversazione inviamo a Claude a ogni domanda.
export const MAX_HISTORY_TURNS = 20;

// Messaggi per IP in 24 ore. Il conteggio si azzera quando Vercel riavvia la funzione:
// è una protezione leggera, quella vera è il limite di spesa su Anthropic.
export const RATE_LIMIT_PER_IP = 20;
export const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 ore.
