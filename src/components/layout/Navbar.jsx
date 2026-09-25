import React from 'react';
import PixelIcon from '../common/PixelIcon';

export const Navbar = ({ isDark, onToggleTheme }) => {
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
        <li>
          <button
            onClick={onToggleTheme}
            className="nav-item theme-toggle"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label="Toggle Theme"
          >
            <PixelIcon name={isDark ? 'sun' : 'moon'} size={22} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
