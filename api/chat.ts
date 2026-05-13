import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "../src/lib/buildSystemPrompt";
import {
  CLAUDE_MODEL,
  MAX_HISTORY_TURNS,
  MAX_OUTPUT_TOKENS,
  MAX_USER_MESSAGE_LENGTH,
  RATE_LIMIT_PER_IP,
  RATE_LIMIT_WINDOW_MS,
} from "./_constants";

export const config = {
  runtime: "edge",
};

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatPayload {
  messages: ClientMessage[];
  userMessage: string;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_PER_IP - 1 };
  }

  if (entry.count >= RATE_LIMIT_PER_IP) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_PER_IP - entry.count };
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function validatePayload(data: unknown): ChatPayload | null {
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
    if (msg.content.length > MAX_USER_MESSAGE_LENGTH * 4) return null;
  }

  return { messages: messages as ClientMessage[], userMessage: trimmed };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError("Configurazione del server incompleta: ANTHROPIC_API_KEY mancante.", 500);
  }

  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return jsonError(
      "Hai raggiunto il limite di messaggi giornaliero. Riprova domani o contatta Luca tramite la pagina contatti.",
      429,
    );
  }

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return jsonError("Payload JSON non valido.", 400);
  }

  const payload = validatePayload(parsed);
  if (!payload) {
    return jsonError("Messaggio non valido. Controlla lunghezza e formato.", 400);
  }

  const anthropic = new Anthropic({ apiKey });

  // Storico + messaggio corrente dell'utente nel formato richiesto da Claude.
  const messages: Anthropic.MessageParam[] = [
    ...payload.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: payload.userMessage },
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Il system prompt viene cachato lato Anthropic per ridurre latenza e costi
        // sulle richieste successive (il contenuto è statico per ogni build).
        const response = await anthropic.messages.create({
          model: CLAUDE_MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          system: [
            {
              type: "text",
              text: buildSystemPrompt(),
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
          stream: true,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`),
            );
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const raw = err instanceof Error ? err.message : "Errore sconosciuto";
        let message: string;

        if (raw.includes("401") || raw.includes("authentication")) {
          message = "Chiave API non valida. Controlla ANTHROPIC_API_KEY.";
        } else if (raw.includes("429") || raw.toLowerCase().includes("rate limit")) {
          message = "Il servizio AI è temporaneamente occupato. Attendi un momento e riprova.";
        } else if (raw.includes("529") || raw.toLowerCase().includes("overloaded")) {
          message = "Il servizio AI è sotto carico. Riprova tra qualche secondo.";
        } else {
          message = `Errore del modello AI: ${raw.slice(0, 120)}`;
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-rate-limit-remaining": String(limit.remaining),
    },
  });
}
