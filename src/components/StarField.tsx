import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 5000;
    const speed = 0.5;
    
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;

      constructor() {
        this.reset();
        this.z = Math.random() * canvas.width;
      }

      reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2.5;
        this.y = (Math.random() - 0.5) * canvas.height * 2.5;
        this.z = canvas.width;
        this.size = 0.5 + Math.random() * 1.5;
        
        // High-contrast colors for light mode to ensure visibility
        const colors = theme === 'dark' 
          ? ['#ffffff', '#e2e8f0', '#94a3b8', '#38bdf8'] 
          : ['#0f172a', '#1e293b', '#3b82f6', '#2563eb'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.z -= speed;
        if (this.z <= 0) {
          this.reset();
        }
      }

      draw() {
        // Simple projection without mouse parallax
        const x = (this.x / this.z) * (canvas.width / 1.5) + canvas.width / 2;
        const y = (this.y / this.z) * (canvas.height / 1.5) + canvas.height / 2;

        const s = this.size * (1 - this.z / canvas.width) * 1.5;
        
        if (x < -10 || x > canvas.width + 10 || y < -10 || y > canvas.height + 10) return;

        const opacity = (1 - this.z / canvas.width);
        
        ctx!.beginPath();
        const color = this.color;
        
        ctx!.fillStyle = color;
        // Increased visibility in light mode by bumping opacity multiplier from 0.4 to 0.7
        ctx!.globalAlpha = theme === 'dark' ? opacity : opacity * 1;
        
        ctx!.arc(x, y, s, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: starCount }, () => new Star());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 0,
        background: 'transparent'
      }}
    />
  );
};
