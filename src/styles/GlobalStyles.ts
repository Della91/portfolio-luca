import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.serif};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  /* Contorno visibile solo con la tastiera, non al clic del mouse. */
  :focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.surfaceAlt};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.borderMid};
    border-radius: 3px;
  }
`;

export default GlobalStyles;
