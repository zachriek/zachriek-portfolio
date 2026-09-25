import React from 'react';

export const PixelBadge = ({
  children,
  variant = 'default', // 'default', 'accent'
  className = '',
  style = {}
}) => {
  const isAccent = variant === 'accent';
  return (
    <span
      className={`pixel-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 8px',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-pixel)',
        background: isAccent ? 'var(--accent-color)' : 'var(--bg-card)',
        color: isAccent ? '#FAFAFA' : 'var(--text-main)',
        border: '1px solid var(--border-color)',
        boxShadow: '1px 1px 0px rgba(0,0,0,0.3)',
        ...style
      }}
    >
      {children}
    </span>
  );
};

export default PixelBadge;
