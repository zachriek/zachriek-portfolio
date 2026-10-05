import React, { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

/**
 * Subtle Ambient Binary Rain Background
 * - Pure solid black background (#000000) with zero color shifting or glow bleeding
 * - Very subtle, dim opacity (0.02 - 0.18) so digits are faint and non-distracting
 * - Calmed speed with discrete 0 and 1 streams
 */
export const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // Calm, steady frame rate
    const frameInterval = 1000 / fps;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    let cols = [];

    const initCols = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const numColumns = Math.floor(width / fontSize);
      cols = [];

      for (let i = 0; i < numColumns; i++) {
        const length = 6 + Math.floor(Math.random() * 8);
        const chars = [];
        for (let j = 0; j < length; j++) {
          chars.push(Math.random() > 0.5 ? '1' : '0');
        }
        cols.push({
          x: i * fontSize,
          y: Math.floor(Math.random() * (height / fontSize)),
          speed: 0.25 + Math.random() * 0.35, // Very calm, slow drift
          length,
          chars
        });
      }
    };

    initCols();

    const handleResize = () => {
      initCols();
    };

    window.addEventListener('resize', handleResize);

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      // Solid pure black fill on every frame: guarantees ZERO background color changes
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Silkscreen', 'Consolas', monospace`;
      ctx.shadowBlur = 0; // Strictly zero blur to avoid color bleed into background

      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        col.y += col.speed;

        const headY = Math.floor(col.y);

        for (let j = 0; j < col.length; j++) {
          const charY = headY - j;
          if (charY >= 0 && charY * fontSize <= height + fontSize) {
            // Subtle, dim opacity: head is max 0.18, tail fades down to 0.02
            const ratio = 1 - j / col.length;
            const alpha = 0.02 + ratio * 0.15;

            // Occasional character flicker
            if (!col.chars[j] || Math.random() < 0.03) {
              col.chars[j] = Math.random() > 0.5 ? '1' : '0';
            }

            // Discreet muted terminal green
            ctx.fillStyle = `rgba(0, 255, 65, ${alpha.toFixed(3)})`;
            ctx.fillText(col.chars[j], col.x, charY * fontSize);
          }
        }

        // Reset column smoothly when it passes below viewport
        if ((headY - col.length) * fontSize > height) {
          col.y = -Math.floor(Math.random() * 6);
          col.speed = 0.25 + Math.random() * 0.35;
          col.length = 6 + Math.floor(Math.random() * 8);
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="binary-bg-canvas"
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation;
