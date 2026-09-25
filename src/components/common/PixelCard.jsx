import React from 'react';

export const PixelCard = ({
  children,
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`pixel-border ${className}`}
      style={{
        background: 'var(--bg-card)',
        padding: '1.25rem',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default PixelCard;
