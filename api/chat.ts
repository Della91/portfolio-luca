import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "../src/lib/buildSystemPrompt";
import {
  CLAUDE_MODEL,
  MAX_OUTPUT_TOKENS,
  RATE_LIMIT_PER_IP,
  RATE_LIMIT_WINDOW_MS,
} from "../src/lib/chatConfig";
import { validateChatPayload } from "../src/lib/validateChatPayload";

export const config = {
  runtime: "edge",
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const GENERIC_ERROR = "Il servizio non è disponibile al momento. Riprova tra poco.";

// IP del visitatore, per il limite di messaggi giornaliero.
// Su Vercel entrambe le intestazioni sono scritte da Vercel (non falsificabili): x-real-ip è la più diretta.
function getClientIp(req: Request): string {
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",").pop()?.trim() || "unknown";
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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[api/chat] ANTHROPIC_API_KEY mancante nelle variabili d'ambiente.");
    return jsonError(GENERIC_ERROR, 500);
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

  const payload = validateChatPayload(parsed);
  if (!payload) {
    return jsonError("Messaggio non valido. Controlla lunghezza e formato.", 400);
  }

  const anthropic = new Anthropic({ apiKey });

  // Storico + messaggio corrente dell'utente nel formato richiesto da Claude.
  const messages: Anthropic.MessageParam[] = [
    ...payload.messages.map((m) => ({ role: m.role, content: m.content })),
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
        // Dettaglio tecnico nei log di Vercel; al visitatore solo un messaggio generico.
        console.error("[api/chat] Errore Anthropic:", err);
        const status = err instanceof Anthropic.APIError ? err.status : undefined;

        let message = GENERIC_ERROR;
        if (status === 429) {
          message = "Il servizio AI è temporaneamente occupato. Attendi un momento e riprova.";
        } else if (status === 529) {
          message = "Il servizio AI è sotto carico. Riprova tra qualche secondo.";
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
