import React, { useState, useEffect } from 'react';
import { Home, FolderGit2, Briefcase, GraduationCap, Trophy, Mail, Moon, Sun } from 'lucide-react';
import BackgroundAnimation from './BackgroundAnimation';
import AudioPlayer from './AudioPlayer';
import './Layout.css';

const Layout = ({ children, autoPlayAudio = false }) => {
  const [isDark, setIsDark] = useState(() => {
    // Default to dark mode or system preference
    return localStorage.getItem('theme') === 'dark' || true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const squeakSound = new Audio('/snd_squeak.mp3');
    const selectSound = new Audio('/snd_select.mp3');
    
    const playSqueak = () => {
      squeakSound.currentTime = 0;
      squeakSound.play().catch(() => {}); // Catch to ignore autoplay restrictions errors
    };

    const playSelect = () => {
      selectSound.currentTime = 0;
      selectSound.play().catch(() => {});
    };

    let currentHoverTarget = null;

    const isInteractive = (el) => {
      if (!el || !el.closest) return false;
      // List of interactive selectors
      return el.closest('a, button, input, select, textarea, [role="button"], .project-card, .timeline-item, .grid-card, .nav-item, .pixel-btn, .modal-close');
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

    const handleClick = (e) => {
      // Play select sound on any click (or just interactive if preferred, but user said 'any')
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
  }, []);

  const toggleTheme = (e) => {
    e.preventDefault();
    setIsDark(!isDark);
  };

  return (
    <div className="layout-container">
      <BackgroundAnimation />
      <main className="content">
        {children}
      </main>

      <nav className="floating-nav">
        <ul className="nav-links">
          <li>
            <a href="#about" className="nav-item" title="About Me">
              <Home size={24} />
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-item" title="Projects">
              <FolderGit2 size={24} />
            </a>
          </li>
          <li>
            <a href="#experiences" className="nav-item" title="Experiences">
              <Briefcase size={24} />
            </a>
          </li>
          <li>
            <a href="#educations" className="nav-item" title="Educations">
              <GraduationCap size={24} />
            </a>
          </li>
          <li>
            <a href="#achievements" className="nav-item" title="Achievements">
              <Trophy size={24} />
            </a>
          </li>
          <li>
            <button onClick={toggleTheme} className="nav-item theme-toggle" title="Toggle Theme">
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
        </ul>
      </nav>

      <footer className="footer">
        <p>Copyright © {new Date().getFullYear()} Zachrie Kurniawan</p>
      </footer>
      
      <AudioPlayer autoPlay={autoPlayAudio} />
    </div>
  );
};

export default Layout;
