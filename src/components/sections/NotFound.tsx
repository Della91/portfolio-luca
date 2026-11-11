import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import ProfileAvatar from "../ProfileAvatar";

// Mostrata per ogni indirizzo che non corrisponde a nessuna pagina del sito.
// L'avatar si guarda intorno da solo (autoLook): da qui la battuta del messaggio.
export default function NotFound() {
  return (
    <Wrapper>
      <AvatarFrame>
        <ProfileAvatar autoLook />
      </AvatarFrame>

      <Code>404</Code>
      <Message>Mi sono guardato intorno, ma qui non c'è niente.</Message>

      <Actions>
        <PrimaryLink to="/">Torna alla Home</PrimaryLink>
        <SecondaryLink to="/projects">Vedi i progetti &rsaquo;</SecondaryLink>
      </Actions>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 0 20px;
`;

const AvatarFrame = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid ${theme.colors.borderMid};
  overflow: hidden;
  margin-bottom: 24px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 120px;
    height: 120px;
  }
`;

const Code = styled.h1`
  font-size: 5.5rem;
  font-weight: normal;
  line-height: 1;
  letter-spacing: 0.06em;
  color: ${theme.colors.accent};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 4.2rem;
  }
`;

const Message = styled.p`
  margin-top: 14px;
  font-size: 1.05rem;
  color: ${theme.colors.text};
  text-wrap: balance; /* evita una parola sola sull'ultima riga su schermi stretti */
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

const PrimaryLink = styled(Link)`
  padding: 12px 28px;
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.accent};
  color: ${theme.colors.bg};
  font-size: 0.88rem;
  letter-spacing: 0.05em;
  transition: background ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.text};
  }
`;

const SecondaryLink = styled(Link)`
  padding: 12px 28px;
  border: 1px solid ${theme.colors.borderMid};
  border-radius: ${theme.radii.sm};
  color: ${theme.colors.accent};
  font-size: 0.88rem;
  letter-spacing: 0.05em;
  transition:
    background ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.surfaceAlt};
    border-color: ${theme.colors.accent};
  }
`;
