// Impostazioni del chatbot in un unico posto: le usano il sito, api/chat.ts e vite.config.ts.

export const CLAUDE_MODEL = "claude-haiku-5-5";

// Haiku 5.5 ragiona prima di rispondere: "low" è il livello più economico e veloce, adatto a una chat.
export const CLAUDE_EFFORT = "low";

// Include anche i token del ragionamento: con 512 una risposta poteva interrompersi.
export const MAX_OUTPUT_TOKENS = 1024;

// Massimo numero di caratteri accettati nel singolo messaggio dell'utente.
export const MAX_USER_MESSAGE_LENGTH = 1000;

// Quanti messaggi precedenti della conversazione inviamo a Claude a ogni domanda.
export const MAX_HISTORY_TURNS = 20;

// Messaggi per IP in 24 ore. Il conteggio si azzera quando Vercel riavvia la funzione:
// è una protezione leggera, quella vera è il limite di spesa su Anthropic.
export const RATE_LIMIT_PER_IP = 20;
export const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 ore.
