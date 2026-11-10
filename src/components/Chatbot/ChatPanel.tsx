import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FiRefreshCw, FiSend, FiX } from "react-icons/fi";
import { theme } from "../../styles/theme";
import ChatMessage from "./ChatMessage";
import SuggestedPrompts from "./SuggestedPrompts";
import { useChat } from "../../hooks/useChat";
import { useEscapeKey } from "../../hooks/useEscapeKey";

interface Props {
  open: boolean;
  onClose: () => void;
}

export interface ChatPanelHandle {
  focusInput: () => void;
}

const MAX_INPUT_LENGTH = 1000;

const ChatPanel = forwardRef<ChatPanelHandle, Props>(function ChatPanel(
  { open, onClose },
  ref,
) {
  const { messages, streamingText, isLoading, error, sendMessage, reset } = useChat();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current?.focus(),
  }));

  // Scroll automatico al fondo quando arrivano nuovi token o messaggi.
  useLayoutEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, streamingText, error]);

  // Il campo cresce con il testo fino a max-height, poi scorre.
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  useEscapeKey(open, onClose);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    void sendMessage(text);
  };

  const handleSelectPrompt = (prompt: string) => {
    setInput("");
    void sendMessage(prompt);
  };

  const showSuggestions = messages.length === 0 && !isLoading && !streamingText;

  return (
    <Panel
      role="dialog"
      aria-modal="true"
      aria-label="Assistente del portfolio"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <Header>
        <HeaderText>
          <Title>Chiedi a Luca</Title>
          <Subtitle>Assistente AI del portfolio</Subtitle>
        </HeaderText>
        <HeaderActions>
          <IconBtn
            type="button"
            onClick={reset}
            aria-label="Resetta conversazione"
            disabled={messages.length === 0 && !streamingText}
          >
            <FiRefreshCw size={16} />
          </IconBtn>
          <IconBtn type="button" onClick={onClose} aria-label="Chiudi assistente">
            <FiX size={18} />
          </IconBtn>
        </HeaderActions>
      </Header>

      <MessageList ref={listRef} aria-live="polite" aria-relevant="additions">
        {showSuggestions ? (
          <Welcome>
            <WelcomeText>
              Ciao! Sono l'assistente AI del portfolio di Luca. Posso rispondere a
              domande sulle sue esperienze, competenze e progetti.
            </WelcomeText>
            <SuggestedPrompts onSelect={handleSelectPrompt} disabled={isLoading} />
          </Welcome>
        ) : (
          <>
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} content={m.content} />
            ))}
            {streamingText && (
              <ChatMessage role="assistant" content={streamingText} streaming />
            )}
            {isLoading && !streamingText && (
              <ChatMessage role="assistant" content="…" streaming />
            )}
          </>
        )}
        {error && <ErrorBanner role="alert">{error}</ErrorBanner>}
      </MessageList>

      <InputForm onSubmit={handleSubmit}>
        <TextArea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Scrivi un messaggio…"
          rows={1}
          maxLength={MAX_INPUT_LENGTH}
          aria-label="Messaggio"
          disabled={isLoading}
        />
        <SendBtn
          type="submit"
          aria-label="Invia messaggio"
          disabled={!input.trim() || isLoading}
        >
          <FiSend size={16} />
        </SendBtn>
      </InputForm>
      <Footer>Le risposte sono generate da AI: possono contenere imprecisioni.</Footer>
    </Panel>
  );
});

export default ChatPanel;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 380px;
  max-height: min(640px, calc(100vh - 120px));
  display: flex;
  flex-direction: column;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.borderMid};
  border-radius: ${theme.radii.panel};
  box-shadow: 0 16px 48px ${theme.colors.shadow};
  overflow: hidden;
  z-index: 1000;

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    border: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.surfaceAlt};
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h2`
  font-size: 0.95rem;
  font-weight: normal;
  color: ${theme.colors.accent};
  letter-spacing: 0.04em;
`;

const Subtitle = styled.p`
  font-size: 0.7rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${theme.radii.sm};
  color: ${theme.colors.muted};
  transition:
    color ${theme.transitions.default},
    background ${theme.transitions.default};

  &:hover:not(:disabled) {
    color: ${theme.colors.accent};
    background: ${theme.colors.surface};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const MessageList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WelcomeText = styled.p`
  font-size: 0.84rem;
  color: ${theme.colors.muted};
  line-height: 1.6;
`;

const ErrorBanner = styled.div`
  font-size: 0.78rem;
  color: ${theme.colors.text};
  padding: 10px 12px;
  border-radius: ${theme.radii.md};
  background: rgba(160, 60, 60, 0.18);
  border: 1px solid rgba(190, 90, 90, 0.4);
  line-height: 1.5;
`;

const InputForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 14px 6px;
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
`;

const TextArea = styled.textarea`
  flex: 1;
  resize: none;
  max-height: 120px;
  min-height: 38px;
  overflow-y: auto;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1.4;
  color: ${theme.colors.text};
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  outline: none;
  transition: border-color ${theme.transitions.default};

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${theme.colors.accent};
  }

  &::placeholder {
    color: ${theme.colors.muted};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SendBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: ${theme.radii.md};
  background: ${theme.colors.accent};
  color: ${theme.colors.bg};
  transition:
    background ${theme.transitions.default},
    transform ${theme.transitions.default};

  &:hover:not(:disabled) {
    background: ${theme.colors.text};
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Footer = styled.p`
  padding: 0 14px 10px;
  font-size: 0.66rem;
  color: ${theme.colors.muted};
  text-align: center;
  letter-spacing: 0.02em;
  background: ${theme.colors.surface};
`;
