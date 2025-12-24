import React, { useEffect, useState, useCallback, memo } from 'react';
import { useThemeEngine } from '@/context/ThemeEngineContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  opacity: number;
}

// Memoized animation component for performance
export const ThemeAnimations = memo(function ThemeAnimations() {
  const { currentTheme, animationsEnabled } = useThemeEngine();
  const [particles, setParticles] = useState<Particle[]>([]);

  const animationType = currentTheme.animation;
  const shouldAnimate = animationsEnabled && animationType !== 'none';

  // Generate particles based on animation type
  const generateParticles = useCallback(() => {
    if (!shouldAnimate) return [];

    const count = 20; // Keep it light for performance
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const colors = getColors(animationType);
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: 0,
        size: animationType === 'snow' ? 4 + Math.random() * 4 : 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        opacity: 0.5 + Math.random() * 0.4,
      });
    }

    return newParticles;
  }, [animationType, shouldAnimate]);

  useEffect(() => {
    if (shouldAnimate) {
      setParticles(generateParticles());
      
      // Regenerate particles periodically
      const interval = setInterval(() => {
        setParticles(generateParticles());
      }, 15000);

      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [shouldAnimate, generateParticles]);

  if (!shouldAnimate || particles.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-particle"
          style={{
            left: `${particle.x}%`,
            top: `-${particle.size}px`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: animationType === 'snow' ? '50%' : '2px',
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: var(--particle-opacity, 0.8);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-particle {
          animation: particle-fall linear forwards;
        }
      `}</style>
    </div>
  );
});

function getColors(type: string): string[] {
  switch (type) {
    case 'confetti':
      return ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'];
    case 'snow':
      return ['#FFFFFF', '#E8F4F8', '#D4E5ED'];
    case 'fireworks':
      return ['#FFD700', '#FF6B35', '#FF4081', '#7C4DFF', '#00E5FF'];
    case 'diyas':
      return ['#FFB347', '#FFCC33', '#FF8C00', '#FFD700'];
    case 'petals':
      return ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FF1493'];
    case 'stars':
      return ['#FFD700', '#FFFACD', '#F0E68C', '#FAFAD2'];
    default:
      return ['#888888'];
  }
}
