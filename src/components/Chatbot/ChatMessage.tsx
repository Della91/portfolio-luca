import styled, { keyframes } from 'styled-components';
import { Fragment } from 'react';
import { theme } from '../../styles/theme';
import type { MessageRole } from '../../hooks/useChat';

interface Props {
  role: MessageRole;
  content: string;
  streaming?: boolean;
}

/**
 * Parsing leggero del markdown: bold (**text**) e liste con bullet.
 * Volutamente minimale per evitare dipendenze esterne.
 */
function renderContent(content: string): React.ReactNode {
  const lines = content.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      {renderLine(line)}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function renderLine(line: string): React.ReactNode {
  // Riconosce i bullet "- " o "* " a inizio riga.
  const bulletMatch = /^[-*]\s+(.*)/.exec(line);
  const text = bulletMatch ? bulletMatch[1] : line;
  const prefix = bulletMatch ? '• ' : '';

  // Spezzetta il testo in segmenti, alternando bold/non-bold.
  const segments: { bold: boolean; text: string }[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ bold: false, text: text.slice(lastIndex, match.index) });
    }
    segments.push({ bold: true, text: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ bold: false, text: text.slice(lastIndex) });
  }

  return (
    <>
      {prefix}
      {segments.map((s, idx) =>
        s.bold ? <strong key={idx}>{s.text}</strong> : <Fragment key={idx}>{s.text}</Fragment>,
      )}
    </>
  );
}

export default function ChatMessage({ role, content, streaming = false }: Props) {
  return (
    <Bubble $role={role}>
      <Content $role={role}>
        {renderContent(content)}
        {streaming && <Cursor aria-hidden="true">▋</Cursor>}
      </Content>
    </Bubble>
  );
}

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const Bubble = styled.div<{ $role: MessageRole }>`
  display: flex;
  ${({ $role }) =>
    $role === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
`;

const Content = styled.div<{ $role: MessageRole }>`
  max-width: 88%;
  padding: 10px 14px;
  border-radius: ${theme.radii.cardLg};
  background: ${({ $role }) =>
    $role === 'user' ? theme.colors.surface : theme.colors.surfaceAlt};
  border: 1px solid
    ${({ $role }) => ($role === 'user' ? theme.colors.borderMid : theme.colors.border)};
  font-size: 0.84rem;
  line-height: 1.6;
  color: ${theme.colors.text};
  word-break: break-word;
  white-space: pre-wrap;
`;

const Cursor = styled.span`
  display: inline-block;
  margin-left: 2px;
  color: ${theme.colors.accent};
  animation: ${blink} 1s steps(1) infinite;
`;
