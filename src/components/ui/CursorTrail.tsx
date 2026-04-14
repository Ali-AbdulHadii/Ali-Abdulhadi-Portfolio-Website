import { useEffect, useRef } from 'react';

type Point = { x: number; y: number };

const MAX_POINTS = 28;
const FOLLOW_EASING = 0.22;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const currentRef = useRef<Point>({ x: 0, y: 0 });
  const isActiveRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const nextPoint = { x: event.clientX, y: event.clientY };
      targetRef.current = nextPoint;

      if (!isActiveRef.current) {
        isActiveRef.current = true;
        currentRef.current = nextPoint;
        pointsRef.current = [nextPoint];
      }
    };

    const handlePointerLeave = () => {
      isActiveRef.current = false;
    };

    const draw = () => {
      rafRef.current = window.requestAnimationFrame(draw);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isActiveRef.current) {
        currentRef.current = {
          x: currentRef.current.x + (targetRef.current.x - currentRef.current.x) * FOLLOW_EASING,
          y: currentRef.current.y + (targetRef.current.y - currentRef.current.y) * FOLLOW_EASING,
        };

        pointsRef.current.push({ ...currentRef.current });
        if (pointsRef.current.length > MAX_POINTS) {
          pointsRef.current.shift();
        }
      } else if (pointsRef.current.length > 0) {
        pointsRef.current.shift();
      }

      const points = pointsRef.current;
      if (points.length < 2) return;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 14;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.45)';

      for (let i = 1; i < points.length; i += 1) {
        const start = points[i - 1];
        const end = points[i];
        const t = i / (points.length - 1);

        ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 + t * 0.6})`;
        ctx.lineWidth = 1 + t * 4;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    };

    setCanvasSize();
    draw();

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}