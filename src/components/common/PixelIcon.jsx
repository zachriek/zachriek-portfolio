import React from 'react';

/**
 * PixelIcon renders crisp, authentic 8-bit/pixel-art SVG icons
 * aligned strictly to a 24x24 pixel grid with shapeRendering="crispEdges".
 */
export const PixelIcon = ({
  name,
  size = 20,
  color = 'currentColor',
  className = '',
  style = {},
  ...props
}) => {
  const iconStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    imageRendering: 'pixelated',
    ...style
  };

  const renderIconContent = () => {
    switch (name) {
      case 'home':
        return (
          <>
            {/* Chimney */}
            <rect x="16" y="4" width="3" height="5" />
            {/* Roof stepped */}
            <rect x="11" y="3" width="2" height="2" />
            <rect x="9" y="5" width="6" height="2" />
            <rect x="7" y="7" width="10" height="2" />
            <rect x="5" y="9" width="14" height="2" />
            <rect x="3" y="11" width="18" height="2" />
            <rect x="1" y="13" width="22" height="2" />
            {/* House body */}
            <rect x="4" y="15" width="16" height="6" />
            {/* Door cutout */}
            <rect x="10" y="16" width="4" height="5" fill="var(--bg-color, #121212)" />
          </>
        );

      case 'briefcase':
        return (
          <>
            {/* Handle */}
            <rect x="9" y="3" width="6" height="2" />
            <rect x="9" y="5" width="2" height="2" />
            <rect x="13" y="5" width="2" height="2" />
            {/* Case Body */}
            <rect x="3" y="7" width="18" height="14" />
            {/* Horizontal line divider */}
            <rect x="3" y="12" width="18" height="2" fill="var(--bg-color, #121212)" />
            {/* Lock / Clasp */}
            <rect x="10" y="11" width="4" height="4" />
            <rect x="11" y="12" width="2" height="2" fill="var(--bg-color, #121212)" />
          </>
        );

      case 'graduation':
      case 'graduation-cap':
        return (
          <>
            {/* Mortarboard Diamond */}
            <rect x="11" y="4" width="2" height="2" />
            <rect x="8" y="6" width="8" height="2" />
            <rect x="5" y="8" width="14" height="2" />
            <rect x="2" y="10" width="20" height="2" />
            <rect x="5" y="12" width="14" height="2" />
            {/* Skull Cap Base */}
            <rect x="7" y="14" width="10" height="4" />
            {/* Tassel */}
            <rect x="20" y="11" width="2" height="6" />
            <rect x="19" y="17" width="3" height="3" />
          </>
        );

      case 'trophy':
        return (
          <>
            {/* Cup Rim & Bowl */}
            <rect x="6" y="3" width="12" height="2" />
            <rect x="5" y="5" width="14" height="4" />
            <rect x="7" y="9" width="10" height="3" />
            <rect x="9" y="12" width="6" height="2" />
            {/* Handles */}
            <rect x="3" y="5" width="2" height="5" />
            <rect x="19" y="5" width="2" height="5" />
            <rect x="5" y="9" width="2" height="2" />
            <rect x="17" y="9" width="2" height="2" />
            {/* Stem */}
            <rect x="11" y="14" width="2" height="3" />
            {/* Pedestal */}
            <rect x="9" y="17" width="6" height="2" />
            <rect x="6" y="19" width="12" height="2" />
          </>
        );

      case 'sun':
        return (
          <>
            {/* Center Core */}
            <rect x="8" y="8" width="8" height="8" />
            {/* Top / Bottom Rays */}
            <rect x="11" y="2" width="2" height="4" />
            <rect x="11" y="18" width="2" height="4" />
            {/* Left / Right Rays */}
            <rect x="2" y="11" width="4" height="2" />
            <rect x="18" y="11" width="4" height="2" />
            {/* Diagonals */}
            <rect x="5" y="5" width="2" height="2" />
            <rect x="17" y="5" width="2" height="2" />
            <rect x="5" y="17" width="2" height="2" />
            <rect x="17" y="17" width="2" height="2" />
          </>
        );

      case 'moon':
        return (
          <>
            {/* Crescent Moon */}
            <rect x="9" y="3" width="7" height="2" />
            <rect x="7" y="5" width="4" height="2" />
            <rect x="16" y="5" width="2" height="2" />
            <rect x="5" y="7" width="4" height="2" />
            <rect x="16" y="7" width="3" height="2" />
            <rect x="5" y="9" width="4" height="6" />
            <rect x="16" y="9" width="3" height="6" />
            <rect x="5" y="15" width="4" height="2" />
            <rect x="16" y="15" width="3" height="2" />
            <rect x="7" y="17" width="4" height="2" />
            <rect x="16" y="17" width="2" height="2" />
            <rect x="9" y="19" width="7" height="2" />
          </>
        );

      case 'play':
        return (
          <>
            {/* Stepped Pixel Triangle */}
            <rect x="7" y="4" width="2" height="16" />
            <rect x="9" y="6" width="2" height="12" />
            <rect x="11" y="8" width="2" height="8" />
            <rect x="13" y="10" width="2" height="4" />
            <rect x="15" y="11" width="2" height="2" />
          </>
        );

      case 'pause':
        return (
          <>
            {/* Two block bars */}
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </>
        );

      case 'volume':
        return (
          <>
            {/* Speaker box */}
            <rect x="3" y="9" width="4" height="6" />
            {/* Cone */}
            <rect x="7" y="8" width="2" height="8" />
            <rect x="9" y="6" width="2" height="12" />
            <rect x="11" y="4" width="2" height="16" />
            {/* Inner wave */}
            <rect x="15" y="8" width="2" height="2" />
            <rect x="15" y="14" width="2" height="2" />
            <rect x="16" y="10" width="2" height="4" />
            {/* Outer wave */}
            <rect x="19" y="5" width="2" height="2" />
            <rect x="19" y="17" width="2" height="2" />
            <rect x="20" y="7" width="2" height="10" />
          </>
        );

      case 'volume-x':
        return (
          <>
            {/* Speaker box */}
            <rect x="3" y="9" width="4" height="6" />
            {/* Cone */}
            <rect x="7" y="8" width="2" height="8" />
            <rect x="9" y="6" width="2" height="12" />
            <rect x="11" y="4" width="2" height="16" />
            {/* Pixel X */}
            <rect x="15" y="9" width="2" height="2" />
            <rect x="19" y="9" width="2" height="2" />
            <rect x="17" y="11" width="2" height="2" />
            <rect x="15" y="13" width="2" height="2" />
            <rect x="19" y="13" width="2" height="2" />
          </>
        );

      case 'music':
        return (
          <>
            {/* 8-bit double musical note */}
            <rect x="8" y="4" width="10" height="3" />
            <rect x="8" y="7" width="2" height="9" />
            <rect x="16" y="7" width="2" height="7" />
            <rect x="5" y="14" width="5" height="4" />
            <rect x="13" y="12" width="5" height="4" />
          </>
        );

      case 'minimize':
        return (
          <>
            {/* Pixel dash/inward line */}
            <rect x="5" y="11" width="14" height="3" />
          </>
        );

      case 'maximize':
      case 'expand':
        return (
          <>
            {/* Expand box */}
            <rect x="4" y="4" width="16" height="2" />
            <rect x="4" y="18" width="16" height="2" />
            <rect x="4" y="6" width="2" height="12" />
            <rect x="18" y="6" width="2" height="12" />
            <rect x="10" y="10" width="4" height="4" />
          </>
        );

      case 'list-music':
      case 'playlist':
        return (
          <>
            {/* 3 horizontal bars */}
            <rect x="3" y="6" width="11" height="2" />
            <rect x="3" y="11" width="11" height="2" />
            <rect x="3" y="16" width="8" height="2" />
            {/* Note on right */}
            <rect x="17" y="8" width="4" height="2" />
            <rect x="19" y="10" width="2" height="6" />
            <rect x="16" y="14" width="4" height="3" />
          </>
        );

      case 'close':
      case 'x':
        return (
          <>
            {/* Pixel Cross */}
            <rect x="5" y="5" width="3" height="3" />
            <rect x="8" y="8" width="3" height="3" />
            <rect x="11" y="11" width="2" height="2" />
            <rect x="13" y="8" width="3" height="3" />
            <rect x="16" y="5" width="3" height="3" />
            <rect x="8" y="13" width="3" height="3" />
            <rect x="5" y="16" width="3" height="3" />
            <rect x="13" y="13" width="3" height="3" />
            <rect x="16" y="16" width="3" height="3" />
          </>
        );

      case 'github':
        return (
          <>
            {/* Pixel Octocat silhouette */}
            <rect x="8" y="2" width="8" height="2" />
            <rect x="6" y="4" width="12" height="2" />
            <rect x="4" y="6" width="16" height="6" />
            <rect x="2" y="8" width="2" height="6" />
            <rect x="20" y="8" width="2" height="6" />
            {/* Ears */}
            <rect x="4" y="2" width="3" height="4" />
            <rect x="17" y="2" width="3" height="4" />
            {/* Body */}
            <rect x="5" y="12" width="14" height="6" />
            {/* Feet / tentacles */}
            <rect x="6" y="18" width="3" height="4" />
            <rect x="10" y="18" width="4" height="3" />
            <rect x="15" y="18" width="3" height="4" />
          </>
        );

      case 'calendar':
        return (
          <>
            {/* Rings */}
            <rect x="6" y="3" width="2" height="3" />
            <rect x="16" y="3" width="2" height="3" />
            {/* Top Bar */}
            <rect x="4" y="5" width="16" height="4" />
            {/* Body */}
            <rect x="4" y="9" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Inner pixel dots */}
            <rect x="7" y="12" width="2" height="2" />
            <rect x="11" y="12" width="2" height="2" />
            <rect x="15" y="12" width="2" height="2" />
            <rect x="7" y="16" width="2" height="2" />
            <rect x="11" y="16" width="2" height="2" />
          </>
        );

      case 'map-pin':
        return (
          <>
            {/* Pin head */}
            <rect x="8" y="3" width="8" height="2" />
            <rect x="6" y="5" width="12" height="6" />
            <rect x="4" y="6" width="2" height="4" />
            <rect x="18" y="6" width="2" height="4" />
            {/* Hole */}
            <rect x="10" y="7" width="4" height="3" fill="var(--bg-color, #121212)" />
            {/* Point */}
            <rect x="8" y="11" width="8" height="3" />
            <rect x="10" y="14" width="4" height="4" />
            <rect x="11" y="18" width="2" height="3" />
          </>
        );

      default:
        return (
          <rect x="6" y="6" width="12" height="12" />
        );
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      shapeRendering="crispEdges"
      className={`pixel-icon ${className}`}
      style={iconStyle}
      aria-hidden="true"
      {...props}
    >
      {renderIconContent()}
    </svg>
  );
};

export default PixelIcon;
