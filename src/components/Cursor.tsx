import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const lastMoveTime = useRef(Date.now());
  const idleFactor = useRef(0);
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Google brand colors
  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

  useEffect(() => {
    const cursor = cursorRef.current;
    const trails = trailRefs.current;

    if (!cursor || trails.length === 0) return;

    // Detect mobile device (breakpoint 1024px)
    const mobileCheck = window.innerWidth < 1024;
    isMobileRef.current = mobileCheck;
    setIsMobile(mobileCheck);

    // Hide default cursor only on desktop
    if (!isMobileRef.current) {
      document.body.style.cursor = 'none';
    }

    // Initialize positions array
    positions.current = Array(8).fill(null).map(() => ({ x: 0, y: 0 }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();
    };

    const getTouchPos = (touchEvent: TouchEvent) => {
      if (!touchEvent.touches || touchEvent.touches.length === 0) return null;
      const touch = touchEvent.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    };

    const onTouchStart = (e: TouchEvent) => {
      const pos = getTouchPos(e);
      if (pos) mouseRef.current = pos;
    };

    const onTouchMove = (e: TouchEvent) => {
      const pos = getTouchPos(e);
      if (pos) {
        mouseRef.current = pos;
        lastMoveTime.current = Date.now();
      }
    };

    const onTouchEnd = () => {
      // Keep the last touch coordinate so animation continues smoothly.
    };

    const onPointerClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Create Holi color particles
      const particleCount = 8;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fixed pointer-events-none z-30 rounded-full';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.left = clickX + 'px';
        particle.style.top = clickY + 'px';
        particle.style.backgroundColor = googleColors[Math.floor(Math.random() * googleColors.length)];
        document.body.appendChild(particle);

        const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const distance = 50 + Math.random() * 80;
        const targetX = clickX + Math.cos(angle) * distance;
        const targetY = clickY + Math.sin(angle) * distance;

        gsap.fromTo(
          particle,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          {
            x: targetX - clickX,
            y: targetY - clickY,
            scale: 0.2 + Math.random() * 0.5,
            opacity: 0,
            duration: 0.8 + Math.random() * 0.6,
            ease: 'power2.out',
            delay: Math.random() * 0.15,
            onComplete: () => {
              if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
              }
            },
          }
        );
      }

      // Subtle cursor color ripple on click
      if (cursor && !isMobileRef.current) {
        const cursorColor = googleColors[Math.floor(Math.random() * googleColors.length)];
        setTimeout(() => {
          gsap.to(cursor, {
            backgroundColor: cursorColor,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            overwrite: 'auto',
          });
        }, 16);
      }

      // Subtle trail ripple on click
      if (trails.length > 0 && !isMobileRef.current) {
        trails.forEach((trail, index) => {
          const rippleColor = googleColors[Math.floor(Math.random() * googleColors.length)];
          setTimeout(() => {
            if (trail) {
              gsap.to(trail, {
                backgroundColor: rippleColor,
                duration: 0.15,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
                overwrite: 'auto',
              });
            }
          }, 16 + index * 20);
        });
      }
    };

    // Venom-like flowing animation
    const animateVenom = () => {
      const isIdle = Date.now() - lastMoveTime.current > 500;

      if (isIdle) {
        idleFactor.current = Math.min(1, idleFactor.current + 0.05);
      } else {
        idleFactor.current = Math.max(0, idleFactor.current - 0.15);
      }

      // Head position maps directly to mouse
      positions.current[0].x = mouseRef.current.x;
      positions.current[0].y = mouseRef.current.y;

      for (let i = 1; i < positions.current.length; i++) {
        const prev = positions.current[i - 1];
        const current = positions.current[i];
        const dx = prev.x - current.x;
        const dy = prev.y - current.y;

        const time = Date.now() * 0.0017;
        const noiseDampening = 1 - idleFactor.current;
        const wave1 = Math.sin(time + i * 0.8) * (1.2 - i * 0.15) * noiseDampening;
        const wave2 = Math.cos(time * 1.05 + i * 0.5) * (1.0 - i * 0.1) * noiseDampening;

        current.x += dx * 0.22 + wave1;
        current.y += dy * 0.22 + wave2;
      }

      // Animate Cursor Head
      const cursorTime = Date.now() * 0.001;
      const cursorColorIndex = Math.floor(cursorTime * 1.2 % googleColors.length);
      const cursorNextColorIndex = (cursorColorIndex + 1) % googleColors.length;
      const cursorColorProgress = (cursorTime * 1.2 % 1);

      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const cursorEasedProgress = easeInOut(cursorColorProgress);

      const interpolateColor = (color1: string, color2: string, factor: number) => {
        const c1 = color1.match(/\w\w/g)!.map(x => parseInt(x, 16));
        const c2 = color2.match(/\w\w/g)!.map(x => parseInt(x, 16));
        const result = c1.map((c, i) => Math.round(c + (c2[i] - c) * factor));
        return `#${result.map(x => x.toString(16).padStart(2, '0')).join('')}`;
      };

      const cursorFlowingColor = interpolateColor(
        googleColors[cursorColorIndex],
        googleColors[cursorNextColorIndex],
        cursorEasedProgress
      );

      const idleColor = googleColors[0];
      const finalCursorColor = interpolateColor(cursorFlowingColor, idleColor, idleFactor.current);

      if (!isMobileRef.current) {
        gsap.set(cursor, {
          x: positions.current[0].x,
          y: positions.current[0].y,
          rotation:
            Math.atan2(
              positions.current[1].y - positions.current[0].y,
              positions.current[1].x - positions.current[0].x
            ) *
            (180 / Math.PI),
          backgroundColor: finalCursorColor,
        });

        gsap.to(cursor, {
          scaleX: 1 + Math.sin(Date.now() * 0.003) * 0.15 * (1 - idleFactor.current),
          scaleY: 1 + Math.cos(Date.now() * 0.003 + 1) * 0.15 * (1 - idleFactor.current),
          duration: 0.2,
          ease: 'power1.inOut',
          overwrite: 'auto',
        });
      }

      // Animate Trail Segments
      trails.forEach((trail, index) => {
        const pos = positions.current[index + 1];
        if (pos && trail) {
          const time = Date.now() * 0.001;
          const noiseDampening = 1 - idleFactor.current;

          const morphScale =
            1 - index * 0.12 + Math.sin(time + index) * 0.2 * noiseDampening;
          const morphRotation = Math.sin(time * 0.5 + index * 0.3) * 20 * noiseDampening;

          const colorIndex = Math.floor((time * 1.2 + index * 0.6) % googleColors.length);
          const nextColorIndex = (colorIndex + 1) % googleColors.length;
          const colorProgress = (time * 1.2 + index * 0.6) % 1;

          const easedProgress = easeInOut(colorProgress);
          const flowingColor = interpolateColor(
            googleColors[colorIndex],
            googleColors[nextColorIndex],
            easedProgress
          );

          const finalTrailColor = interpolateColor(flowingColor, idleColor, idleFactor.current);

          if (!isMobileRef.current) {
            gsap.to(trail, {
              x: pos.x,
              y: pos.y,
              scale: Math.max(0.1, morphScale),
              rotation: morphRotation,
              opacity: Math.max(
                0.1,
                1 - index * 0.15 + Math.sin(time + index * 0.5) * 0.1 * noiseDampening
              ),
              backgroundColor: finalTrailColor,
              duration: 0.016,
              ease: 'none',
              overwrite: false,
            });
          }
        }
      });

      animationRef.current = requestAnimationFrame(animateVenom);
    };

    animateVenom();

    const onMouseEnter = () => {
      if (cursor && trails.length > 0) {
        gsap.to(trails.filter(Boolean), {
          scale: 1.25,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.05,
        });
        gsap.to(cursor, { scale: 1.4, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onMouseLeave = () => {
      if (cursor && trails.length > 0) {
        gsap.to(trails.filter(Boolean), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.05,
        });
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onLinkEnter = () => {
      if (cursor && trails.length > 0) {
        gsap.to(cursor, { scale: 2.2, duration: 0.3, ease: 'power2.out' });
        gsap.to(trails.filter(Boolean), {
          scale: 1.8,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.02,
        });
      }
    };

    const onLinkLeave = () => {
      if (cursor && trails.length > 0) {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(trails.filter(Boolean), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.02,
        });
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('click', onPointerClick as EventListener, true);

    const interactiveElements = document.querySelectorAll<HTMLElement>('button, [role="button"]');
    const linkElements = document.querySelectorAll<HTMLElement>('a');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    linkElements.forEach(el => {
      el.addEventListener('mouseenter', onLinkEnter);
      el.addEventListener('mouseleave', onLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('click', onPointerClick as EventListener, true);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      linkElements.forEach(el => {
        el.removeEventListener('mouseenter', onLinkEnter);
        el.removeEventListener('mouseleave', onLinkLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor head with Google colors */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Venom trail segments with Google colors */}
      {Array.from({ length: 7 }, (_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-40"
          style={{
            transform: 'translate(-50%, -50%)',
            opacity: 0.8 - i * 0.1,
            backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'][i % 4],
          }}
        />
      ))}
    </>
  );
}
