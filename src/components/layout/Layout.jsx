import React from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import Navbar from './Navbar';
import Footer from './Footer';
import AudioPlayer from '../audio/AudioPlayer';
import { AudioProvider } from '../../context/AudioContext';
import useSoundEffects from '../../hooks/useSoundEffects';
import './Layout.css';

export const Layout = ({ children, autoPlayAudio = false }) => {
  // Retro hover squeak and click select sounds
  useSoundEffects(true);

  return (
    <AudioProvider autoPlay={autoPlayAudio}>
      <div className="layout-container">
        <BackgroundAnimation />
        
        <main className="content">
          {children}
        </main>

        <Navbar />

        <Footer />
        
        <AudioPlayer />
      </div>
    </AudioProvider>
  );
};

export default Layout;
