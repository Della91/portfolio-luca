import { type ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

// Wrapper riutilizzato da tutte le pagine interne (About, Skills, Experience, Contact).
// Garantisce intestazione e spaziatura coerenti senza duplicare styled-components.
export default function PageContainer({ title, subtitle, children }: Props) {
  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
      </PageHeader>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const PageHeader = styled.div`
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.05em;
  margin-bottom: 10px;
`;

const PageSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.muted};
`;
