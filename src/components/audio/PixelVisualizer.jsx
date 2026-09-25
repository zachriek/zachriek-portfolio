import React, { useEffect, useRef } from 'react';

/**
 * PixelVisualizer draws a genuine 8-bit retro arcade equalizer spectrum
 * using discrete pixel blocks, retro tiered color palette, and falling peak caps.
 */
export const PixelVisualizer = ({ analyserNode, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const peaksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120;
      peaksRef.current = [];
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!analyserNode || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Slowly clear canvas or leave clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const brickWidth = 8;
    const brickHeight = 4;
    const brickGap = 2;
    const step = brickWidth + brickGap;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalColumns = Math.floor(canvas.width / step);
      const maxBlocks = Math.floor((canvas.height - 10) / (brickHeight + brickGap));

      if (peaksRef.current.length !== totalColumns) {
        peaksRef.current = new Array(totalColumns).fill(0);
      }

      for (let i = 0; i < totalColumns; i++) {
        // Map column index to frequency bin (focusing slightly more on low-mid frequencies)
        const freqIndex = Math.min(
          bufferLength - 1,
          Math.floor(Math.pow(i / totalColumns, 1.4) * bufferLength)
        );

        const val = dataArray[freqIndex] || 0;
        const normalized = val / 255;
        const numBlocks = Math.floor(normalized * maxBlocks);

        // Update peak cap
        if (numBlocks >= peaksRef.current[i]) {
          peaksRef.current[i] = numBlocks;
        } else {
          peaksRef.current[i] = Math.max(0, peaksRef.current[i] - 0.25);
        }

        const x = i * step;

        // Draw stacked pixel blocks
        for (let b = 0; b < numBlocks; b++) {
          const ratio = b / maxBlocks;
          let color = '#8b151a'; // Base deep red
          if (ratio > 0.75) {
            color = '#ffeaa7'; // Bright retro highlight
          } else if (ratio > 0.5) {
            color = '#ff7675'; // Hot neon red
          } else if (ratio > 0.25) {
            color = '#d63031'; // Primary vibrant red
          }

          ctx.fillStyle = color;
          ctx.fillRect(
            x,
            canvas.height - (b + 1) * (brickHeight + brickGap),
            brickWidth,
            brickHeight
          );
        }

        // Draw retro falling peak cap
        const peak = Math.floor(peaksRef.current[i]);
        if (peak > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(
            x,
            canvas.height - (peak + 1) * (brickHeight + brickGap),
            brickWidth,
            2
          );
        }
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserNode, isPlaying]);

  return (
    <div className="visualizer-global-container">
      <canvas ref={canvasRef} className="visualizer-canvas" height="120" />
    </div>
  );
};

export default PixelVisualizer;
