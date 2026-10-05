import React, { useState } from 'react';
import BackgroundAnimation from './components/layout/BackgroundAnimation';
import DesktopEnvironment from './components/desktop/DesktopEnvironment';
import PixelIcon from './components/common/PixelIcon';
import PixelButton from './components/common/PixelButton';
import { AudioProvider } from './context/AudioContext';
import useSoundEffects from './hooks/useSoundEffects';

function App() {
  const [appState, setAppState] = useState('start'); // 'start', 'hello', 'main'

  // Enable retro Undertale hover/click sound effects
  useSoundEffects(true);

  const handleStart = () => {
    setAppState('hello');
    const introAudio = new Audio('/mus_intronoise.mp3');
    introAudio.play().catch((e) => console.error('Intro audio error:', e));

    setTimeout(() => {
      setAppState('main');
    }, 2800);
  };

  if (appState === 'start') {
    return (
      <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', overflow: 'hidden' }}>
        <BackgroundAnimation />
        <div style={{ position: 'relative', zIndex: 10 }}>
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
      </div>
    );
  }

  if (appState === 'hello') {
    return (
      <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', color: 'var(--text-main)', overflow: 'hidden' }}>
        <BackgroundAnimation />
        <h1
          className="pixel-text-accent"
          style={{
            position: 'relative',
            zIndex: 10,
            fontSize: '3.5rem',
            animation: 'fadeIn 0.8s',
            textAlign: 'center',
            letterSpacing: '2px'
          }}
        >
          Hello Friend
        </h1>
      </div>
    );
  }

  return (
    <AudioProvider autoPlay={true}>
      <DesktopEnvironment />
    </AudioProvider>
  );
}

export default App;
