import React, { useRef, useEffect, useState } from 'react';
import PixelIcon from '../common/PixelIcon';
import './DesktopWindow.css';

export const DesktopWindow = ({
  id,
  title,
  icon = 'terminal',
  isOpen,
  isMinimized,
  isMaximized,
  zIndex = 10,
  position = { x: 80, y: 60 },
  size = { width: 880, height: 600 },
  minWidth = 340,
  minHeight = 240,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
  className = '',
  customHeaderRight = null
}) => {
  const windowRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const resizeRef = useRef({ isResizing: false, startX: 0, startY: 0, initialW: 0, initialH: 0, edge: null });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Bring to focus on pointer down
  const handleWindowMouseDown = () => {
    if (onFocus) onFocus(id);
  };

  // Dragging by Titlebar
  const handleTitlebarPointerDown = (e) => {
    // Only drag with primary mouse button or touch, and not if maximized or mobile
    if (e.button !== 0 && e.type !== 'touchstart') return;
    if (isMaximized || isMobile) return;
    // Don't drag if clicking buttons
    if (e.target.closest('button') || e.target.closest('.window-dot')) return;

    if (onFocus) onFocus(id);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragRef.current = {
      isDragging: true,
      startX: clientX,
      startY: clientY,
      initialX: position.x,
      initialY: position.y
    };

    const handlePointerMove = (moveEvent) => {
      if (!dragRef.current.isDragging) return;
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - dragRef.current.startX;
      const deltaY = currentY - dragRef.current.startY;

      const newX = Math.max(-size.width + 120, Math.min(window.innerWidth - 80, dragRef.current.initialX + deltaX));
      const newY = Math.max(34, Math.min(window.innerHeight - 70, dragRef.current.initialY + deltaY));

      if (onPositionChange) {
        onPositionChange({ x: newX, y: newY });
      }
    };

    const handlePointerUp = () => {
      dragRef.current.isDragging = false;
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  };

  // Resizing by corner / edges
  const handleResizePointerDown = (e, edge = 'se') => {
    e.stopPropagation();
    e.preventDefault();
    if (isMaximized || isMobile) return;

    if (onFocus) onFocus(id);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    resizeRef.current = {
      isResizing: true,
      startX: clientX,
      startY: clientY,
      initialW: size.width,
      initialH: size.height,
      edge
    };

    const handleResizeMove = (moveEvent) => {
      if (!resizeRef.current.isResizing) return;
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - resizeRef.current.startX;
      const deltaY = currentY - resizeRef.current.startY;

      let newWidth = resizeRef.current.initialW;
      let newHeight = resizeRef.current.initialH;

      if (edge.includes('e')) {
        newWidth = Math.max(minWidth, Math.min(window.innerWidth - position.x - 10, resizeRef.current.initialW + deltaX));
      }
      if (edge.includes('s')) {
        newHeight = Math.max(minHeight, Math.min(window.innerHeight - position.y - 45, resizeRef.current.initialH + deltaY));
      }

      if (onSizeChange) {
        onSizeChange({ width: newWidth, height: newHeight });
      }
    };

    const handleResizeUp = () => {
      resizeRef.current.isResizing = false;
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeUp);
      window.removeEventListener('touchmove', handleResizeMove);
      window.removeEventListener('touchend', handleResizeUp);
    };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeUp);
    window.addEventListener('touchmove', handleResizeMove, { passive: false });
    window.addEventListener('touchend', handleResizeUp);
  };

  // Toggle Maximize on Titlebar double-click
  const handleTitlebarDoubleClick = () => {
    if (!isMobile && onMaximize) {
      onMaximize(id);
    }
  };

  if (!isOpen || isMinimized) {
    return null;
  }

  // Determine inline styles for window placement
  const windowStyle = isMobile
    ? {
        position: 'fixed',
        top: '36px',
        left: 0,
        right: 0,
        bottom: '48px',
        width: '100%',
        height: 'calc(100vh - 84px)',
        zIndex
      }
    : isMaximized
    ? {
        position: 'fixed',
        top: '36px',
        left: 0,
        right: 0,
        bottom: '48px',
        width: '100%',
        height: 'calc(100vh - 84px)',
        zIndex
      }
    : {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex
      };

  return (
    <div
      ref={windowRef}
      className={`desktop-window-container pixel-border ${isMaximized ? 'is-maximized' : ''} ${className}`}
      style={windowStyle}
      onMouseDown={handleWindowMouseDown}
      onTouchStart={handleWindowMouseDown}
      data-window-id={id}
    >
      {/* Linux Titlebar */}
      <div
        className="window-titlebar"
        onMouseDown={handleTitlebarPointerDown}
        onTouchStart={handleTitlebarPointerDown}
        onDoubleClick={handleTitlebarDoubleClick}
      >
        {/* Left: Classic Linux 3-dots */}
        <div className="window-dots" aria-label="Window controls">
          <button
            type="button"
            className="window-dot dot-close"
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose(id);
            }}
            title="Tutup (Close)"
            aria-label="Close"
          >
            <span className="dot-symbol">×</span>
          </button>
          <button
            type="button"
            className="window-dot dot-minimize"
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize(id);
            }}
            title="Kecilkan (Minimize)"
            aria-label="Minimize"
          >
            <span className="dot-symbol">-</span>
          </button>
          <button
            type="button"
            className="window-dot dot-maximize"
            onClick={(e) => {
              e.stopPropagation();
              if (onMaximize) onMaximize(id);
            }}
            title={isMaximized ? 'Pulihkan (Restore)' : 'Perbesar (Maximize)'}
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="dot-symbol">{isMaximized ? '⧉' : '+'}</span>
          </button>
        </div>

        {/* Center: Title & Icon */}
        <div className="window-title-content">
          <PixelIcon name={icon} size={15} className="window-title-icon" />
          <span className="window-title-text">{title}</span>
        </div>

        {/* Right: Custom Status / Quick Actions */}
        <div className="window-titlebar-right">
          {customHeaderRight}
        </div>
      </div>

      {/* Window Body / Application Canvas */}
      <div className="window-body">
        {children}
      </div>

      {/* Resizer Grips (Only in floating desktop mode) */}
      {!isMaximized && !isMobile && (
        <>
          <div
            className="window-resizer resizer-e"
            onMouseDown={(e) => handleResizePointerDown(e, 'e')}
            onTouchStart={(e) => handleResizePointerDown(e, 'e')}
          />
          <div
            className="window-resizer resizer-s"
            onMouseDown={(e) => handleResizePointerDown(e, 's')}
            onTouchStart={(e) => handleResizePointerDown(e, 's')}
          />
          <div
            className="window-resizer resizer-se"
            onMouseDown={(e) => handleResizePointerDown(e, 'se')}
            onTouchStart={(e) => handleResizePointerDown(e, 'se')}
            title="Tarik untuk mengubah ukuran (Drag to resize)"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="resizer-lines">
              <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopWindow;
