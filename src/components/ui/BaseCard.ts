import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const BaseCard = styled.div<{ $radius?: string }>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${({ $radius }) => $radius ?? theme.radii.card};
  transition: border-color ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.borderMid};
  }
`;
