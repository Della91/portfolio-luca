# Portfolio — Luca Della Vecchia

Portfolio personale sviluppato con React, TypeScript e Vite. Include un chatbot AI, basato su Claude di Anthropic, che risponde a domande sulla mia esperienza e sui miei progetti.

## Stack tecnologico

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Styled Components** — stili
- **Framer Motion** — animazioni
- **React Router v7** — routing
- **Claude API (Anthropic)** — chatbot AI tramite Vercel Function

## Funzionalità

- Sezioni responsive: profilo, competenze, esperienza, progetti, contatti
- Chatbot AI integrato nell'interfaccia: puoi chiedergli qualsiasi cosa su di me
- Risposte in streaming tramite SSE
- Deploy su Vercel

## Struttura del progetto

```
src/
├── components/
│   ├── Chatbot/       # UI e logica del chatbot
│   ├── sections/      # Sezioni del portfolio
│   ├── layout/        # Componenti di layout
│   └── ui/            # Componenti UI riutilizzabili
├── hooks/             # Custom hook React
├── lib/               # Utility (generazione del system prompt, ecc.)
├── data/              # Contenuti statici
├── styles/            # Tema e stili globali
└── assets/            # Immagini

api/
└── chat.ts            # Vercel Function — inoltra le richieste ad Anthropic
```

## Sviluppo locale

```bash
npm install
```

Crea un file `.env.local`:

```
ANTHROPIC_API_KEY=la_tua_chiave_api
```

```bash
npm run dev
```

Il dev server di Vite include un middleware che simula la funzione Vercel in locale, quindi non serve la Vercel CLI.

## Deploy

Il sito è pubblicato su **Vercel**. La funzione `api/chat.ts` gira sul runtime Node.js e invia le risposte in streaming tramite SSE.

Prima del deploy, imposta la variabile d'ambiente `ANTHROPIC_API_KEY` nelle impostazioni del progetto su Vercel.

## Convenzioni

**Branch** — `tipo/descrizione-breve` da `master`: `feature/`, `bugfix/`, `refactor/`.

**Commit** — `tipo(ambito): descrizione breve` in italiano, all'imperativo, con un corpo di 1–2 righe sul perché.

| Tipo       | Quando                                           |
| ---------- | ------------------------------------------------ |
| `feat`     | nuova funzionalità                               |
| `fix`      | correzione di un bug                             |
| `perf`     | miglioramento delle prestazioni                  |
| `refactor` | codice riscritto senza cambiare il comportamento |
| `style`    | solo formattazione, nessuna logica               |
| `docs`     | documentazione e commenti                        |
| `test`     | aggiunta o modifica di test                      |
| `chore`    | configurazione, dipendenze, manutenzione         |

| Ambito (facoltativo) | Parte del progetto                                                |
| -------------------- | ----------------------------------------------------------------- |
| `ui`                 | interfaccia: componenti, layout, stili                            |
| `chatbot`            | chat lato sito (`useChat`, componenti `Chatbot/`)                 |
| `api`                | funzione Vercel (`api/`) e configurazione della chat (`src/lib/`) |
| `content`            | testi e dati (`src/data/`)                                        |
| `deploy`             | configurazione di Vercel (`vercel.json`)                          |
| `seo`                | meta tag, `robots.txt`, `sitemap.xml`                             |

Esempio: `fix(chatbot): chat a schermo intero visibile su mobile`

**Pull request** — una per branch verso `master`, provata sull'anteprima di Vercel e unita con un merge commit: `merge: integra <descrizione> da <branch> (#N)`.
