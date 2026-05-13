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
      title="Get in Touch"
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
