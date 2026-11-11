export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
  type: "web" | "mobile" | "fullstack" | "other";
  status: "completed" | "in-progress" | "maintenance";
}

export const projects: Project[] = [
  {
    id: "portfolio-ai",
    title: "Portfolio personale con chatbot AI",
    description:
      "Portfolio sviluppato con React e TypeScript, con un chatbot AI integrato che risponde a domande sulla mia esperienza usando le API di Anthropic (Claude).",
    longDescription:
      "Il chatbot utilizza una Vercel Function come proxy verso l'API Anthropic, con supporto allo streaming delle risposte tramite SSE. In sviluppo locale, un plugin Vite personalizzato simula la funzione senza necessità di Vercel CLI. Il system prompt è generato dinamicamente a partire dai dati del profilo, così le risposte restano sempre aggiornate.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Styled Components",
      "Framer Motion",
      "Claude API",
      "Vercel Functions",
      "SSE Streaming",
    ],
    githubUrl: "https://github.com/Della91/portfolio-luca",
    liveUrl: "https://luca-della-vecchia.vercel.app",
    highlights: [
      "Streaming risposte AI via SSE",
      "Vercel Function con proxy verso Anthropic",
      "Plugin Vite custom per simulare l'ambiente Vercel in locale",
      "System prompt generato dinamicamente dai dati del profilo",
    ],
    type: "web",
    status: "maintenance",
  },
];
