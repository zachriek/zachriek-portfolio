import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TRACKS } from '../data/tracks';
import { getProfileAvatar } from '../data/profile';

const AudioContext = createContext(null);

export const AudioProvider = ({ children, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(10); // Fallen Down (Reprise)
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyserNode, setAnalyserNode] = useState(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoop, setIsLoop] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);

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

  const playAudio = () => {
    if (!audioRef.current) return;
    setupAudioContext();
    audioRef.current.play().catch(e => console.error("Play error:", e));
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  };

  const setVolumeDirect = (val) => {
    const clamped = Math.max(0, Math.min(1, parseFloat(val) || 0));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    } else if (clamped === 0) {
      setIsMuted(true);
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = clamped;
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const selectTrack = (index) => {
    const safeIndex = (index + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(safeIndex);
    setIsModalOpen(false);
    setTimeout(() => {
      if (audioRef.current) {
        setupAudioContext();
        audioRef.current.play().catch(e => console.error("Select track play error:", e));
      }
    }, 50);
  };

  const nextTrack = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * TRACKS.length);
      selectTrack(randomIndex);
    } else {
      const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
      selectTrack(nextIdx);
    }
  };

  const prevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    selectTrack(prevIdx);
  };

  const seekAudio = (timeInSeconds) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(duration || 0, timeInSeconds));
    audioRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const toggleLoop = () => {
    setIsLoop(prev => !prev);
  };

  const toggleShuffle = () => {
    setIsShuffle(prev => !prev);
  };

  const handleEnded = () => {
    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Loop replay error:", e));
      }
    } else {
      nextTrack();
    }
  };

  const currentTrack = TRACKS[currentTrackIndex];
  const currentAvatar = getProfileAvatar(currentTrack);

  const value = {
    audioRef,
    tracks: TRACKS,
    currentTrack,
    currentTrackIndex,
    currentAvatar,
    isPlaying,
    volume,
    isMuted,
    isMinimized,
    isModalOpen,
    analyserNode,
    currentTime,
    duration,
    isLoop,
    isShuffle,
    setIsMinimized,
    setIsModalOpen,
    togglePlay,
    playAudio,
    pauseAudio,
    setVolumeDirect,
    toggleMute,
    handleVolumeChange,
    selectTrack,
    nextTrack,
    prevTrack,
    seekAudio,
    toggleLoop,
    toggleShuffle
  };

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={`/soundtracks/${TRACKS[currentTrackIndex].file}`}
        crossOrigin="anonymous"
        loop={isLoop}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={handleEnded}
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
    return {
      audioRef: { current: null },
      tracks: TRACKS,
      currentTrack: TRACKS[10] || null,
      currentTrackIndex: 10,
      currentAvatar: getProfileAvatar(TRACKS[10]),
      isPlaying: false,
      volume: 0.5,
      isMuted: false,
      isMinimized: true,
      isModalOpen: false,
      analyserNode: null,
      currentTime: 0,
      duration: 0,
      isLoop: true,
      isShuffle: false,
      setIsMinimized: () => {},
      setIsModalOpen: () => {},
      togglePlay: () => {},
      playAudio: () => {},
      pauseAudio: () => {},
      setVolumeDirect: () => {},
      toggleMute: () => {},
      handleVolumeChange: () => {},
      selectTrack: () => {},
      nextTrack: () => {},
      prevTrack: () => {},
      seekAudio: () => {},
      toggleLoop: () => {},
      toggleShuffle: () => {}
    };
  }
  return context;
};

export default AudioContext;
