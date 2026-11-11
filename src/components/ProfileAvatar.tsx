import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import photo1 from "../assets/photo-1.webp"; // dritto / center
import photo2 from "../assets/photo-2.webp"; // sinistra
import photo3 from "../assets/photo-3.webp"; // destra (forte)
import photo4 from "../assets/photo-4.webp"; // su
import photo5 from "../assets/photo-5.webp"; // giù (centro)
import photo6 from "../assets/photo-6.webp"; // sinistra-alto
import photo8 from "../assets/photo-8.webp"; // basso-sinistra
import photo9 from "../assets/photo-9.webp"; // basso-destra

type Zone =
  | "center"
  | "up"
  | "upper-left"
  | "right"
  | "left"
  | "down"
  | "lower-left"
  | "lower-right";

const ZONE_PHOTOS: Record<Zone, string> = {
  center: photo1,
  up: photo4,
  "upper-left": photo6,
  right: photo3,
  left: photo2,
  down: photo5,
  "lower-left": photo8,
  "lower-right": photo9,
};

function getZone(nx: number, ny: number): Zone {
  // Banda superiore
  if (ny < -0.35) {
    if (nx < -0.2) return "upper-left";
    return "up";
  }
  // Banda inferiore
  if (ny > 0.35) {
    if (nx > 0.25) return "lower-right";
    if (nx < -0.25) return "lower-left";
    return "down";
  }
  // Banda centrale verticale
  if (nx > 0.3) return "right";
  if (nx < -0.45) return "left";
  return "center";
}

const DEBOUNCE_MS = 60;

// Giro dello sguardo per la modalità automatica; il centro ripetuto fa da pausa.
const LOOK_AROUND: Zone[] = ["left", "upper-left", "up", "right", "lower-right", "down", "center", "center"];
const LOOK_STEP_MS = 700;

interface Props {
  // true: l'avatar si guarda intorno da solo e ignora il mouse (usato nella pagina 404).
  autoLook?: boolean;
}

export default function ProfileAvatar({ autoLook = false }: Props) {
  const [zone, setZone] = useState<Zone>("center");
  const rafRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentZoneRef = useRef<Zone>("center");
  const pendingRef = useRef<Zone>("center");

  // Modalità automatica. Ferma per chi ha attivato "riduci movimento" nel sistema.
  useEffect(() => {
    if (!autoLook) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    const id = window.setInterval(() => {
      step = (step + 1) % LOOK_AROUND.length;
      setZone(LOOK_AROUND[step]);
    }, LOOK_STEP_MS);
    return () => window.clearInterval(id);
  }, [autoLook]);

  // Modalità normale: lo sguardo segue il mouse (solo su dispositivi con mouse).
  useEffect(() => {
    if (autoLook) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        const candidate = getZone(nx, ny);

        if (candidate === currentZoneRef.current) {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
            debounceRef.current = null;
          }
          return;
        }

        if (candidate !== pendingRef.current) {
          pendingRef.current = candidate;
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            currentZoneRef.current = candidate;
            setZone(candidate);
            debounceRef.current = null;
          }, DEBOUNCE_MS);
        }
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [autoLook]);

  return (
    <Frame>
      {(Object.entries(ZONE_PHOTOS) as [Zone, string][]).map(([z, src]) => (
        <Photo
          key={z}
          src={src}
          alt={z === "center" ? "Luca Della Vecchia" : ""}
          $visible={z === zone}
        />
      ))}
    </Frame>
  );
}

const Frame = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  position: relative;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
`;

const Photo = styled.img<{ $visible: boolean; }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.25s ease-in-out;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;
