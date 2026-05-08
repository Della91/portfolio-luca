import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import photo1 from '../assets/photo-1.png'; // dritto / default
import photo2 from '../assets/photo-2.png'; // sinistra (lieve)
import photo3 from '../assets/photo-3.png'; // destra (forte)
import photo4 from '../assets/photo-4.png'; // su
import photo5 from '../assets/photo-5.png'; // giù
import photo6 from '../assets/photo-6.png'; // sinistra-alto
import photo7 from '../assets/photo-7.png'; // sinistra (moderata)
import photo8 from '../assets/photo-8.png'; // destra-basso
import photo9 from '../assets/photo-9.png'; // destra (moderata)

type Zone =
  | 'center'
  | 'up'
  | 'upper-left'
  | 'down'
  | 'lower-right'
  | 'right'
  | 'right-mid'
  | 'left'
  | 'left-subtle';

const ZONE_PHOTOS: Record<Zone, string> = {
  center: photo1,
  up: photo4,
  'upper-left': photo6,
  down: photo5,
  'lower-right': photo8,
  right: photo3,
  'right-mid': photo9,
  left: photo7,
  'left-subtle': photo2,
};

function getZone(nx: number, ny: number): Zone {
  // Banda superiore
  if (ny < -0.35) {
    if (nx < -0.2) return 'upper-left';
    return 'up';
  }
  // Banda inferiore
  if (ny > 0.35) {
    if (nx > 0.1) return 'lower-right';
    return 'down';
  }
  // Banda centrale verticale
  if (nx > 0.55) return 'right';
  if (nx > 0.2) return 'right-mid';
  if (nx < -0.4) return 'left';
  if (nx < -0.15) return 'left-subtle';
  return 'center';
}

const DEBOUNCE_MS = 60;

export default function ProfileAvatar() {
  const [zone, setZone] = useState<Zone>('center');
  const rafRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentZoneRef = useRef<Zone>('center');
  const pendingRef = useRef<Zone>('center');

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        const candidate = getZone(nx, ny);

        if (candidate === currentZoneRef.current) {
          // Se torniamo nella zona corrente, annulla qualsiasi switch pendente
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

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Frame>
      {(Object.entries(ZONE_PHOTOS) as [Zone, string][]).map(([z, src]) => (
        <Photo
          key={z}
          src={src}
          alt={z === 'center' ? 'Luca Della Vecchia' : ''}
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
`;

const Photo = styled.img<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.25s ease-in-out;
  will-change: opacity;
`;
