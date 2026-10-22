import { useEffect, useMemo, useRef } from 'react';

const MIN_CARDS = 8; // repeat items until the ring has at least this many
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const norm180 = (d) => ((((d + 180) % 360) + 360) % 360) - 180;

export default function CircularCarousel({
  items = [],
  cardWidth = 196,
  aspectRatio = 1,
  gap = 23,
  tilt = 0,
  perspective = 600,
  autoplay = 'drift',
  speed = 11,
  direction = 'left',
  momentum = 0.6,
  snap = true,
  pauseOnHover = true,
  focusOnClick = true,
  draggable = true,
  captions = false,
  fadeColor = '#000000',
  depthFade = 0.55,
  cornerRadius = 12,
  intro = 'none',
  onSelect,
  className = '',
  preset, curve, parallax, stretch, innerShade, interval,
}) {
  const ring = useMemo(() => {
    if (!items.length) return [];
    const reps = Math.max(1, Math.ceil(MIN_CARDS / items.length));
    const out = [];
    for (let r = 0; r < reps; r++) {
      items.forEach((item, i) => out.push({ ...item, key: `${r}-${i}`, srcIndex: i }));
    }
    return out;
  }, [items]);

  const n = ring.length;
  const step = n ? 360 / n : 0;
  const radius = n ? (cardWidth + gap) / (2 * Math.tan(Math.PI / n)) : 0;
  const cardHeight = cardWidth / aspectRatio;

  const cardRefs = useRef([]);
  const shadeRefs = useRef([]);
  const state = useRef({ angle: 0, vel: 0, target: null, dragging: false, hover: false, moved: 0, didDrag: false, lastX: 0, lastT: 0 });

  const cfg = useRef({});
  cfg.current = { step, radius, autoplay, speed, direction, momentum, snap, pauseOnHover, focusOnClick, draggable, depthFade };

  useEffect(() => {
    if (!n) return undefined;
    const s = state.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let last = performance.now();

    const paint = () => {
      const c = cfg.current;
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const a = i * c.step - s.angle;
        el.style.transform = `rotateY(${a}deg) translateZ(${c.radius}px)`;
        const depth = (1 - Math.cos((a * Math.PI) / 180)) / 2; // 0 front .. 1 back
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = String(clamp(c.depthFade * depth * 1.6, 0, 1));
      }
    };

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const c = cfg.current;

      if (!s.dragging) {
        if (s.target !== null) {
          const diff = s.target - s.angle;
          s.angle += diff * (1 - Math.exp(-dt * 7));
          if (Math.abs(diff) < 0.05) {
            s.angle = s.target;
            s.target = null;
          }
        } else if (Math.abs(s.vel) > 6) {
          s.angle += s.vel * dt;
          s.vel *= Math.exp(-(7 - 5.5 * clamp(c.momentum, 0, 1)) * dt);
          if (Math.abs(s.vel) <= 6) {
            s.vel = 0;
            if (c.snap) s.target = Math.round(s.angle / c.step) * c.step;
          }
        } else {
          s.vel = 0;
          const paused = c.pauseOnHover && s.hover;
          if (c.autoplay === 'drift' && !reduceMotion && !paused) {
            s.angle += (c.direction === 'right' ? -1 : 1) * c.speed * dt;
          }
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  const onPointerDown = (e) => {
    const c = cfg.current;
    if (!c.draggable || e.button > 0) return;
    const s = state.current;
    s.dragging = true;
    s.moved = 0;
    s.didDrag = false;
    s.vel = 0;
    s.target = null;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp;

    const move = (ev) => {
      const dx = ev.clientX - s.lastX;
      const dtMs = ev.timeStamp - s.lastT;
      const deg = (dx / cfg.current.radius) * (180 / Math.PI);
      s.angle -= deg;
      s.moved += Math.abs(dx);
      if (dtMs > 0) s.vel = clamp(0.7 * s.vel + 0.3 * (-deg / (dtMs / 1000)), -720, 720);
      s.lastX = ev.clientX;
      s.lastT = ev.timeStamp;
    };

    const up = (ev) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      s.dragging = false;
      s.didDrag = s.moved > 5;
      setTimeout(() => { s.didDrag = false; }, 0); // lets the click handler see it first
      if (ev.timeStamp - s.lastT > 80) s.vel = 0; // paused before release: no fling
      if (Math.abs(s.vel) <= 6 && cfg.current.snap) {
        s.vel = 0;
        s.target = Math.round(s.angle / cfg.current.step) * cfg.current.step;
      }
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };

  const focusCard = (i) => {
    const s = state.current;
    s.vel = 0;
    s.target = s.angle + norm180(i * cfg.current.step - s.angle);
  };

  const onCardClick = (i) => {
    const s = state.current;
    if (s.didDrag) return;
    if (cfg.current.focusOnClick) focusCard(i);
    if (onSelect) onSelect(items[ring[i].srcIndex]);
  };

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const s = state.current;
    const base = Math.round(s.angle / cfg.current.step) * cfg.current.step;
    s.vel = 0;
    s.target = base + (e.key === 'ArrowRight' ? -1 : 1) * cfg.current.step;
  };

  return (
    <div
      className={`cc ${className}`}
      style={{ perspective: `${perspective}px` }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Campus highlights"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerEnter={() => { state.current.hover = true; }}
      onPointerLeave={() => { state.current.hover = false; }}
      onKeyDown={onKeyDown}
    >
      <div
        className={`cc-ring${intro === 'rise' ? ' cc-rise' : ''}`}
        style={{ transform: `translateZ(${-radius}px) rotateX(${tilt}deg)` }}
      >
        {ring.map((item, i) => (
          <figure
            key={item.key}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="cc-card"
            style={{
              width: cardWidth,
              height: cardHeight,
              marginLeft: -cardWidth / 2,
              marginTop: -cardHeight / 2,
              borderRadius: cornerRadius,
            }}
            onClick={() => onCardClick(i)}
          >
            <img src={item.src} alt={item.alt || ''} draggable={false} />
            {captions && (item.title || item.subtitle) && (
              <figcaption className="cc-caption">
                {item.title && <strong>{item.title}</strong>}
                {item.subtitle && <span>{item.subtitle}</span>}
              </figcaption>
            )}
            <span
              className="cc-shade"
              ref={(el) => { shadeRefs.current[i] = el; }}
              style={{ background: fadeColor }}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
