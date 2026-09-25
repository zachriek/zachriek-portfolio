import React, { useState, useEffect, useRef } from 'react';
import PixelIcon from '../common/PixelIcon';
import PixelVisualizer from './PixelVisualizer';
import TrackModal from './TrackModal';
import { TRACKS } from '../../data/tracks';
import './AudioPlayer.css';

export const AudioPlayer = ({ autoPlay = false }) => {
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
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Setup Web Audio Context for Pixel Visualizer
  function setupAudioContext() {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();

      sourceRef.current = ctx.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyser);
      analyser.connect(ctx.destination);

      analyser.fftSize = 128; // Optimal frequency bins for 8-bit visualizer
      audioContextRef.current = ctx;
      setAnalyserNode(analyser);
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(e => console.warn("AudioContext resume failed:", e));
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setupAudioContext();
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    } else if (val === 0) {
      setIsMuted(true);
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

  return (
    <>
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

      {/* Retro Pixel Equalizer Visualizer */}
      <PixelVisualizer analyserNode={analyserNode} isPlaying={isPlaying} />

      {/* Floating Audio Player Widget */}
      <div className={`audio-player-container pixel-border ${isMinimized ? 'audio-player-minimized' : ''}`}>
        {!isMinimized ? (
          <>
            <div className="player-header">
              <h3 className="player-title">
                <PixelIcon name="music" size={16} />
                <span>Soundtrack</span>
              </h3>
              <button
                className="minimize-btn"
                onClick={() => setIsMinimized(true)}
                title="Kecilkan Pemutar"
              >
                <PixelIcon name="minimize" size={16} />
              </button>
            </div>

            <button className="track-select-btn" onClick={() => setIsModalOpen(true)}>
              <span>{TRACKS[currentTrackIndex].title}</span>
              <PixelIcon name="list-music" size={16} />
            </button>

            <div className="controls-row">
              <button
                className="play-btn"
                onClick={togglePlay}
                title={isPlaying ? 'Jeda' : 'Putar'}
              >
                {isPlaying ? (
                  <PixelIcon name="pause" size={18} />
                ) : (
                  <PixelIcon name="play" size={18} style={{ marginLeft: '2px' }} />
                )}
              </button>

              <div className="volume-container">
                <button
                  className="volume-btn"
                  onClick={toggleMute}
                  title={isMuted || volume === 0 ? "Bunyikan" : "Bisukan"}
                >
                  {isMuted || volume === 0 ? (
                    <PixelIcon name="volume-x" size={18} />
                  ) : (
                    <PixelIcon name="volume" size={18} />
                  )}
                </button>
                <input
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  title="Volume"
                  style={{ '--volume-progress': `${(isMuted ? 0 : volume) * 100}%` }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="controls-row" style={{ justifyContent: 'center' }}>
            <button
              className="expand-btn"
              onClick={() => setIsMinimized(false)}
              title="Buka Pemutar Musik"
            >
              <PixelIcon name="music" size={18} />
            </button>
            <button
              className="play-btn"
              style={{ width: '36px', height: '36px' }}
              onClick={togglePlay}
              title={isPlaying ? 'Jeda' : 'Putar'}
            >
              {isPlaying ? (
                <PixelIcon name="pause" size={16} />
              ) : (
                <PixelIcon name="play" size={16} style={{ marginLeft: '2px' }} />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Soundtrack Selection Modal */}
      <TrackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tracks={TRACKS}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onSelectTrack={selectTrack}
      />
    </>
  );
};

export default AudioPlayer;
