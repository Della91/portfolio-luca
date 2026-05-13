import styled from "styled-components";
import PageContainer from "../layout/PageContainer";
import { experiences } from "../../data/experience";
import { theme } from "../../styles/theme";
import { ExperienceCard } from "./ExperienceCard";
import { useToggleSet } from "../../hooks/useToggleSet";

export default function Experience() {
  const { set: expandedSet, toggle } = useToggleSet();

  return (
    <PageContainer
      title="Esperienza"
      subtitle="Il mio percorso professionale nello sviluppo web e mobile."
    >
      <Grid>
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp.company}
            exp={exp}
            expanded={expandedSet.has(exp.company)}
            onToggle={() => toggle(exp.company)}
          />
        ))}
      </Grid>
    </PageContainer>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
