import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatButton from './ChatButton';
import ChatPanel, { type ChatPanelHandle } from './ChatPanel';

/**
 * Container globale del chatbot. Gestisce lo stato open/close e
 * delega tutta la logica della conversazione a ChatPanel/useChat.
 */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<ChatPanelHandle>(null);

  // Quando il pannello si apre, sposta il focus sull'input.
  useEffect(() => {
    if (!open) return;
    // Piccolo delay per attendere il mount del pannello prima di focus.
    const id = window.setTimeout(() => panelRef.current?.focusInput(), 80);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <>
      <ChatButton open={open} onClick={() => setOpen(true)} />
      <AnimatePresence>
        {open && <ChatPanel ref={panelRef} open={open} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
