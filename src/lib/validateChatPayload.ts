// ".js" obbligatorio: questo file è usato da api/chat.ts, che su Vercel gira con Node (vedi lì).
import { MAX_HISTORY_TURNS, MAX_USER_MESSAGE_LENGTH } from "./chatConfig.js";

export interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatPayload {
  messages: ClientMessage[];
  userMessage: string;
}

// Controlla i dati ricevuti da /api/chat; restituisce null se non sono validi.
// Arrivano da internet (chiunque può inviare qualsiasi cosa), per questo sono `unknown`
// e ogni campo viene verificato prima dell'uso. Usata sia online sia in locale.
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
    // Lo storico include le risposte di Claude, più lunghe delle domande: fino a 4 volte il limite.
    if (msg.content.length > MAX_USER_MESSAGE_LENGTH * 4) return null;
  }

  return { messages: messages as ClientMessage[], userMessage: trimmed };
}
