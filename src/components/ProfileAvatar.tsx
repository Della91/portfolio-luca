import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

import p0 from '../assets/profile.png';   // sguardo sinistra
import p1 from '../assets/profile-1.png'; // sguardo dritto (default)
import p2 from '../assets/profile-2.png'; // sguardo alto-destra
import p3 from '../assets/profile-3.png'; // sguardo destra
import p4 from '../assets/profile-4.png'; // sguardo alto
import p5 from '../assets/profile-5.png'; // sguardo alto-sinistra

const images = [p0, p1, p2, p3, p4, p5];

const H_THRESHOLD = 0.22;
const V_THRESHOLD = 0.25;
const HYSTERESIS = 0.05;

function getZone(nx: number, ny: number, current: number): number {
  const upActive    = current === 4 || current === 2 || current === 5;
  const rightActive = current === 3 || current === 2;
  const leftActive  = current === 0 || current === 5;

  const goingUp    = ny < -(V_THRESHOLD - (upActive ? HYSTERESIS : 0));
  const goingRight = nx >  (H_THRESHOLD - (rightActive ? HYSTERESIS : 0));
  const goingLeft  = nx < -(H_THRESHOLD - (leftActive ? HYSTERESIS : 0));

  if (goingUp) {
    if (goingLeft)  return 5;
    if (goingRight) return 2;
    return 4;
  }
  if (goingRight) return 3;
  if (goingLeft)  return 0;
  return 1;
}

interface Props {
  fill?: boolean;
  borderRadius?: string;
}

export default function ProfileAvatar({ fill = false, borderRadius = '10px' }: Props) {
  const [index, setIndex] = useState(1);
  const indexRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  // Preload tutte le immagini al mount così lo swap è istantaneo
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    // Tracking del mouse attivo solo su dispositivi con puntatore preciso (desktop).
    // Su touch / coarse pointer si lascia l'avatar nello stato di default.
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;

        const next = getZone(nx, ny, indexRef.current);
        if (next !== indexRef.current) {
          indexRef.current = next;
          setIndex(next);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Container $fill={fill} $radius={borderRadius}>
      <Img src={images[index]} alt="Luca Della Vecchia" $radius={borderRadius} />
    </Container>
  );
}

const Container = styled.div<{ $fill: boolean; $radius: string }>`
  position: relative;
  ${({ $fill }) =>
    $fill
      ? `width: 100%; height: 100%;`
      : `width: 220px; height: 290px;`}
  border-radius: ${({ $radius }) => $radius};
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
  flex-shrink: 0;
`;

const Img = styled.img<{ $radius: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: ${({ $radius }) => $radius};
  display: block;
`;
