import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import photo1 from '../assets/photo-1.png'; // straight / default
import photo2 from '../assets/photo-2.png'; // upper-right
import photo3 from '../assets/photo-3.png'; // right (strong)
import photo4 from '../assets/photo-4.png'; // up
import photo5 from '../assets/photo-5.png'; // down
import photo6 from '../assets/photo-6.png'; // upper-left
import photo7 from '../assets/photo-7.png'; // upper-right (subtle)
import photo8 from '../assets/photo-8.png'; // lower-right
import photo9 from '../assets/photo-9.png'; // right (variant)

type Zone =
  | 'center'
  | 'upper-left'
  | 'upper-right'
  | 'upper-right-subtle'
  | 'right'
  | 'right-variant'
  | 'lower-right'
  | 'up'
  | 'down';

const ZONE_PHOTOS: Record<Zone, string> = {
  center: photo1,
  'upper-right-subtle': photo7,
  'upper-right': photo2,
  'right-variant': photo9,
  right: photo3,
  'lower-right': photo8,
  up: photo4,
  down: photo5,
  'upper-left': photo6,
};

function getZone(nx: number, ny: number): Zone {
  // nx: -1 (left) → +1 (right), ny: -1 (top) → +1 (bottom)
  if (Math.abs(nx) < 0.25 && Math.abs(ny) < 0.25) return 'center';
  if (ny < -0.4) {
    if (nx > 0.2) return 'upper-right';
    if (nx < -0.2) return 'upper-left';
    return 'up';
  }
  if (ny > 0.4) {
    if (nx > 0.1) return 'lower-right';
    return 'down';
  }
  // mid-vertical band
  if (nx > 0.6) return 'right';
  if (nx > 0.25) return nx > 0.45 ? 'right-variant' : 'upper-right-subtle';
  if (nx < -0.25) return 'upper-left';
  return 'center';
}

const HYSTERESIS = 0.08; // normalized units — prevents flickering at zone edges

export default function ProfileAvatar() {
  const [zone, setZone] = useState<Zone>('center');
  const rafRef = useRef<number | null>(null);
  const currentZoneRef = useRef<Zone>('center');
  // raw position at last zone change, for hysteresis
  const zoneOriginRef = useRef({ nx: 0, ny: 0 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;

        const candidate = getZone(nx, ny);

        if (candidate !== currentZoneRef.current) {
          const dx = nx - zoneOriginRef.current.nx;
          const dy = ny - zoneOriginRef.current.ny;
          // only switch zone if cursor has moved enough from the last switch point
          if (Math.sqrt(dx * dx + dy * dy) >= HYSTERESIS) {
            currentZoneRef.current = candidate;
            zoneOriginRef.current = { nx, ny };
            setZone(candidate);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const src = ZONE_PHOTOS[zone];

  return (
    <Frame>
      {Object.entries(ZONE_PHOTOS).map(([z, imgSrc]) => (
        <Photo
          key={z}
          src={imgSrc}
          alt={z === 'center' ? 'Luca Della Vecchia' : ''}
          $visible={z === zone}
        />
      ))}
      {/* preload hidden — avoids first-switch flash */}
      <span aria-hidden style={{ display: 'none' }}>{src}</span>
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
  transition: opacity 0.18s ease-in-out;
  will-change: opacity;
`;
