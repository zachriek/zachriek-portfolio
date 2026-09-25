import React from 'react';
import PixelIcon from './PixelIcon';

export const PixelButton = ({
  children,
  icon,
  iconSize = 18,
  variant = 'default', // 'default', 'accent', 'ghost', 'icon'
  size = 'md', // 'sm', 'md', 'lg'
  onClick,
  className = '',
  style = {},
  disabled = false,
  title,
  type = 'button',
  ...props
}) => {
  const getPadding = () => {
    if (variant === 'icon') {
      if (size === 'sm') return '6px';
      if (size === 'lg') return '12px';
      return '8px';
    }
    if (size === 'sm') return '6px 12px';
    if (size === 'lg') return '14px 28px';
    return '10px 18px';
  };

  const getFontSize = () => {
    if (size === 'sm') return '0.75rem';
    if (size === 'lg') return '1.25rem';
    return '0.9rem';
  };

  const getBackground = () => {
    if (variant === 'accent') return 'var(--accent-color)';
    if (variant === 'ghost') return 'transparent';
    return 'var(--bg-card)';
  };

  const getColor = () => {
    if (variant === 'accent') return '#FAFAFA';
    return 'var(--text-main)';
  };

  const buttonStyle = {
    fontFamily: 'var(--font-pixel)',
    fontSize: getFontSize(),
    padding: getPadding(),
    background: getBackground(),
    color: getColor(),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'url(/cursor-hover-small.png), pointer',
    opacity: disabled ? 0.6 : 1,
    border: variant === 'ghost' ? 'none' : '2px solid var(--border-color)',
    boxShadow: variant === 'ghost' ? 'none' : '3px 3px 0px rgba(0, 0, 0, 0.3)',
    textDecoration: 'none',
    transition: 'transform 0.1s, box-shadow 0.1s, background-color 0.2s',
    ...style
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`pixel-btn ${className}`}
      style={buttonStyle}
      {...props}
    >
      {icon && <PixelIcon name={icon} size={iconSize} />}
      {children}
    </button>
  );
};

export default PixelButton;
