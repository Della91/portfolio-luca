// Costanti condivise dalle Vercel Functions del progetto.

export const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

export const MAX_OUTPUT_TOKENS = 512;

// Massimo numero di caratteri accettati nel singolo messaggio dell'utente.
export const MAX_USER_MESSAGE_LENGTH = 1000;

// Massimo numero di turni nello storico mantenuti dal client.
export const MAX_HISTORY_TURNS = 20;

// Rate limit per IP (in-process, si resetta a ogni cold start della function).
export const RATE_LIMIT_PER_IP = 20;
export const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 ore.
