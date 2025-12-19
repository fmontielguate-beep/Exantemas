
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MEASLES_DATA } from '../constants';

interface Props {
  onSelectItem: (id: string) => void;
  onNavigate: (direction: 'prev' | 'next' | 'reset') => void;
  showLabels: boolean;
}

const EXPERT_KEYS = ["Epidemiología", "Incubación", "Pródromo", "Exantema", "Recuperación", "Complicaciones", "Diagnóstico", "Tratamiento", "Prevención"];

// Mapeo de colores únicos por tema
export const TOPIC_COLORS: Record<string, string> = {
  "Epidemiología": "#06b6d4", // Cian
  "Incubación": "#3b82f6",    // Azul
  "Pródromo": "#f59e0b",      // Ámbar
  "Exantema": "#e11d48",      // Carmesí
  "Recuperación": "#10b981",  // Esmeralda
  "Complicaciones": "#f97316", // Naranja
  "Diagnóstico": "#d946ef",   // Fucsia
  "Tratamiento": "#8b5cf6",   // Violeta
  "Prevención": "#14b8a6"     // Turquesa
};

const InteractiveExplorer: React.FC<Props> = ({ onSelectItem, onNavigate, showLabels }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const starsRef = useRef<{x: number, y: number, size: number, opacity: number}[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const PLANET_RADIUS = 24;
  const HUB_W = 160;
  const HUB_H = 70;

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({ x: Math.random(), y: Math.random(), size: Math.random() * 2, opacity: Math.random() });
    }
    starsRef.current = stars;
  }, []);

  const drawMosaic = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, isHovered: boolean) => {
    const fragments = 8;
    ctx.save();
    ctx.translate(x, y);
    
    // Sombra de brillo (glow)
    ctx.shadowBlur = isHovered ? 30 : 15;
    ctx.shadowColor = color;

    if (isHovered) ctx.scale(1.3, 1.3);

    for (let i = 0; i < fragments; i++) {
      const a1 = (i / fragments) * Math.PI * 2;
      const a2 = ((i + 1) / fragments) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, a1, a2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7 + Math.random() * 0.3;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Brillo vidriado
    ctx.shadowBlur = 0;
    const g = ctx.createRadialGradient(-r/2, -r/2, 0, 0, 0, r*1.2);
    g.addColorStop(0, 'rgba(255,255,255,0.5)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const orbitR = Math.min(canvas.width, canvas.height) * 0.35;

    // Estrellas
    starsRef.current.forEach(s => {
      ctx.fillStyle = `rgba(255,255,255,${s.opacity * 0.4})`;
      ctx.beginPath(); ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size, 0, Math.PI*2); ctx.fill();
    });

    // Órbita
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.setLineDash([10, 20]);
    ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);

    rotationRef.current += 0.0005;

    // Hub Central
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 40;
    ctx.shadowColor = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.roundRect(-HUB_W/2, -HUB_H/2, HUB_W, HUB_H, 35); ctx.fill();
    ctx.restore();

    // Botones Hub
    const drawBtn = (bx: number, by: number, br: number, bcol: string, bicon: string) => {
      const d = Math.hypot(mousePos.current.x - bx, mousePos.current.y - by);
      const h = d < br;
      ctx.save();
      ctx.translate(bx, by);
      if (h) ctx.scale(1.2, 1.2);
      ctx.fillStyle = bcol;
      ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = '900 14px "Font Awesome 6 Free"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(bicon, 0, 0);
      ctx.restore();
    };

    drawBtn(cx - 50, cy, 20, '#ef4444', '\uf060');
    drawBtn(cx, cy, 26, '#f59e0b', '\uf015');
    drawBtn(cx + 50, cy, 20, '#10b981', '\uf061');

    // Planetas Mosaico
    EXPERT_KEYS.forEach((key, i) => {
      const ang = (i / EXPERT_KEYS.length) * Math.PI * 2 + rotationRef.current;
      const px = cx + Math.cos(ang) * orbitR;
      const py = cy + Math.sin(ang) * orbitR;
      const isH = hoveredKey === key;
      const color = TOPIC_COLORS[key] || '#ffffff';

      drawMosaic(ctx, px, py, PLANET_RADIUS, color, isH);

      // Iconos
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px "Font Awesome 6 Free"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const iconMap: any = { "Epidemiología": '\uf57d', "Incubación": '\uf251', "Pródromo": '\uf0f1', "Exantema": '\uf1da', "Recuperación": '\uf3ed', "Complicaciones": '\uf071', "Diagnóstico": '\uf0c3', "Tratamiento": '\uf484', "Prevención": '\uf48e' };
      ctx.fillText(iconMap[key] || '\uf05a', px, py);

      if (showLabels) {
        ctx.fillStyle = isH ? 'white' : 'rgba(255,255,255,0.7)';
        ctx.font = isH ? '900 11px Inter' : '700 9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(key.toUpperCase(), px, py + PLANET_RADIUS + 18);
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [showLabels, hoveredKey]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
        canvasRef.current.height = canvasRef.current.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current!);
    };
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mousePos.current = { x, y };

    const canvas = canvasRef.current!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const orbitR = Math.min(canvas.width, canvas.height) * 0.35;

    let found = null;
    EXPERT_KEYS.forEach((key, i) => {
      const ang = (i / EXPERT_KEYS.length) * Math.PI * 2 + rotationRef.current;
      const px = cx + Math.cos(ang) * orbitR;
      const py = cy + Math.sin(ang) * orbitR;
      if (Math.hypot(x - px, y - py) < PLANET_RADIUS * 1.5) found = key;
    });
    setHoveredKey(found);
  };

  const handleClick = () => {
    if (hoveredKey) onSelectItem(hoveredKey);
    else {
      const cx = canvasRef.current!.width / 2;
      const cy = canvasRef.current!.height / 2;
      if (Math.hypot(mousePos.current.x - (cx-50), mousePos.current.y - cy) < 20) onNavigate('prev');
      if (Math.hypot(mousePos.current.x - cx, mousePos.current.y - cy) < 26) onNavigate('reset');
      if (Math.hypot(mousePos.current.x - (cx+50), mousePos.current.y - cy) < 20) onNavigate('next');
    }
  };

  return <canvas ref={canvasRef} onMouseMove={handleMouseMove} onClick={handleClick} className="w-full h-full cursor-pointer" />;
};

export default InteractiveExplorer;
