import styled from "styled-components";
import { FiMapPin, FiMail, FiPhone, FiMonitor } from "react-icons/fi";
import PageContainer from "../layout/PageContainer";
import ProfileAvatar from "../ProfileAvatar";
import { profile } from "../../data/profile";
import { theme } from "../../styles/theme";
import { BaseCard } from "../ui/BaseCard";

export default function About() {
  return (
    <PageContainer title="Profilo" subtitle="Chi sono e il mio percorso.">
      <Grid>
        <Left>
          <Card>
            <AboutPhotoFrame>
            <ProfileAvatar />
          </AboutPhotoFrame>
            <ProfileName>
              <em>Luca</em> Della Vecchia
            </ProfileName>
            <ProfileRole>{profile.role}</ProfileRole>

            <InfoList>
              <InfoItem>
                <FiMapPin size={13} />
                {profile.location}
              </InfoItem>
              <InfoItem>
                <FiMail size={13} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </InfoItem>
              <InfoItem>
                <FiPhone size={13} />
                <a href={`tel:+39${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </InfoItem>
              {profile.remoteOpen && (
                <InfoItem>
                  <FiMonitor size={13} />
                  Disponibile per lavoro da remoto
                </InfoItem>
              )}
            </InfoList>

            <Divider />

            <SectionLabel>Lingue</SectionLabel>
            <LangList>
              {profile.languages.map((l) => (
                <LangItem key={l.name}>
                  <span>{l.name}</span>
                  <LangLevel>{l.level}</LangLevel>
                </LangItem>
              ))}
            </LangList>
          </Card>
        </Left>

        <Right>
          <Card>
            <SectionLabel>Profilo</SectionLabel>
            <BioBlock>
              {profile.bioFull.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </BioBlock>
          </Card>

          <Card>
            <SectionLabel>Formazione</SectionLabel>
            <EduList>
              {profile.education.map((e) => (
                <EduItem key={e.title}>
                  <EduHeader>
                    <EduTitle>{e.title}</EduTitle>
                    <EduMeta>{e.institution} &bull; {e.location} &bull; {e.period}</EduMeta>
                  </EduHeader>
                  {e.description && <EduDesc>{e.description}</EduDesc>}

                </EduItem>
              ))}
            </EduList>
          </Card>
        </Right>
      </Grid>
    </PageContainer>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AboutPhotoFrame = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: ${theme.radii.md};
  overflow: hidden;
`;

const Card = styled(BaseCard)`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;


const ProfileName = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  text-align: center;

  em {
    font-style: italic;
  }
`;

const ProfileRole = styled.p`
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.muted};
  text-align: center;
  margin-top: -8px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: ${theme.colors.muted};

  svg {
    color: ${theme.colors.borderMid};
    flex-shrink: 0;
  }

  a {
    color: ${theme.colors.muted};
    transition: color ${theme.transitions.default};
    word-break: break-all;

    &:hover {
      color: ${theme.colors.accent};
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.border};
`;

const SectionLabel = styled.h3`
  font-size: 0.72rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const LangList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LangItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  color: ${theme.colors.text};
`;

const LangLevel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.muted};
`;

const BioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 0.88rem;
    color: ${theme.colors.muted};
    line-height: 1.75;
  }
`;

const EduList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EduItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 14px;
  border-left: 2px solid ${theme.colors.borderMid};
`;

const EduHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const EduTitle = styled.h4`
  font-size: 0.88rem;
  font-weight: normal;
  color: ${theme.colors.accent};
`;

const EduMeta = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.03em;
`;

const EduDesc = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  line-height: 1.6;
  margin-top: 4px;
  white-space: pre-line;
`;
