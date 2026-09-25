import React from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import Navbar from './Navbar';
import Footer from './Footer';
import AudioPlayer from '../audio/AudioPlayer';
import useTheme from '../../hooks/useTheme';
import useSoundEffects from '../../hooks/useSoundEffects';
import './Layout.css';

export const Layout = ({ children, autoPlayAudio = false }) => {
  const { isDark, toggleTheme } = useTheme();
  
  // Retro hover squeak and click select sounds
  useSoundEffects(true);

  return (
    <div className="layout-container">
      <BackgroundAnimation />
      
      <main className="content">
        {children}
      </main>

      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <Footer />
      
      <AudioPlayer autoPlay={autoPlayAudio} />
    </div>
  );
};

export default Layout;
