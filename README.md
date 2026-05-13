# Portfolio — Luca Della Vecchia

Personal portfolio built with React, TypeScript, and Vite. Features an AI-powered chatbot that answers questions about my experience and projects, powered by Claude (Anthropic).

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Styled Components** — styling
- **Framer Motion** — animations
- **React Router v7** — routing
- **Claude API (Anthropic)** — AI chatbot via Vercel Serverless Function

## Features

- Responsive portfolio sections (about, skills, projects, contacts)
- AI chatbot integrated directly in the UI — asks it anything about me
- Streaming responses via SSE
- Deployed on Vercel with a custom domain

## Project Structure

```
src/
├── components/
│   ├── Chatbot/       # AI chatbot UI + logic
│   ├── sections/      # Portfolio sections
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utilities (system prompt builder, etc.)
├── data/              # Static content
└── types/             # TypeScript types

api/
└── chat.ts            # Vercel Serverless Function — proxies requests to Anthropic
```

## Local Development

```bash
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_api_key_here
```

```bash
npm run dev
```

The Vite dev server includes a middleware that simulates the Vercel Function locally, so no Vercel CLI needed.

## Deploy

Deployed on **Vercel**. The `api/chat.ts` function runs as a Serverless Function with a 30s timeout to support streaming responses.

Set the `ANTHROPIC_API_KEY` environment variable in the Vercel project settings before deploying.

---

## Note in italiano

Portfolio personale sviluppato con React, TypeScript e Vite. Include un chatbot AI integrato nell'interfaccia, alimentato da Claude di Anthropic, che risponde a domande sulla mia esperienza e sui miei progetti.

Il chatbot utilizza una Vercel Serverless Function come proxy verso l'API Anthropic, con supporto allo streaming delle risposte tramite SSE. In sviluppo locale, un plugin Vite personalizzato simula la funzione serverless senza necessità di Vercel CLI.
