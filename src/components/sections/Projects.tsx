import { FiExternalLink, FiGithub } from "react-icons/fi";
import styled from "styled-components";
import type { Project } from "../../data/projects";
import { projects } from "../../data/projects";
import { theme } from "../../styles/theme";
import PageContainer from "../layout/PageContainer";
import { BaseCard } from "../ui/BaseCard";

const STATUS_LABEL: Record<Project["status"], string> = {
  "in-progress": "In corso",
  completed: "Completato",
  maintenance: "Online",
};

export default function Projects() {
  return (
    <PageContainer title="Progetti" subtitle="Cosa ho costruito.">
      <Grid>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Grid>
    </PageContainer>
  );
}

function ProjectCard({ project }: { project: Project; }) {
  return (
    <Card>
      <CardHeader>
        <TitleRow>
          <ProjectTitle>{project.title}</ProjectTitle>
          <StatusBadge $status={project.status}>
            {STATUS_LABEL[project.status]}
          </StatusBadge>
        </TitleRow>
        <TypeLabel>{project.type === "mobile" ? "Mobile" : "Web"}</TypeLabel>
      </CardHeader>

      <Description>{project.description}</Description>

      {project.longDescription && (
        <LongDescription>{project.longDescription}</LongDescription>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <HighlightList>
          {project.highlights.map((h) => (
            <HighlightItem key={h}>{h}</HighlightItem>
          ))}
        </HighlightList>
      )}

      <Footer>
        <TechTags>
          {project.technologies.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </TechTags>

        <Links>
          {project.githubUrl && (
            <IconLink
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub size={15} />
              GitHub
            </IconLink>
          )}
          {project.liveUrl && (
            <IconLink
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live"
            >
              <FiExternalLink size={15} />
              Live
            </IconLink>
          )}
        </Links>
      </Footer>
    </Card>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(BaseCard)`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ProjectTitle = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  line-height: 1.3;
`;

const StatusBadge = styled.span<{ $status: Project["status"]; }>`
  flex-shrink: 0;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: ${theme.radii.pill};
  border: 1px solid
    ${({ $status }) =>
    $status === "in-progress"
      ? theme.colors.accent
      : theme.colors.borderMid};
  color: ${({ $status }) =>
    $status === "in-progress" ? theme.colors.accent : theme.colors.muted};
`;

const TypeLabel = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.muted};
`;

const Description = styled.p`
  font-size: 0.88rem;
  color: ${theme.colors.text};
  line-height: 1.65;
`;

const LongDescription = styled.p`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  line-height: 1.7;
`;

const HighlightList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 12px;
  border-left: 2px solid ${theme.colors.borderMid};
`;

const HighlightItem = styled.li`
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  line-height: 1.5;

  &::before {
    content: "→ ";
    color: ${theme.colors.borderMid};
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  padding-top: 4px;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TechTag = styled.span`
  font-size: 0.72rem;
  padding: 3px 8px;
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.muted};
  letter-spacing: 0.03em;
`;

const Links = styled.div`
  display: flex;
  gap: 12px;
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.04em;
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.accent};
  }
`;
