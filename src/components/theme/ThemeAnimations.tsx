import React, { useEffect, useRef, useState } from 'react';
import { useFestivalTheme } from '@/context/FestivalThemeContext';
import type { AnimationType } from '@/lib/theme-types';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  color: string;
  character?: string;
}

const animationConfigs: Record<AnimationType, { colors: string[]; characters?: string[]; count: { low: number; medium: number; high: number } }> = {
  confetti: {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'],
    count: { low: 20, medium: 40, high: 80 },
  },
  snow: {
    colors: ['#FFFFFF', '#E8F4F8', '#D4E5ED'],
    characters: ['❄', '❅', '❆', '•'],
    count: { low: 30, medium: 60, high: 100 },
  },
  fireworks: {
    colors: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#32CD32', '#9370DB'],
    characters: ['✦', '✧', '★', '✴', '✵'],
    count: { low: 15, medium: 30, high: 50 },
  },
  diyas: {
    colors: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347'],
    characters: ['🪔', '✨', '💫'],
    count: { low: 10, medium: 20, high: 35 },
  },
  petals: {
    colors: ['#FFB7C5', '#FF69B4', '#FFC0CB', '#FFE4E1', '#FF1493'],
    characters: ['🌸', '🌺', '✿', '❀'],
    count: { low: 15, medium: 30, high: 50 },
  },
  hearts: {
    colors: ['#FF6B6B', '#FF1493', '#DC143C', '#FF69B4'],
    characters: ['❤', '💕', '💖', '💗'],
    count: { low: 10, medium: 20, high: 40 },
  },
  leaves: {
    colors: ['#8B4513', '#D2691E', '#CD853F', '#F4A460', '#DAA520'],
    characters: ['🍂', '🍁', '🍃'],
    count: { low: 15, medium: 30, high: 50 },
  },
  stars: {
    colors: ['#FFD700', '#FFF8DC', '#FFFACD', '#F0E68C'],
    characters: ['⭐', '✨', '💫', '✦'],
    count: { low: 15, medium: 30, high: 50 },
  },
  none: {
    colors: [],
    count: { low: 0, medium: 0, high: 0 },
  },
};

export function ThemeAnimations() {
  const { currentTheme, userPreferences } = useFestivalTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const { animation } = currentTheme;
  const shouldAnimate = animation.enabled && 
    !userPreferences.disableAnimations && 
    !userPreferences.reducedMotion &&
    animation.type !== 'none';

  useEffect(() => {
    if (!shouldAnimate) {
      setParticles([]);
      return;
    }

    const config = animationConfigs[animation.type];
    const count = config.count[animation.intensity];

    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -100 - 10,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      character: config.characters ? config.characters[Math.floor(Math.random() * config.characters.length)] : undefined,
    }));

    setParticles(initialParticles);

    // Animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 50) { // ~20fps for performance
        lastTime = time;
        setParticles(prev => prev.map(p => {
          let newY = p.y + p.speed;
          let newX = p.x + Math.sin(time / 1000 + p.id) * 0.3;
          let newRotation = p.rotation + p.speed;

          // Reset particle when it goes off screen
          if (newY > 110) {
            newY = -10;
            newX = Math.random() * 100;
          }

          return {
            ...p,
            y: newY,
            x: newX,
            rotation: newRotation,
          };
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldAnimate, animation.type, animation.intensity]);

  if (!shouldAnimate || particles.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]"
      aria-hidden="true"
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transition-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}rem`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`,
            color: particle.color,
            textShadow: animation.type === 'fireworks' ? `0 0 10px ${particle.color}` : undefined,
            willChange: 'transform, top, left',
          }}
        >
          {particle.character || (
            <div
              style={{
                width: `${particle.size * 8}px`,
                height: `${particle.size * 8}px`,
                backgroundColor: particle.color,
                borderRadius: animation.type === 'confetti' ? '2px' : '50%',
                transform: animation.type === 'confetti' ? `rotate(${particle.rotation}deg)` : undefined,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
