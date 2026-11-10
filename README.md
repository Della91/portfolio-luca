# Portfolio — Luca Della Vecchia

Portfolio personale sviluppato con React, TypeScript e Vite. Include un chatbot AI, basato su Claude di Anthropic, che risponde a domande sulla mia esperienza e sui miei progetti.

## Stack tecnologico

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Styled Components** — stili
- **Framer Motion** — animazioni
- **React Router v7** — routing
- **Claude API (Anthropic)** — chatbot AI tramite Vercel Edge Function

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
├── chat.ts            # Vercel Edge Function — inoltra le richieste ad Anthropic
└── _constants.ts      # Limiti e modello del chatbot
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

Il sito è pubblicato su **Vercel**. La funzione `api/chat.ts` gira sul runtime Edge e invia le risposte in streaming tramite SSE.

Prima del deploy, imposta la variabile d'ambiente `ANTHROPIC_API_KEY` nelle impostazioni del progetto su Vercel.
