import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Experiences from './components/sections/Experiences';
import Educations from './components/sections/Educations';
import Achievements from './components/sections/Achievements';
import PixelIcon from './components/common/PixelIcon';
import PixelButton from './components/common/PixelButton';

function App() {
  const [appState, setAppState] = useState('start'); // 'start', 'hello', 'main'

  // Initialize theme before Layout mounts
  useEffect(() => {
    const isDark = localStorage.getItem('theme') !== 'light';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const handleStart = () => {
    setAppState('hello');
    const introAudio = new Audio('/mus_intronoise.mp3');
    introAudio.play().catch(e => console.error("Intro audio error:", e));

    setTimeout(() => {
      setAppState('main');
    }, 2800);
  };

  if (appState === 'start') {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)' }}>
        <PixelButton
          onClick={handleStart}
          size="lg"
          variant="default"
          style={{
            padding: '16px 36px',
            fontSize: '1.4rem',
            gap: '12px'
          }}
        >
          <PixelIcon name="play" size={24} />
          <span>START</span>
        </PixelButton>
      </div>
    );
  }

  if (appState === 'hello') {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', color: 'var(--text-main)' }}>
        <h1 className="pixel-text-accent" style={{ fontSize: '3.5rem', animation: 'fadeIn 0.8s', textAlign: 'center', letterSpacing: '2px' }}>
          Hello Friend
        </h1>
      </div>
    );
  }

  return (
    <Layout autoPlayAudio={true}>
      <Hero />
      <Experiences />
      <Educations />
      <Achievements />
    </Layout>
  );
}

export default App;
