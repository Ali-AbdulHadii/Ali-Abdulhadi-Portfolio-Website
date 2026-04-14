/**
 * ParticleSphere
 * –––––––––––––
 * Canvas-based glowing dotted sphere rendered in the background of the hero.
 * Built from latitude/longitude rings so the sphere shape is always legible.
 * Fixed position, pointer-events disabled, z-index 0 (behind all UI).
 */

import { useEffect, useRef } from 'react';

interface Dot {
  ux: number;          // unit-sphere x
  uy: number;          // unit-sphere y
  uz: number;          // unit-sphere z
  baseSize: number;
  baseOpacity: number;
}

export default function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;

    // ── Resize handler ──────────────────────────────────────────
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Build dots from latitude / longitude rings ──────────────
    // Structured rings give a legible sphere silhouette,
    // unlike Fibonacci which looks more like a cloud.
    const dots: Dot[] = [];
    const LAT_RINGS = 26;

    for (let ring = 0; ring <= LAT_RINGS; ring++) {
      const phi   = (ring / LAT_RINGS) * Math.PI;  // 0 → π
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      // Points per ring proportional to the ring's circumference
      const count = Math.max(1, Math.round(sinPhi * 46));

      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        dots.push({
          ux: sinPhi * Math.cos(theta),
          uy: cosPhi,
          uz: sinPhi * Math.sin(theta),
          // Slight size variation keeps it organic while structured
          baseSize:    1.05 + Math.random() * 0.95,
          baseOpacity: 0.38 + Math.random() * 0.38,
        });
      }
    }

    // ── Animation state ─────────────────────────────────────────
    let rotY  = 0;      // continuous slow Y rotation
    let time  = 0;
    const TILT = 0.28;  // static X tilt (radians) — makes the poles visible
    const FOV  = 2.6;   // perspective field of view constant
    const WAVE_SPEED = 0.16; // bottom -> top breathing sweep speed
    const WAVE_WIDTH = 0.22; // softness of the breathing band
    const BREATH_AMPLITUDE = 0.07; // how much dots expand/contract along the wave
    const BREATH_RATE = 2.2; // breathing oscillation rate

    // ── Render loop ─────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      time  += 0.007;
      rotY  += 0.0011;   // ~0.06 °/frame — very slow

      // Sphere centre: right-of-centre, vertically centred
      const cx = W * 0.725;
      const cy = H * 0.50;

      // Radius — capped so it never feels overwhelming on large screens
      const baseR = Math.min(W * 0.255, H * 0.44, 310);

      // Gentle breathing pulse (~±1.5 %)
      const pulse = 1 + Math.sin(time * 0.21) * 0.015;
      const R = baseR * pulse;

      // Precompute rotation components
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(TILT);
      const sinX = Math.sin(TILT);

      // Project all dots to screen space
      type Projected = {
        px: number; py: number;
        depth: number;          // 0 = back, 1 = front
        sz: number;
        op: number;
      };

      const projected: Projected[] = dots.map((d) => {
        // Rotate around Y axis
        const x1 = d.ux * cosY + d.uz * sinY;
        const z1 = -d.ux * sinY + d.uz * cosY;

        // Rotate around X axis (tilt)
        const y1 = d.uy * cosX - z1 * sinX;
        const z2 = d.uy * sinX + z1 * cosX;

        // Bottom -> top breathing sweep on the sphere
        // waveCenterY travels from -1 (bottom) to +1 (top), then loops
        const waveCenterY = -1 + ((time * WAVE_SPEED) % 1) * 2;
        const distToWave = Math.abs(d.uy - waveCenterY);
        const waveBand = Math.exp(-(distToWave * distToWave) / (2 * WAVE_WIDTH * WAVE_WIDTH));

        // Movement-only breathing (no color/opacity boost):
        // dots near the wave gently expand/contract in place
        const breathOffset = Math.sin(time * BREATH_RATE) * BREATH_AMPLITUDE * waveBand;
        const localScale = 1 + breathOffset;
        const x2 = x1 * localScale;
        const y2 = y1 * localScale;
        const z3 = z2 * localScale;

        // Recompute perspective/depth from breathed position
        const persp2 = FOV / (FOV + z3);
        const depth = (z3 + 1) * 0.5;

        // Back-face dots are dimmer and smaller — creates depth cue without hiding them entirely
        const op = d.baseOpacity * (0.10 + depth * 0.90);
        const sz = d.baseSize   * (0.32 + depth * 0.68) * persp2;

        return {
          px: cx + x2 * R * persp2,
          py: cy + y2 * R * persp2,
          depth,
          sz,
          op,
        };
      });

      // Painter's algorithm: back to front
      projected.sort((a, b) => a.depth - b.depth);

      // ── Draw each dot ────────────────────────────────────────
      for (const p of projected) {
        const a = Math.min(p.op, 1);
        if (a < 0.035 || p.sz < 0.12) continue;

        const glowR = p.sz * 5.5;

        // Soft glow halo — cyan fade, no thick fog
        const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowR);
        glow.addColorStop(0,    `rgba(60,  200, 255, ${a * 0.52})`);
        glow.addColorStop(0.30, `rgba(20,  130, 235, ${a * 0.20})`);
        glow.addColorStop(1,    `rgba(0,   40,  150, 0)`);

        ctx.beginPath();
        ctx.arc(p.px, p.py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Hard core dot — bright white-cyan centre
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(p.sz * 0.62, 0.45), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(188, 238, 255, ${Math.min(a * 1.12, 0.93)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none select-none fixed inset-0"
      style={{ zIndex: 0 }}
    />
  );
}
