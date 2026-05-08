export const theme = {
  colors: {
    bg: "#1a1008",
    surface: "#2B1E17",
    surfaceAlt: "#221610",
    border: "#3A2A22",
    borderMid: "#5A3E2B",
    accent: "#C7A27C",
    text: "#E6D5C3",
    muted: "#8a7060",
    shadow: "rgba(0,0,0,0.5)",
  },
  fonts: {
    serif: "'Georgia', 'Times New Roman', serif",
  },
  breakpoints: {
    tablet: '1024px',
    mobile: '768px',
  },
  transitions: {
    default: "0.2s ease",
  },
};

export type Theme = typeof theme;
