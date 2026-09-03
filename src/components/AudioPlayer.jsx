import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Minimize2, Maximize2, X, ListMusic } from 'lucide-react';
import './AudioPlayer.css';

const TRACKS = [
  { title: "Ghost Fight", file: "10. Ghost Fight.mp3" },
  { title: "sans.", file: "15. sans..mp3" },
  { title: "Shop", file: "23. Shop.mp3" },
  { title: "Spear of Justice", file: "46. Spear of Justice.mp3" },
  { title: "It's Showtime!", file: "49. It's Showtime!.mp3" },
  { title: "Spider Dance", file: "59. Spider Dance.mp3" },
  { title: "Death By Glamour", file: "68. Death By Glamour.mp3" },
  { title: "Undertale", file: "71. Undertale.mp3" },
  { title: "ASGORE", file: "77. ASGORE.mp3" },
  { title: "Finale", file: "80. Finale.mp3" },
  { title: "Fallen Down (Reprise)", file: "85. Fallen Down (Reprise).mp3" },
  { title: "Hopes And Dreams", file: "87. Hopes And Dreams.mp3" },
  { title: "Battle Against A True Hero", file: "98. Battle Against A True Hero.mp3" },
  { title: "MEGALOVANIA", file: "100. MEGALOVANIA.mp3" }
];

const AudioPlayer = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(10); // index 10 is 'Fallen Down (Reprise)'
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);

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

  // Setup Audio Context for Visualizer
  function setupAudioContext() {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();

      // Connect audio element to analyser
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      analyserRef.current.fftSize = 128; // Increased fft for wider global visualizer
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(e => console.warn("AudioContext resume failed:", e));
    }
  }

  // Draw Visualizer
  function drawVisualizer() {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Make canvas width match window width dynamically
    canvas.width = window.innerWidth;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8; // Scale slightly down

        // Gradient color for bars
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, 'rgba(155, 28, 33, 0.8)'); // Soft primary red
        gradient.addColorStop(1, 'rgba(255, 128, 128, 0.2)'); // Fade out at the top

        ctx.fillStyle = gradient;

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(155, 28, 33, 0.5)';

        // Draw centered vertically (or bottom up, we do bottom up here)
        // Adding a slight border radius effect using roundRect if supported, else fillRect
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, [4, 4, 0, 0]);
          ctx.fill();
        } else {
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        }

        x += barWidth + 1;
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    draw();
  }

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setupAudioContext(); // Ensure context is ready on user interaction
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
    // Give state time to update src on the audio element, then play
    setTimeout(() => {
      if (audioRef.current) {
        setupAudioContext();
        audioRef.current.play().catch(e => console.error("Select track play error:", e));
      }
    }, 50);
  };

  // Ensure cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // We avoid closing the audioContext here to prevent "already connected" 
      // errors during React StrictMode and HMR, as the DOM element is reused.
    };
  }, []);

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
          drawVisualizer();
        }}
        onPause={() => {
          setIsPlaying(false);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        }}
        onError={(e) => console.error("Audio error:", e)}
      />

      <div className="visualizer-global-container">
        <canvas
          ref={canvasRef}
          className="visualizer-canvas"
          height="80"
        ></canvas>
      </div>

      <div className={`audio-player-container ${isMinimized ? 'audio-player-minimized' : ''}`}>
        {!isMinimized ? (
          <>
            <div className="player-header">
              <h3 className="player-title">
                <Music size={16} /> Soundtrack
              </h3>
              <button
                className="minimize-btn"
                onClick={() => setIsMinimized(true)}
                title="Minimize Player"
              >
                <Minimize2 size={16} />
              </button>
            </div>

            <button className="track-select-btn" onClick={() => setIsModalOpen(true)}>
              <span>{TRACKS[currentTrackIndex].title}</span>
              <ListMusic size={16} />
            </button>

            <div className="controls-row">
              <button className="play-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>

              <div className="volume-container">
                <button
                  onClick={toggleMute}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'url(/cursor-hover-small.png), pointer', display: 'flex' }}
                  title={isMuted || volume === 0 ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
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
            <button className="expand-btn" onClick={() => setIsMinimized(false)} title="Expand Player">
              <Music size={20} />
            </button>
            <button className="play-btn" style={{ width: '36px', height: '36px' }} onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="track-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="track-modal" onClick={e => e.stopPropagation()}>
            <div className="track-modal-header">
              <h2><ListMusic size={20} /> Pilih Soundtrack</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="track-list">
              {TRACKS.map((track, idx) => (
                <button
                  key={idx}
                  className={`track-card ${currentTrackIndex === idx ? 'active' : ''}`}
                  onClick={() => selectTrack(idx)}
                >
                  <div className="track-card-icon">
                    {currentTrackIndex === idx && isPlaying ? <Music size={16} /> : <Play size={16} />}
                  </div>
                  <div className="track-card-info">
                    <p className="track-card-title">{track.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
