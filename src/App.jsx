import React, { useState, useEffect } from 'react'
import { Play } from 'lucide-react'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experiences from './components/Experiences'
import Educations from './components/Educations'
import Achievements from './components/Achievements'
import SispanduDetail from './components/SispanduDetail'

function App() {
  const [appState, setAppState] = useState('start') // 'start', 'hello', 'main'
  const [activeProject, setActiveProject] = useState(null)

  // Apply initial theme so it works before Layout mounts
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || true;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const handleStart = () => {
    setAppState('hello')
    const introAudio = new Audio('/mus_intronoise.mp3')
    introAudio.play().catch(e => console.error("Intro audio error:", e))

    setTimeout(() => {
      setAppState('main')
    }, 3000)
  }

  if (appState === 'start') {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)' }}>
        <button
          onClick={handleStart}
          className="pixel-border"
          style={{
            padding: '15px 30px',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-pixel)',
            border: '2px solid var(--border-color)'
          }}
        >
          <Play size={24} /> START
        </button>
      </div>
    )
  }

  if (appState === 'hello') {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', color: 'var(--text-main)' }}>
        <h1 className="pixel-text-accent" style={{ fontSize: '4rem', animation: 'fadeIn 1s' }}>Hello Friend</h1>
      </div>
    )
  }

  if (activeProject === 'sispandu') {
    return (
      <Layout autoPlayAudio={true}>
        <SispanduDetail onBack={() => setActiveProject(null)} />
      </Layout>
    )
  }

  return (
    <Layout autoPlayAudio={true}>
      <Hero />
      <Projects onProjectClick={setActiveProject} />
      <Experiences />
      <Educations />
      <Achievements />
    </Layout>
  )
}

export default App
