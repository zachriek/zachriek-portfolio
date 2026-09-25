import React from 'react';
import PixelIcon from '../common/PixelIcon';
import { useAudio } from '../../context/AudioContext';

export const Navbar = () => {
  const { isPlaying, togglePlay, setIsModalOpen } = useAudio();

  const navItems = [
    { href: '#about', title: 'Tentang Saya', icon: 'home' },
    { href: '#experiences', title: 'Pengalaman', icon: 'briefcase' },
    { href: '#educations', title: 'Pendidikan', icon: 'graduation' },
    { href: '#achievements', title: 'Prestasi', icon: 'trophy' }
  ];

  return (
    <nav className="floating-nav" aria-label="Main Navigation">
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="nav-item" title={item.title}>
              <PixelIcon name={item.icon} size={22} />
            </a>
          </li>
        ))}

        {/* Audio controls integrated in one row for mobile */}
        <li className="mobile-audio-divider" aria-hidden="true"></li>

        <li className="mobile-audio-item">
          <button
            onClick={() => setIsModalOpen(true)}
            className="nav-item mobile-track-btn"
            title="Soundtrack"
            aria-label="Soundtrack"
          >
            <PixelIcon name="music" size={20} />
          </button>
        </li>

        <li className="mobile-audio-item">
          <button
            onClick={togglePlay}
            className={`nav-item mobile-play-btn ${isPlaying ? 'is-playing' : ''}`}
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          >
            {isPlaying ? (
              <PixelIcon name="pause" size={18} />
            ) : (
              <PixelIcon name="play" size={18} style={{ marginLeft: '2px' }} />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
