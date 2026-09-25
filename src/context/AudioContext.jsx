import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TRACKS } from '../data/tracks';

const AudioContext = createContext(null);

export const AudioProvider = ({ children, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(10); // Fallen Down (Reprise)
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyserNode, setAnalyserNode] = useState(null);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Setup Web Audio Context for Pixel Visualizer and Volume Control
  function setupAudioContext() {
    if (!audioContextRef.current && audioRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      const gainNode = ctx.createGain();

      const initialVolume = isMuted ? 0 : volume;
      gainNode.gain.value = initialVolume;

      sourceRef.current = ctx.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(ctx.destination);

      analyser.fftSize = 128; // Optimal frequency bins for 8-bit visualizer
      audioContextRef.current = ctx;
      gainNodeRef.current = gainNode;
      setAnalyserNode(analyser);
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(e => console.warn("AudioContext resume failed:", e));
    }
  }

  // Initialize autoPlay
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      setupAudioContext();
      audioRef.current.play().catch(e => console.error("Autoplay failed:", e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle volume change
  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume;
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = targetVolume;
    }
    if (audioRef.current) {
      audioRef.current.volume = targetVolume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setupAudioContext();
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      const nextVolume = next ? 0 : (volume > 0 ? volume : 0.5);
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = nextVolume;
      }
      if (audioRef.current) {
        audioRef.current.volume = nextVolume;
      }
      if (!next && volume === 0) {
        setVolume(0.5);
      }
      return next;
    });
  };

  const handleVolumeChange = (e) => {
    const val = Math.max(0, Math.min(1, parseFloat(e.target.value) || 0));
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    } else if (val === 0) {
      setIsMuted(true);
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = val;
    }
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsModalOpen(false);
    setTimeout(() => {
      if (audioRef.current) {
        setupAudioContext();
        audioRef.current.play().catch(e => console.error("Select track play error:", e));
      }
    }, 50);
  };

  const value = {
    audioRef,
    tracks: TRACKS,
    currentTrack: TRACKS[currentTrackIndex],
    currentTrackIndex,
    isPlaying,
    volume,
    isMuted,
    isMinimized,
    isModalOpen,
    analyserNode,
    setIsMinimized,
    setIsModalOpen,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    selectTrack
  };

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={`/soundtracks/${TRACKS[currentTrackIndex].file}`}
        loop
        crossOrigin="anonymous"
        onPlay={() => {
          setIsPlaying(true);
          setupAudioContext();
        }}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.error("Audio error:", e)}
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export default AudioContext;
