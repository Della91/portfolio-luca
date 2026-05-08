import { useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../data/routes";
import { theme } from "../../styles/theme";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Header>
      <Brand>Luca Della Vecchia</Brand>

      <DesktopNav>
        {ROUTES.map(({ to, label }) => (
          <StyledNavLink key={to} to={to} end={to === "/"}>
            {label}
          </StyledNavLink>
        ))}
      </DesktopNav>

      <HamburgerBtn
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
      </HamburgerBtn>

      <MobileDrawer $open={menuOpen} aria-hidden={!menuOpen}>
        {ROUTES.map(({ to, label }) => (
          <MobileNavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </MobileNavLink>
        ))}
      </MobileDrawer>

      {menuOpen && <Overlay onClick={() => setMenuOpen(false)} />}
    </Header>
  );
}

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.borderMid};
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 20px;
  }
`;

const Brand = styled.span`
  font-size: 1.2rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${theme.colors.muted};
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-bottom: 2px solid transparent;
  transition:
    color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover,
  &.active {
    color: ${theme.colors.accent};
    border-bottom-color: ${theme.colors.accent};
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  color: ${theme.colors.accent};
  padding: 4px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
  }
`;

const MobileDrawer = styled.nav<{ $open: boolean }>`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 68px;
    left: 0;
    bottom: 0;
    width: 240px;
    background: ${theme.colors.surface};
    border-right: 1px solid ${theme.colors.border};
    padding: 24px 0;
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
    transition: transform 0.28s ease;
    z-index: 200;
  }
`;

const MobileNavLink = styled(NavLink)`
  color: ${theme.colors.muted};
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-left: 3px solid transparent;
  transition:
    color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover,
  &.active {
    color: ${theme.colors.accent};
    border-left-color: ${theme.colors.accent};
    background: ${theme.colors.surfaceAlt};
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    position: fixed;
    inset: 68px 0 0 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 150;
  }
`;
