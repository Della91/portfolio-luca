import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiLinkedin, FiGithub, FiMail, FiTool, FiBriefcase, FiUser } from 'react-icons/fi';
import { type ReactElement } from 'react';
import ProfileAvatar from '../ProfileAvatar';
import { profile } from '../../data/profile';
import { theme } from '../../styles/theme';

interface QuickLink {
  to: string;
  title: string;
  description: string;
  cta: string;
  icon: ReactElement;
}

const quickLinks: QuickLink[] = [
  {
    to: '/about',
    title: 'Profilo',
    description: 'Scopri chi sono, la mia formazione e le mie lingue.',
    cta: 'Vedi profilo',
    icon: <FiUser size={20} />,
  },
  {
    to: '/skills',
    title: 'Competenze',
    description: 'Esplora le mie principali competenze e strumenti.',
    cta: 'Vedi competenze',
    icon: <FiTool size={20} />,
  },
  {
    to: '/experience',
    title: 'Esperienza',
    description: 'Scopri il mio percorso professionale come sviluppatore.',
    cta: 'Vedi esperienza',
    icon: <FiBriefcase size={20} />,
  },
  {
    to: '/contact',
    title: 'Contatti',
    description: 'Collegati con me tramite LinkedIn, GitHub o email.',
    cta: 'Vedi contatti',
    icon: <FiMail size={20} />,
  },
];

interface SocialLink {
  href: string;
  label: string;
  value: string;
  icon: ReactElement;
  external?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    href: profile.linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/luca-della-vecchia',
    icon: <FiLinkedin size={14} />,
    external: true,
  },
  {
    href: profile.github,
    label: 'GitHub',
    value: 'github.com/lucadellavecchia',
    icon: <FiGithub size={14} />,
    external: true,
  },
  {
    href: `mailto:${profile.email}`,
    label: 'Email',
    value: profile.email,
    icon: <FiMail size={14} />,
  },
];

export default function Dashboard() {
  return (
    <Wrapper>
      <HeroGrid>
        <ProfileCard>
          <PhotoFrame>
            <ProfileAvatar fill borderRadius="10px" />
          </PhotoFrame>
          <ProfileName>
            <em>Luca</em>
            <NameLast>Della Vecchia</NameLast>
          </ProfileName>
          <ProfileRole>{profile.role}</ProfileRole>
          <ViewProjectsBtn as={Link} to="/experience">
            Vedi progetti &rsaquo;
          </ViewProjectsBtn>
        </ProfileCard>

        <HeroContent>
          <HeroTitle>Ciao, sono Luca.</HeroTitle>
          <HeroSubtitle>Frontend Developer</HeroSubtitle>
          <BioParagraphs>
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </BioParagraphs>

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
        </HeroContent>
      </HeroGrid>

      <GetInTouch>
        <GetInTouchTitle>Get in Touch</GetInTouchTitle>
        <ContactRow>
          {socialLinks.map(({ href, label, value, icon, external }) => (
            <ContactLink
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <ContactIcon>{icon}</ContactIcon>
              <ContactMeta>
                <ContactLabel>{label}</ContactLabel>
                <ContactValueText>{value}</ContactValueText>
              </ContactMeta>
            </ContactLink>
          ))}
        </ContactRow>
      </GetInTouch>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 340px 1fr;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  box-shadow: 0 8px 40px ${theme.colors.shadow};
`;

const PhotoFrame = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 10px;
  overflow: hidden;
`;

const ProfileName = styled.h2`
  font-size: 1.6rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  text-align: center;
  line-height: 1.3;

  em {
    display: block;
    font-style: italic;
    font-size: 2rem;
  }
`;

const NameLast = styled.span`
  display: block;
`;

const ProfileRole = styled.p`
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.muted};
`;

const ViewProjectsBtn = styled.button`
  margin-top: 8px;
  padding: 10px 24px;
  border: 1px solid ${theme.colors.borderMid};
  border-radius: 6px;
  color: ${theme.colors.accent};
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  background: transparent;
  transition: background ${theme.transitions.default}, border-color ${theme.transitions.default};
  text-align: center;

  &:hover {
    background: ${theme.colors.surfaceAlt};
    border-color: ${theme.colors.accent};
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeroTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.03em;
`;

const HeroSubtitle = styled.p`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const BioParagraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 0.85rem;
    color: ${theme.colors.muted};
    line-height: 1.7;
  }
`;

const QuickCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 12px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const QuickCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.borderMid};
  }
`;

const QuickCardIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
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

const GetInTouch = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 28px 32px;
  box-shadow: 0 8px 40px ${theme.colors.shadow};
`;

const GetInTouchTitle = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
`;

const ContactRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
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
  width: 32px;
  height: 32px;
  border-radius: 6px;
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
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.accent};
`;

const ContactValueText = styled.span`
  font-size: 0.78rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.02em;
  word-break: break-all;
`;
