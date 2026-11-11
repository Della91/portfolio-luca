import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
import { ROUTES } from "../../data/routes";
import { theme } from "../../styles/theme";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "./Navbar";

// Stesso titolo di index.html, usato per la Home.
const DEFAULT_TITLE = "Luca Della Vecchia — Frontend Developer";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const currentRoute = ROUTES.find((r) => r.to === location.pathname && r.to !== "/");

  // Titolo della scheda del browser per ogni pagina (es. "Esperienza — Luca Della Vecchia").
  useEffect(() => {
    if (isHome) document.title = DEFAULT_TITLE;
    else if (currentRoute) document.title = `${currentRoute.label} — Luca Della Vecchia`;
    else document.title = "Pagina non trovata";
  }, [isHome, currentRoute]);

  return (
    <Wrapper>
      <Navbar />
      <Main>
        {!isHome && currentRoute && (
          <Breadcrumb aria-label="Percorso di navigazione">
            <BackLink to="/">
              <FiChevronLeft size={13} />
              Home
            </BackLink>
            <BreadSep aria-hidden="true">/</BreadSep>
            <BreadCurrent aria-current="page">{currentRoute.label}</BreadCurrent>
          </Breadcrumb>
        )}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Main>
      <Chatbot />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 48px 80px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 32px 32px 70px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 24px 20px 60px;
  }
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color ${theme.transitions.default};

  svg {
    flex-shrink: 0;
  }

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const BreadSep = styled.span`
  font-size: 0.72rem;
  color: ${theme.colors.border};
`;

const BreadCurrent = styled.span`
  font-size: 0.78rem;
  color: ${theme.colors.accent};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;
