import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Props {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = [
  'Quali sono le sue competenze principali in React?',
  'Ha esperienza con app mobile native?',
  'Su che progetti ha lavorato di recente?',
  'Come lo descriveresti in tre frasi?',
];

export default function SuggestedPrompts({ onSelect, disabled = false }: Props) {
  return (
    <Wrapper aria-label="Domande suggerite">
      <Hint>Prova a chiedermi:</Hint>
      <Chips>
        {SUGGESTIONS.map((s) => (
          <Chip key={s} type="button" onClick={() => onSelect(s)} disabled={disabled}>
            {s}
          </Chip>
        ))}
      </Chips>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Hint = styled.p`
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.muted};
`;

const Chips = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Chip = styled.button`
  text-align: left;
  font-size: 0.8rem;
  color: ${theme.colors.text};
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 10px 12px;
  line-height: 1.4;
  transition:
    color ${theme.transitions.default},
    border-color ${theme.transitions.default},
    background ${theme.transitions.default};

  &:hover:not(:disabled) {
    color: ${theme.colors.accent};
    border-color: ${theme.colors.borderMid};
    background: ${theme.colors.surface};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
