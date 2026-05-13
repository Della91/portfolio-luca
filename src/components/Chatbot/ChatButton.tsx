import styled, { keyframes } from "styled-components";
import { FiMessageCircle } from "react-icons/fi";
import { theme } from "../../styles/theme";

interface Props {
  open: boolean;
  onClick: () => void;
}

export default function ChatButton({ open, onClick }: Props) {
  if (open) return null;
  return (
    <Btn
      type="button"
      onClick={onClick}
      aria-label="Apri assistente AI"
      title="Chiedi a Luca"
    >
      <Pulse aria-hidden="true" />
      <FiMessageCircle size={22} />
    </Btn>
  );
}

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(199, 162, 124, 0.55); }
  70% { box-shadow: 0 0 0 14px rgba(199, 162, 124, 0); }
  100% { box-shadow: 0 0 0 0 rgba(199, 162, 124, 0); }
`;

const Btn = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${theme.colors.accent};
  color: ${theme.colors.bg};
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition:
    background ${theme.transitions.default},
    transform ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.text};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.96);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: 18px;
    right: 18px;
    width: 48px;
    height: 48px;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${pulse} 2.4s infinite;
  }
`;

const Pulse = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
`;
