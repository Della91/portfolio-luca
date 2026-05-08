import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PageContainer from '../layout/PageContainer';
import { experiences } from '../../data/experience';
import { theme } from '../../styles/theme';

const RESPONSIBILITIES_PREVIEW = 4;
const ONGOING_KEYWORDS = ['presente', 'present', 'oggi', 'now'];

const isOngoing = (period: string) =>
  ONGOING_KEYWORDS.some((k) => period.toLowerCase().includes(k));

export default function Experience() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedSet, setExpandedSet] = useState<Set<string>>(new Set());
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  const noneExpanded = expandedSet.size === 0;

  const measure = () => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    if (cards.length === 0) return;
    cards.forEach((c) => (c.style.minHeight = '0'));
    const max = Math.max(...cards.map((c) => c.offsetHeight));
    cards.forEach((c) => (c.style.minHeight = ''));
    setMinHeight(max);
  };

  // Misurazione iniziale: aspetta che i font siano caricati per avere altezze corrette.
  useLayoutEffect(() => {
    if (!noneExpanded) return;
    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (noneExpanded) measure();
      });
    }
  }, [noneExpanded]);

  // Rimisura al cambio di viewport o di contenuto tramite ResizeObserver (più affidabile di window.resize).
  useEffect(() => {
    if (!gridRef.current) return;
    const obs = new ResizeObserver(() => {
      if (noneExpanded) measure();
    });
    obs.observe(gridRef.current);
    Array.from(gridRef.current.children).forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [noneExpanded]);

  const toggle = (company: string) => {
    setExpandedSet((prev) => {
      const next = new Set(prev);
      if (next.has(company)) next.delete(company);
      else next.add(company);
      return next;
    });
  };

  return (
    <PageContainer
      title="Esperienza"
      subtitle="Il mio percorso professionale nello sviluppo web e mobile."
    >
      <Grid ref={gridRef}>
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp.company}
            exp={exp}
            expanded={expandedSet.has(exp.company)}
            onToggle={() => toggle(exp.company)}
            minHeight={minHeight}
          />
        ))}
      </Grid>
    </PageContainer>
  );
}

interface CardProps {
  exp: (typeof experiences)[number];
  expanded: boolean;
  onToggle: () => void;
  minHeight: number | undefined;
}

function ExperienceCard({ exp, expanded, onToggle, minHeight }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsId = useId();

  const hasExtra =
    exp.responsibilities.length > RESPONSIBILITIES_PREVIEW ||
    !!exp.methodology ||
    (exp.highlights && exp.highlights.length > 0);

  const previewResponsibilities = exp.responsibilities.slice(0, RESPONSIBILITIES_PREVIEW);
  const extraDetails = exp.responsibilities.slice(RESPONSIBILITIES_PREVIEW);

  const ongoing = isOngoing(exp.period);

  // Mantiene visibile la card cliccata (evita di perdere il contesto quando si espande).
  const handleToggle = () => {
    onToggle();
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const hasExtraSections = !!exp.methodology || !!(exp.highlights && exp.highlights.length > 0);

  return (
    <Card
      ref={cardRef}
      style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      <CardTop>
        <PeriodBadge $ongoing={ongoing}>
          {ongoing && <OngoingDot aria-hidden="true" />}
          {exp.period}
        </PeriodBadge>
        <CardHeader>
          <Company>{exp.company}</Company>
          <RoleLine>
            <Role>{exp.role}</Role>
            <Dot>&bull;</Dot>
            <Location>{exp.location}</Location>
          </RoleLine>
        </CardHeader>

        <Description>{exp.description}</Description>

        {previewResponsibilities.length > 0 && (
          <Section>
            <SectionLabel>Attività principali</SectionLabel>
            <ResponsibilitiesGroup>
              <List>
                {previewResponsibilities.map((r, i) => (
                  <li key={`p-${i}`}>{r}</li>
                ))}
              </List>
              <AnimatePresence initial={false}>
                {expanded && extraDetails.length > 0 && (
                  <ExpandRegion
                    key="extra-list"
                    id={`${detailsId}-list`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <List>
                      {extraDetails.map((r, i) => (
                        <li key={`e-${i}`}>{r}</li>
                      ))}
                    </List>
                  </ExpandRegion>
                )}
              </AnimatePresence>
            </ResponsibilitiesGroup>
          </Section>
        )}

        <AnimatePresence initial={false}>
          {expanded && hasExtraSections && (
            <ExpandRegion
              key="extra-sections"
              id={`${detailsId}-sections`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ExpandInner>
                {exp.methodology && (
                  <Section>
                    <SectionLabel>Metodologia</SectionLabel>
                    <MethodologyText>{exp.methodology}</MethodologyText>
                  </Section>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <Section>
                    <SectionLabel>Features implementate</SectionLabel>
                    <HighlightList>
                      {exp.highlights.map((h) => (
                        <HighlightItem key={h.label}>
                          <HighlightLabel>{h.label}</HighlightLabel>
                          <p>{h.description}</p>
                        </HighlightItem>
                      ))}
                    </HighlightList>
                  </Section>
                )}
              </ExpandInner>
            </ExpandRegion>
          )}
        </AnimatePresence>
      </CardTop>

      <CardFooter>
        {exp.technologies.length > 0 && (
          <TechRow>
            {exp.technologies.map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
          </TechRow>
        )}

        {hasExtra && (
          <ToggleBtn
            type="button"
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-controls={`${detailsId}-list ${detailsId}-sections`}
          >
            {expanded ? (
              <>
                <FiChevronUp size={14} /> Leggi meno
              </>
            ) : (
              <>
                <FiChevronDown size={14} /> Leggi di più
              </>
            )}
          </ToggleBtn>
        )}
      </CardFooter>
    </Card>
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

const Card = styled.div`
  position: relative;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 28px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: border-color ${theme.transitions.default};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.borderMid},
      transparent
    );
    opacity: 0.6;
    transition: opacity ${theme.transitions.default};
  }

  &:hover {
    border-color: ${theme.colors.borderMid};

    &::before {
      opacity: 1;
    }
  }
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
`;

const PeriodBadge = styled.span<{ $ongoing: boolean }>`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $ongoing }) => ($ongoing ? theme.colors.accent : theme.colors.muted)};
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${({ $ongoing }) => ($ongoing ? theme.colors.borderMid : theme.colors.border)};
  border-radius: 20px;
  padding: 4px 12px;
`;

const OngoingDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6fae6f;
  box-shadow: 0 0 0 0 rgba(111, 174, 111, 0.6);
  animation: pulse 2s infinite;
  flex-shrink: 0;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(111, 174, 111, 0.55);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(111, 174, 111, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(111, 174, 111, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Company = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.02em;
  line-height: 1.3;
`;

const RoleLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Role = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.text};
  letter-spacing: 0.03em;
  font-style: italic;
`;

const Dot = styled.span`
  color: ${theme.colors.borderMid};
  font-size: 0.75rem;
`;

const Location = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.04em;
`;

const Description = styled.p`
  font-size: 0.84rem;
  color: ${theme.colors.muted};
  line-height: 1.65;
  padding-bottom: 16px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionLabel = styled.h4`
  font-size: 0.7rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;

  li {
    font-size: 0.82rem;
    color: ${theme.colors.text};
    padding-left: 16px;
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
  }
`;

const ResponsibilitiesGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ExpandRegion = styled(motion.div)`
  overflow: hidden;
`;

const ExpandInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 4px;
`;

const MethodologyText = styled.p`
  font-size: 0.82rem;
  color: ${theme.colors.muted};
  line-height: 1.7;
  white-space: pre-line;
`;

const HighlightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HighlightItem = styled.div`
  padding-left: 12px;
  border-left: 2px solid ${theme.colors.borderMid};

  p {
    font-size: 0.82rem;
    color: ${theme.colors.muted};
    line-height: 1.6;
    margin-top: 4px;
  }
`;

const HighlightLabel = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.accent};
  font-style: italic;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: auto;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 16px;
  border-top: 1px solid ${theme.colors.border};
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: ${theme.colors.muted};
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  padding: 3px 10px;
  background: ${theme.colors.surfaceAlt};
  transition: border-color ${theme.transitions.default}, color ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.borderMid};
    color: ${theme.colors.accent};
  }
`;

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.76rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 0;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background: transparent;
  transition: color ${theme.transitions.default}, border-color ${theme.transitions.default}, background ${theme.transitions.default};
  width: 100%;

  &:hover {
    color: ${theme.colors.accent};
    border-color: ${theme.colors.borderMid};
    background: ${theme.colors.surfaceAlt};
  }
`;
