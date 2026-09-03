import React, { useEffect, useState } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const numSquares = 15;
    const initialSquares = Array.from({ length: numSquares }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 30 + 20, // 20s to 50s
      opacity: Math.random() * 0.4 + 0.1,
      dirX: (Math.random() - 0.5) * 2, // -1 to 1
      dirY: (Math.random() - 0.5) * 2, // -1 to 1
    }));
    
    setSquares(initialSquares);
  }, []);

  return (
    <div className="pixel-bg-container">
      {squares.map((sq) => (
        <div
          key={sq.id}
          className="pixel-square"
          style={{
            left: `${sq.x}vw`,
            top: `${sq.y}vh`,
            width: `${sq.size}px`,
            height: `${sq.size}px`,
            animationDuration: `${sq.duration}s`,
            opacity: sq.opacity,
            '--dir-x': sq.dirX,
            '--dir-y': sq.dirY,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
