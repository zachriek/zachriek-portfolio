import React, { useState } from 'react';
import './BackgroundAnimation.css';

const PARTICLE_TYPES = ['crate', 'diamond', 'cross', 'block'];
const SIZES = [12, 16, 20, 24];

const generateParticles = () => {
  const count = 22;
  const particles = [];

  for (let i = 0; i < count; i++) {
    const type = PARTICLE_TYPES[i % PARTICLE_TYPES.length];
    const size = SIZES[i % SIZES.length];
    
    // Snap initial coordinates to a discrete 4% grid
    const x = Math.floor(Math.random() * 24) * 4 + 2;
    const y = Math.floor(Math.random() * 24) * 4 + 2;
    
    // Discrete stepped movement in 16px increments
    const stepsCount = 12 + (i % 8) * 2; // e.g. 12, 14, 16, 18, 20 steps
    const stepUnit = 16;
    const multX = (Math.floor(Math.random() * 9) - 4); // -4 to +4
    const multY = (Math.floor(Math.random() * 7) - 3); // -3 to +3
    const moveX = (multX === 0 ? 3 : multX) * stepUnit; // discrete pixel delta
    const moveY = (multY === 0 ? -2 : multY) * stepUnit; // discrete pixel delta

    const duration = 16 + (i % 6) * 3; // 16s - 31s
    const bobDuration = 4 + (i % 4) * 1.5; // 4s - 8.5s
    const opacity = 0.18 + ((i % 5) * 0.06); // 0.18 - 0.42

    particles.push({
      id: i,
      type,
      size,
      x,
      y,
      moveX,
      moveY,
      stepsCount,
      duration,
      bobDuration,
      opacity
    });
  }

  return particles;
};

// Authentic 8-bit Pixel Box Sprite
const PixelBoxSprite = ({ type, size }) => {
  switch (type) {
    case 'crate':
      // 16x16 Pixel Crate / Dungeon Block
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
          {/* Stepped corner outer border */}
          <rect x="2" y="0" width="12" height="2" fill="var(--border-color, #333)" />
          <rect x="2" y="14" width="12" height="2" fill="var(--border-color, #333)" />
          <rect x="0" y="2" width="2" height="12" fill="var(--border-color, #333)" />
          <rect x="14" y="2" width="2" height="12" fill="var(--border-color, #333)" />
          {/* Main accent block */}
          <rect x="2" y="2" width="12" height="12" fill="var(--accent-color, #9B1C21)" />
          {/* 1-pixel highlight bevel */}
          <rect x="2" y="2" width="10" height="2" fill="rgba(255, 255, 255, 0.35)" />
          <rect x="2" y="2" width="2" height="10" fill="rgba(255, 255, 255, 0.35)" />
          {/* 1-pixel shadow bevel */}
          <rect x="4" y="12" width="10" height="2" fill="rgba(0, 0, 0, 0.45)" />
          <rect x="12" y="4" width="2" height="10" fill="rgba(0, 0, 0, 0.45)" />
          {/* Center pixel core */}
          <rect x="6" y="6" width="4" height="4" fill="var(--border-color, #333)" />
          <rect x="7" y="7" width="2" height="2" fill="#fff" />
        </svg>
      );

    case 'diamond':
      // 16x16 Pixel Gem / Diamond
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
          {/* Stepped pixel diamond outline */}
          <rect x="6" y="0" width="4" height="2" fill="var(--border-color, #333)" />
          <rect x="4" y="2" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="10" y="2" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="2" y="4" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="12" y="4" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="0" y="6" width="2" height="4" fill="var(--border-color, #333)" />
          <rect x="14" y="6" width="2" height="4" fill="var(--border-color, #333)" />
          <rect x="2" y="10" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="12" y="10" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="4" y="12" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="10" y="12" width="2" height="2" fill="var(--border-color, #333)" />
          <rect x="6" y="14" width="4" height="2" fill="var(--border-color, #333)" />
          {/* Inner gem fill */}
          <rect x="6" y="2" width="4" height="12" fill="var(--accent-color, #9B1C21)" />
          <rect x="4" y="4" width="8" height="8" fill="var(--accent-color, #9B1C21)" />
          <rect x="2" y="6" width="12" height="4" fill="var(--accent-color, #9B1C21)" />
          {/* Sparkle glint */}
          <rect x="6" y="4" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case 'cross':
      // 16x16 8-bit Pixel Cross / Plus
      return (
        <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
          {/* Cross body */}
          <rect x="5" y="1" width="6" height="14" fill="var(--accent-color, #9B1C21)" />
          <rect x="1" y="5" width="14" height="6" fill="var(--accent-color, #9B1C21)" />
          {/* Outer pixel caps */}
          <rect x="5" y="0" width="6" height="1" fill="var(--border-color, #333)" />
          <rect x="5" y="15" width="6" height="1" fill="var(--border-color, #333)" />
          <rect x="0" y="5" width="1" height="6" fill="var(--border-color, #333)" />
          <rect x="15" y="5" width="1" height="6" fill="var(--border-color, #333)" />
          {/* Inner highlight */}
          <rect x="6" y="6" width="4" height="4" fill="#ff7675" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case 'block':
    default:
      // 14x14 Nested Pixel Square Block
      return (
        <svg viewBox="0 0 14 14" width={size} height={size} shapeRendering="crispEdges">
          {/* Outer Border */}
          <rect x="0" y="0" width="14" height="14" fill="var(--border-color, #333)" />
          {/* Inner Accent Body */}
          <rect x="2" y="2" width="10" height="10" fill="var(--accent-color, #9B1C21)" />
          {/* Top-left pixel highlight */}
          <rect x="2" y="2" width="8" height="2" fill="rgba(255, 255, 255, 0.4)" />
          <rect x="2" y="2" width="2" height="8" fill="rgba(255, 255, 255, 0.4)" />
          {/* Center hollow or dot */}
          <rect x="5" y="5" width="4" height="4" fill="var(--bg-color, #121212)" />
        </svg>
      );
  }
};

export const BackgroundAnimation = () => {
  const [particles] = useState(generateParticles);

  return (
    <div className="pixel-bg-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="pixel-particle"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            '--move-x': `${p.moveX}px`,
            '--move-y': `${p.moveY}px`,
            '--anim-steps': p.stepsCount,
            '--drift-duration': `${p.duration}s`,
            '--bob-duration': `${p.bobDuration}s`,
          }}
        >
          <PixelBoxSprite type={p.type} size={p.size} />
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
