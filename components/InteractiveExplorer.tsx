
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MEASLES_DATA } from '../constants';

interface Props {
  onSelectItem: (id: string) => void;
  onNavigate: (direction: 'prev' | 'next' | 'reset') => void;
  showLabels: boolean;
}

const EXPERT_KEYS = ["Epidemiología", "Incubación", "Pródromo", "Exantema", "Recuperación", "Complicaciones", "Diagnóstico", "Tratamiento", "Prevención"];

const InteractiveExplorer: React.FC<Props> = ({ onSelectItem, onNavigate, showLabels }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const starsRef = useRef<{x: number, y: number, size: number, opacity: number, layer: number}[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Parámetros de escalado
  const PLANET_RADIUS = 26;
  const HUB_WIDTH = 170;
  const HUB_HEIGHT = 76;

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5,
        opacity: Math.random(),
        layer: Math.floor(Math.random() * 3)
      });
    }
    starsRef.current = stars;
  }, []);

  const drawMosaicPlanet = (ctx: CanvasRenderingContext2D, color: string, radius: number, isHovered: boolean) => {
    const fragments = 7;
    ctx.save();
    
    for (let i = 0; i < fragments; i++) {
      const angleStart = (i / fragments) * Math.PI * 2;
      const angleEnd = ((i + 1) / fragments) * Math.PI * 2;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angleStart, angleEnd);
      ctx.closePath();
      
      const brightness = 0.8 + Math.random() * 0.4;
      ctx.fillStyle = color;
      ctx.globalAlpha = brightness;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    const grad = ctx.createLinearGradient(-radius, -radius, radius, radius);
    grad.addColorStop(0, 'rgba(255,255,255,0.3)');
    grad.addColorStop(0.5, 'transparent');
    grad.addColorStop(1, 'rgba(0,0,0,0.15)');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    // Órbita dinámica basada en el tamaño real del canvas
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.36;

    // Fondo Nebulosa
    ctx.globalAlpha = 0.2;
    const nebGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, orbitRadius * 1.5);
    nebGrad.addColorStop(0, '#1e40af');
    nebGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // Estrellas
    starsRef.current.forEach(star => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.5})`;
      ctx.beginPath();
      ctx.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Línea de Órbita
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    rotationRef.current += 0.0006;

    // Hub Central Mosaico reducido
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(255,255,255,0.1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(-HUB_WIDTH / 2, -HUB_HEIGHT / 2, HUB_WIDTH, HUB_HEIGHT, HUB_HEIGHT / 2);
    ctx.fill();
    ctx.restore();

    // Botones del Hub
    const drawBtn = (x: number, y: number, r: number, color: string, icon: string) => {
      const dist = Math.hypot(mousePos.current.x - x, mousePos.current.y - y);
      const hover = dist < r;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(hover ? 1.15 : 1, hover ? 1.15 : 1);
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = '900 14px "Font Awesome 6 Free"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(icon, 0, 0);
      ctx.restore();
    };

    const btnSpacing = 50;
    drawBtn(centerX - btnSpacing, centerY, 22, '#ef4444', '\uf060');
    drawBtn(centerX, centerY, 28, '#f59e0b', '\uf015');
    drawBtn(centerX + btnSpacing, centerY, 22, '#10b981', '\uf061');

    // Planetas
    EXPERT_KEYS.forEach((key, index) => {
      const angle = (index / EXPERT_KEYS.length) * Math.PI * 2 + rotationRef.current;
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;
      const isHovered = hoveredKey === key;
      const scale = isHovered ? 1.3 : 1;
      const data = MEASLES_DATA[key];
      
      const color = data.type === 'clinical' ? '#ff1e6d' : data.type === 'diag' ? '#00b4ff' : '#ffcf00';

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      
      if (isHovered) {
        ctx.shadowBlur = 30;
        ctx.shadowColor = color;
      }

      drawMosaicPlanet(ctx, color, PLANET_RADIUS, isHovered);

      // Icono
      ctx.fillStyle = 'white';
      ctx.font = 'bold 15px "Font Awesome 6 Free"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const iconMap: any = { "Epidemiología": '\uf57d', "Incubación": '\uf251', "Pródromo": '\uf0f1', "Exantema": '\uf1da', "Recuperación": '\uf3ed', "Complicaciones": '\uf071', "Diagnóstico": '\uf0c3', "Tratamiento": '\uf484', "Prevención": '\uf48e' };
      ctx.fillText(iconMap[key] || '\uf05a', 0, 0);

      if (showLabels) {
        ctx.fillStyle = isHovered ? 'white' : 'rgba(255,255,255,0.7)';
        ctx.font = isHovered ? '900 11px Inter' : '700 10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(key.toUpperCase(), 0, PLANET_RADIUS + 18);
      }
      ctx.restore();
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [showLabels, hoveredKey, HUB_WIDTH, HUB_HEIGHT, PLANET_RADIUS]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };

    const canvas = canvasRef.current!;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.36;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let found = null;
    EXPERT_KEYS.forEach((key, index) => {
      const angle = (index / EXPERT_KEYS.length) * Math.PI * 2 + rotationRef.current;
      const px = centerX + Math.cos(angle) * orbitRadius;
      const py = centerY + Math.sin(angle) * orbitRadius;
      if (Math.hypot(x - px, y - py) < PLANET_RADIUS * 1.5) found = key;
    });
    setHoveredKey(found);
  };

  const handleResize = useCallback(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
      canvasRef.current.height = canvasRef.current.parentElement.clientHeight;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleClick = () => {
    if (hoveredKey) {
      onSelectItem(hoveredKey);
    } else {
      const canvas = canvasRef.current!;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const btnSpacing = 50;
      
      if (Math.hypot(mousePos.current.x - (centerX - btnSpacing), mousePos.current.y - centerY) < 22) onNavigate('prev');
      if (Math.hypot(mousePos.current.x - centerX, mousePos.current.y - centerY) < 28) onNavigate('reset');
      if (Math.hypot(mousePos.current.x - (centerX + btnSpacing), mousePos.current.y - centerY) < 22) onNavigate('next');
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="w-full h-full cursor-pointer touch-none"
    />
  );
};

export default InteractiveExplorer;
