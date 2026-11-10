export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Sviluppo Frontend",
    items: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    title: "Ecosistema React",
    items: ["React Router", "React Context API", "Styled Components", "Material UI"],
  },
  {
    title: "Data Fetching & API",
    items: ["Fetch API", "Axios", "Integrazione REST API", "JSON (parsing, serializzazione)"],
  },
  {
    title: "Integrazione AI & LLM",
    items: ["Claude API (Anthropic SDK)", "Prompt engineering", "Streaming SSE"],
  },
  {
    title: "Type Safety & Validazione",
    items: ["TypeScript avanzato", "io-ts"],
  },
  {
    title: "Sviluppo Mobile",
    items: ["React Native", "Expo", "Swift (base)", "Kotlin (base)"],
  },
  {
    title: "Strumenti & Ambiente di Sviluppo",
    items: ["Git", "GitLab", "Postman", "Xcode", "Android Studio", "Sequel Ace", "Serverless Functions (Vercel)"],
  },
  {
    title: "Workflow & Project Management",
    items: ["Jira", "Trello", "Agile / Scrum", "Code Review", "Pull Requests"],
  },
  {
    title: "Testing",
    items: ["Cypress"],
  },
  {
    title: "Build Tools & Package Manager",
    items: ["Vite", "Yarn", "npm"],
  },
  {
    title: "Design & UI Tools",
    items: ["Figma", "Sketch"],
  },
];
