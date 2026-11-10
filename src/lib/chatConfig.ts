// Configurazione del chatbot condivisa da sito, funzione Vercel e dev server.

export const CLAUDE_MODEL = "claude-haiku-4-5-20251001";

export const MAX_OUTPUT_TOKENS = 512;

// Massimo numero di caratteri accettati nel singolo messaggio dell'utente.
export const MAX_USER_MESSAGE_LENGTH = 1000;

// Massimo numero di messaggi di storico inviati al server.
export const MAX_HISTORY_TURNS = 20;

// Rate limit per IP (in memoria: si azzera a ogni cold start della funzione).
export const RATE_LIMIT_PER_IP = 20;
export const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 ore.
