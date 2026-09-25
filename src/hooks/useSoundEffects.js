import { useEffect } from 'react';

/**
 * Hook to play retro Undertale squeak sound on hover of interactive elements
 * and select sound on any click.
 */
export const useSoundEffects = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const squeakSound = new Audio('/snd_squeak.mp3');
    const selectSound = new Audio('/snd_select.mp3');

    const playSqueak = () => {
      squeakSound.currentTime = 0;
      squeakSound.play().catch(() => {});
    };

    const playSelect = () => {
      selectSound.currentTime = 0;
      selectSound.play().catch(() => {});
    };

    let currentHoverTarget = null;

    const isInteractive = (el) => {
      if (!el || !el.closest) return false;
      return el.closest(
        'a, button, input, select, textarea, [role="button"], .timeline-item, .grid-card, .nav-item, .pixel-btn, .modal-close, .track-card'
      );
    };

    const handleMouseOver = (e) => {
      const target = isInteractive(e.target);
      if (target && target !== currentHoverTarget) {
        currentHoverTarget = target;
        playSqueak();
      }
    };

    const handleMouseOut = (e) => {
      if (!isInteractive(e.relatedTarget)) {
        currentHoverTarget = null;
      }
    };

    const handleClick = () => {
      playSelect();
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [enabled]);
};

export default useSoundEffects;
