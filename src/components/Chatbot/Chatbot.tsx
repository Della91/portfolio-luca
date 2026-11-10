import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useChat } from "../../hooks/useChat";
import ChatButton from "./ChatButton";
import ChatPanel, { type ChatPanelHandle } from "./ChatPanel";

// La conversazione sta qui e non in ChatPanel: ChatPanel viene eliminato quando la chat
// si chiude, Chatbot resta sempre nella pagina. Così chiudendo e riaprendo i messaggi restano.
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<ChatPanelHandle>(null);
  const chat = useChat();

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
        {open && <ChatPanel ref={panelRef} chat={chat} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
