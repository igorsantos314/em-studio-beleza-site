import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Icon from '../ui/Icon';
import {
  ROULETTE_PRIMARY_COLOR,
  ROULETTE_SEGMENT_COUNT,
  ROULETTE_SURFACE_COLOR,
} from '../../constants/colorWheel';

interface ColorRouletteProps {
  targetIndex: number;
  number: number;
  onStop: () => void;
  onSpin: () => void;
}

type ConfettiStyle = CSSProperties & { '--confetti-x': string };

const SPIN_DURATION_MS = 3600;
const SPIN_TURNS = 4;
const CONFETTI_COLORS = ['#FFD700', '#F2C14E', '#E8B84B', '#FFC93C', '#E0A800'];

const ColorRoulette = ({ targetIndex, number, onStop, onSpin }: ColorRouletteProps) => {
  const [rotation, setRotation] = useState(0);
  const [stopped, setStopped] = useState(false);

  const onStopRef = useRef(onStop);
  onStopRef.current = onStop;

  const segmentAngle = 360 / ROULETTE_SEGMENT_COUNT;

  const gradient = useMemo(() => {
    const stops = Array.from({ length: ROULETTE_SEGMENT_COUNT }, (_, index) => {
      const color = index % 2 === 0 ? ROULETTE_PRIMARY_COLOR : ROULETTE_SURFACE_COLOR;
      return `${color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }, [segmentAngle]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 0.35}s`,
        drift: `${Math.round((Math.random() - 0.5) * 90)}px`,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      })),
    []
  );

  useEffect(() => {
    const landing = 360 - (targetIndex * segmentAngle + segmentAngle / 2);
    const frame = window.requestAnimationFrame(() => {
      setRotation(360 * SPIN_TURNS + landing);
    });
    const timer = window.setTimeout(() => {
      setStopped(true);
      onStopRef.current();
    }, SPIN_DURATION_MS + 150);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [targetIndex, segmentAngle]);

  return (
    <div className="relative flex flex-col items-center gap-4 py-2">
      {stopped && (
        <div className="pointer-events-none absolute left-1/2 top-6 z-20 h-40 w-40 -translate-x-1/2">
          {confetti.map((piece) => {
            const style: ConfettiStyle = {
              left: piece.left,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              '--confetti-x': piece.drift,
            };
            return <span key={piece.id} className="confetti-piece" style={style} />;
          })}
        </div>
      )}

      <div className="relative h-40 w-40">
        <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 drop-shadow">
          <div className="h-0 w-0 border-l-[9px] border-r-[9px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#2C2420]" />
        </div>

        <div
          className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
          style={{
            background: gradient,
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.16, 0.84, 0.16, 1)`,
          }}
        />

        <button
          type="button"
          onClick={stopped ? onSpin : undefined}
          disabled={!stopped}
          aria-label={stopped ? 'Girar novamente' : 'Sorteando sua cor'}
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#2C2420] text-white transition-transform enabled:hover:scale-105 disabled:cursor-default"
        >
          <Icon name={stopped ? 'refresh' : 'casino'} size={22} />
        </button>
      </div>

      {stopped ? (
        <div className="flex items-center gap-3 rounded-2xl bg-[#2C2420] px-5 py-3 text-white shadow-lg">
          <span className="text-[10px] uppercase tracking-wide text-[#C8B8A8]">Número</span>
          <span className="font-serif text-4xl leading-none">{number}</span>
        </div>
      ) : (
        <p className="text-sm text-[#5C4F45]">Sorteando sua cor…</p>
      )}
    </div>
  );
};

export default ColorRoulette;
