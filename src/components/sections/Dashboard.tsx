import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileAvatar from "../ProfileAvatar";
import { profile } from "../../data/profile";
import { quickLinks, socialLinks } from "../../data/dashboard.tsx";
import { theme } from "../../styles/theme";
import { BaseCard } from "../ui/BaseCard";

export default function Dashboard() {
  return (
    <Wrapper>
      <Hero>
        <HeroContent>
          <HeroTitle>Ciao, sono Luca.</HeroTitle>
          <HeroSubtitle>Frontend Developer</HeroSubtitle>
          <BioParagraphs>
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ReadMoreLink to="/about">
              Continua a leggere il profilo &rsaquo;
            </ReadMoreLink>
          </BioParagraphs>

          <ContactRow>
            {socialLinks.map(({ href, label, value, icon, external }) => (
              <ContactLink
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <ContactIcon>{icon}</ContactIcon>
                <ContactMeta>
                  <ContactLabel>{label}</ContactLabel>
                  <ContactValueText>{value}</ContactValueText>
                </ContactMeta>
              </ContactLink>
            ))}
          </ContactRow>

          <ExploreBtn as={Link} to="/experience">
            Vedi esperienza &rsaquo;
          </ExploreBtn>
        </HeroContent>

        <PhotoColumn>
          <ProfileName>
            <em>Luca</em>
            <span>Della Vecchia</span>
          </ProfileName>
          <ProfileAvatar />
        </PhotoColumn>
      </Hero>

      <QuickCards>
        {quickLinks.map(({ to, title, description, cta, icon }) => (
          <QuickCard key={to}>
            <QuickCardIcon>{icon}</QuickCardIcon>
            <QuickCardTitle>{title}</QuickCardTitle>
            <QuickCardDesc>{description}</QuickCardDesc>
            <QuickCardLink to={to}>&bull; {cta}</QuickCardLink>
          </QuickCard>
        ))}
      </QuickCards>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1fr 42%;
  gap: 32px;
  min-height: 85vh;
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    min-height: unset;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const HeroTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.02em;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const BioParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 0.88rem;
    color: ${theme.colors.muted};
    line-height: 1.7;
  }
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 4px;
  font-size: 0.82rem;
  color: ${theme.colors.accent};
  letter-spacing: 0.04em;
  border-bottom: 1px dashed ${theme.colors.borderMid};
  padding-bottom: 2px;
  transition: border-color ${theme.transitions.default}, color ${theme.transitions.default};

  &:hover {
    border-bottom-color: ${theme.colors.accent};
  }
`;

const ContactRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  background: ${theme.colors.surfaceAlt};
  transition: border-color ${theme.transitions.default}, background ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.borderMid};
    background: ${theme.colors.surface};
  }
`;

const ContactIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.accent};
  flex-shrink: 0;
`;

const ContactMeta = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const ContactLabel = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.accent};
`;

const ContactValueText = styled.span`
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  word-break: break-all;
`;

const ExploreBtn = styled.button`
  align-self: flex-start;
  margin-top: 8px;
  padding: 12px 28px;
  border: 1px solid ${theme.colors.borderMid};
  border-radius: ${theme.radii.sm};
  color: ${theme.colors.accent};
  font-size: 0.88rem;
  letter-spacing: 0.05em;
  background: transparent;
  transition: background ${theme.transitions.default}, border-color ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.surfaceAlt};
    border-color: ${theme.colors.accent};
  }
`;

const PhotoColumn = styled.div`
  position: relative;
  border-radius: ${theme.radii.cardLg};
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
  min-height: 600px;
  background: ${theme.colors.surface};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 420px;
  }
`;

const ProfileName = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 2;
  color: ${theme.colors.accent};
  line-height: 1.2;
  pointer-events: none;

  em {
    display: block;
    font-style: italic;
    font-size: 2rem;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
  }

  span {
    display: block;
    font-size: 1.1rem;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
  }
`;

const QuickCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const QuickCard = styled(BaseCard)`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuickCardIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${theme.radii.md};
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.accent};
  margin-bottom: 4px;
`;

const QuickCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  color: ${theme.colors.accent};
`;

const QuickCardDesc = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  line-height: 1.5;
`;

const QuickCardLink = styled(Link)`
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.04em;
  margin-top: auto;
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.accent};
  }
`;
