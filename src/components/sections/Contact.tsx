import styled from "styled-components";
import { FiLinkedin, FiGithub, FiMail, FiPhone } from "react-icons/fi";
import PageContainer from "../layout/PageContainer";
import { contactLinks } from "../../data/contact";
import { theme } from "../../styles/theme";
import { BaseCard } from "../ui/BaseCard";

const iconMap = {
  linkedin: FiLinkedin,
  github: FiGithub,
  email: FiMail,
  phone: FiPhone,
};

export default function Contact() {
  return (
    <PageContainer
      title="Contatti"
      subtitle="Hai domande o proposte? Sentiti libero di contattarmi."
    >
      <Cards>
        {contactLinks.map(({ label, value, url, icon }) => {
          const Icon = iconMap[icon];
          const isExternal = icon === "linkedin" || icon === "github";
          return (
            <ContactCard
              key={label}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <IconWrapper>
                <Icon size={24} />
              </IconWrapper>
              <CardLabel>{label}</CardLabel>
              <CardValue>{value}</CardValue>
            </ContactCard>
          );
        })}
      </Cards>

      <AvailabilityBlock>
        <AvailabilityDot />
        <AvailabilityText>
          Attualmente disponibile per nuove opportunità lavorative da remoto.
        </AvailabilityText>
      </AvailabilityBlock>
    </PageContainer>
  );
}

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled(BaseCard).attrs({ as: "a" })<{
  href?: string;
  target?: string;
  rel?: string;
}>`
  border-radius: ${theme.radii.cardLg};
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  transition: border-color ${theme.transitions.default}, background ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.surfaceAlt};
  }
`;

const IconWrapper = styled.div`
  color: ${theme.colors.accent};
`;

const CardLabel = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  color: ${theme.colors.accent};
`;

const CardValue = styled.p`
  font-size: 0.76rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.03em;
  word-break: break-all;
`;

const AvailabilityBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 28px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.cardLg};
  background: ${theme.colors.surface};
`;

const AvailabilityDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6fae6f;
  flex-shrink: 0;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(111, 174, 111, 0.55); }
    70% { box-shadow: 0 0 0 6px rgba(111, 174, 111, 0); }
    100% { box-shadow: 0 0 0 0 rgba(111, 174, 111, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const AvailabilityText = styled.p`
  font-size: 0.88rem;
  color: ${theme.colors.muted};
  line-height: 1.5;
`;
