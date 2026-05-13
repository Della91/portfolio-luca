import styled from "styled-components";
import PageContainer from "../layout/PageContainer";
import { skillCategories } from "../../data/skills";
import { theme } from "../../styles/theme";
import { BaseCard } from "../ui/BaseCard";

export default function Skills() {
  return (
    <PageContainer
      title="Competenze"
      subtitle="Tecnologie e strumenti che utilizzo nello sviluppo di applicazioni web e mobile."
    >
      <Grid>
        {skillCategories.map((cat) => (
          <Card key={cat.title}>
            <CardTitle>{cat.title}</CardTitle>
            <ItemList>
              {cat.items.map((item) => (
                <Item key={item}>{item}</Item>
              ))}
            </ItemList>
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(BaseCard)`
  padding: 24px 20px;
`;

const CardTitle = styled.h3`
  font-size: 0.85rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Item = styled.li`
  font-size: 0.85rem;
  color: ${theme.colors.text};
  padding-left: 14px;
  position: relative;
  line-height: 1.55;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 6px;
    height: 1px;
    background: ${theme.colors.borderMid};
  }
`;
