import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../context/AudioContext';
import PixelIcon from '../common/PixelIcon';
import './MusicPlayerApp.css';

export const MusicPlayerApp = () => {
  const {
    tracks,
    currentTrack,
    currentTrackIndex,
    currentAvatar,
    isPlaying,
    volume,
    isMuted,
    analyserNode,
    currentTime,
    duration,
    isLoop,
    isShuffle,
    togglePlay,
    selectTrack,
    nextTrack,
    prevTrack,
    seekAudio,
    toggleMute,
    handleVolumeChange,
    setVolumeDirect,
    toggleLoop,
    toggleShuffle
  } = useAudio();

  const [searchFilter, setSearchFilter] = useState('');
  const [visualizerMode, setVisualizerMode] = useState('bars'); // 'bars', 'wave', 'matrix'
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const peaksRef = useRef([]);

  // Format time mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filtered tracks
  const filteredTracks = tracks.filter((t) =>
    t.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.file.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Wide Visualizer Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 110;
        peaksRef.current = [];
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!analyserNode || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw subtle idle guideline
      ctx.strokeStyle = '#1a1a26';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 10);
      ctx.lineTo(canvas.width, canvas.height - 10);
      ctx.stroke();
      return;
    }

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visualizerMode === 'wave') {
        // Oscilloscope Waveform style
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ff7675';
        ctx.beginPath();
        const sliceWidth = canvas.width / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
        return;
      }

      // Discrete 8-Bit Pixel Equalizer Mode
      const brickWidth = 8;
      const brickHeight = 4;
      const brickGap = 2;
      const step = brickWidth + brickGap;
      const totalColumns = Math.floor(canvas.width / step);
      const maxBlocks = Math.floor((canvas.height - 14) / (brickHeight + brickGap));

      if (peaksRef.current.length !== totalColumns) {
        peaksRef.current = new Array(totalColumns).fill(0);
      }

      for (let i = 0; i < totalColumns; i++) {
        const freqIndex = Math.min(
          bufferLength - 1,
          Math.floor(Math.pow(i / totalColumns, 1.35) * bufferLength)
        );

        const val = dataArray[freqIndex] || 0;
        const normalized = val / 255;
        const numBlocks = Math.floor(normalized * maxBlocks);

        if (numBlocks >= peaksRef.current[i]) {
          peaksRef.current[i] = numBlocks;
        } else {
          peaksRef.current[i] = Math.max(0, peaksRef.current[i] - 0.28);
        }

        const x = i * step;

        for (let b = 0; b < numBlocks; b++) {
          const ratio = b / maxBlocks;
          let color = '#8b151a';
          if (ratio > 0.75) {
            color = '#ffeaa7';
          } else if (ratio > 0.5) {
            color = '#ff7675';
          } else if (ratio > 0.25) {
            color = '#d63031';
          }

          ctx.fillStyle = color;
          ctx.fillRect(
            x,
            canvas.height - (b + 1) * (brickHeight + brickGap),
            brickWidth,
            brickHeight
          );
        }

        // Falling Peak Caps
        const peak = Math.floor(peaksRef.current[i]);
        if (peak > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(
            x,
            canvas.height - (peak + 1) * (brickHeight + brickGap),
            brickWidth,
            2
          );
        }
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyserNode, isPlaying, visualizerMode]);

  // Handle scrubber drag / click
  const handleScrubberChange = (e) => {
    const val = parseFloat(e.target.value);
    seekAudio(val);
  };

  const currentGifImage = currentTrack?.image || currentAvatar;

  return (
    <div className="music-player-root">
      {/* Ticker Header */}
      <div className="mp-header-bar">
        <div className="mp-header-left">
          <span className={`mp-status-pill ${isPlaying ? 'playing' : 'paused'}`}>
            <PixelIcon name={isPlaying ? "music" : "volume-x"} size={13} />
            <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
          </span>
          <span className="mp-now-title">
            {currentTrack?.title} — Undertale / Deltarune OST
          </span>
        </div>
        <div className="mp-header-right">
          <span className="mp-audio-format">MP3 44.1kHz / Stereo</span>
        </div>
      </div>

      {/* Main Spacious Stage */}
      <div className="mp-hero-stage">
        {/* Left: Wide Animated GIF Display */}
        <div className="mp-gif-showcase pixel-border">
          <div className="mp-gif-wrapper">
            <img
              src={currentGifImage}
              alt={currentTrack?.title || 'Soundtrack'}
              className="mp-gif-media"
            />
            <div className="mp-crt-scanlines" aria-hidden="true" />
            <div className="mp-gif-badge">
              <span className="pulse-dot" />
              <span>{currentTrack?.title}</span>
            </div>
          </div>
        </div>

        {/* Right: Now Playing Controls & Detailed Info */}
        <div className="mp-controls-panel pixel-border">
          <div className="mp-track-headline">
            <span className="mp-track-number">TRACK #{currentTrackIndex + 1} OF {tracks.length}</span>
            <h2 className="mp-track-title pixel-text-accent">{currentTrack?.title}</h2>
            <span className="mp-track-filename">{currentTrack?.file}</span>
          </div>

          {/* Interactive Audio Scrubber Timeline */}
          <div className="mp-timeline-wrapper">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div className="scrubber-container">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleScrubberChange}
                className="mp-scrubber-slider"
                style={{
                  '--scrub-progress': `${duration ? (currentTime / duration) * 100 : 0}%`
                }}
                aria-label="Seek time"
              />
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>

          {/* Core Transport Controls */}
          <div className="mp-transport-row">
            <button
              type="button"
              className={`mp-tool-btn ${isShuffle ? 'active' : ''}`}
              onClick={toggleShuffle}
              title={isShuffle ? 'Acak: Aktif' : 'Acak: Nonaktif'}
            >
              <PixelIcon name="shuffle" size={16} />
            </button>

            <button
              type="button"
              className="mp-transport-btn prev-btn"
              onClick={prevTrack}
              title="Lagu Sebelumnya"
            >
              <PixelIcon name="skip-back" size={20} />
            </button>

            <button
              type="button"
              className="mp-play-main-btn pixel-btn"
              onClick={togglePlay}
              title={isPlaying ? 'Jeda' : 'Putar'}
            >
              {isPlaying ? (
                <PixelIcon name="pause" size={26} />
              ) : (
                <PixelIcon name="play" size={26} style={{ marginLeft: '4px' }} />
              )}
            </button>

            <button
              type="button"
              className="mp-transport-btn next-btn"
              onClick={nextTrack}
              title="Lagu Berikutnya"
            >
              <PixelIcon name="skip-forward" size={20} />
            </button>

            <button
              type="button"
              className={`mp-tool-btn ${isLoop ? 'active' : ''}`}
              onClick={toggleLoop}
              title={isLoop ? 'Ulangi: Aktif' : 'Ulangi: Nonaktif'}
            >
              <PixelIcon name="repeat" size={16} />
            </button>
          </div>

          {/* Volume Control Sliders & Quick Presets */}
          <div className="mp-volume-row">
            <button
              type="button"
              className="mp-volume-mute-btn"
              onClick={toggleMute}
              title={isMuted || volume === 0 ? 'Bunyikan' : 'Bisukan'}
            >
              <PixelIcon name={isMuted || volume === 0 ? "volume-x" : "volume"} size={18} />
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="mp-volume-slider"
              style={{
                '--volume-progress': `${(isMuted ? 0 : volume) * 100}%`
              }}
              aria-label="Volume"
            />
            <span className="volume-percent">{Math.round((isMuted ? 0 : volume) * 100)}%</span>

            <div className="volume-presets">
              {[0.25, 0.5, 0.75, 1.0].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`vol-pill ${volume === preset && !isMuted ? 'active' : ''}`}
                  onClick={() => setVolumeDirect(preset)}
                >
                  {Math.round(preset * 100)}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Wide Spectrum Audio Visualizer */}
      <div className="mp-visualizer-section pixel-border">
        <div className="visualizer-header">
          <div className="viz-title">
            <PixelIcon name="activity" size={14} />
            <span>REAL-TIME 8-BIT AUDIO SPECTRUM EQUALIZER</span>
          </div>
          <div className="viz-mode-toggles">
            <button
              type="button"
              className={`viz-pill ${visualizerMode === 'bars' ? 'active' : ''}`}
              onClick={() => setVisualizerMode('bars')}
            >
              ARCADE SPECTRUM
            </button>
            <button
              type="button"
              className={`viz-pill ${visualizerMode === 'wave' ? 'active' : ''}`}
              onClick={() => setVisualizerMode('wave')}
            >
              OSCILLOSCOPE
            </button>
          </div>
        </div>

        <div className="canvas-wrapper">
          <canvas ref={canvasRef} className="mp-visualizer-canvas" height="110" />
        </div>
      </div>

      {/* Full 18 Soundtrack Playlist Section */}
      <div className="mp-playlist-section pixel-border">
        <div className="playlist-header">
          <div className="playlist-title">
            <PixelIcon name="list-music" size={15} />
            <span>PLAYLIST SOUNDTRACK ({tracks.length} LAGU)</span>
          </div>

          <div className="playlist-search">
            <PixelIcon name="search" size={13} className="playlist-search-icon" />
            <input
              type="text"
              placeholder="Cari lagu di playlist..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="playlist-search-input"
            />
          </div>
        </div>

        <div className="playlist-items-list">
          {filteredTracks.map((trk) => {
            const originalIndex = tracks.findIndex(t => t.file === trk.file);
            const isCurrent = originalIndex === currentTrackIndex;

            return (
              <div
                key={trk.file}
                className={`playlist-row ${isCurrent ? 'is-active' : ''}`}
                onClick={() => selectTrack(originalIndex)}
              >
                <div className="row-index">
                  {isCurrent && isPlaying ? (
                    <span className="playing-pulse-icon">▶</span>
                  ) : (
                    <span>{originalIndex + 1}</span>
                  )}
                </div>

                <div className="row-title-block">
                  <span className="row-title">{trk.title}</span>
                  <span className="row-file">{trk.file}</span>
                </div>

                <div className="row-badges">
                  {trk.image && (
                    <span className="gif-available-badge" title="Tersedia animasi GIF visual">
                      <PixelIcon name="image" size={12} /> GIF
                    </span>
                  )}
                  {isCurrent && (
                    <span className="now-playing-tag">
                      {isPlaying ? 'MEMUTAR' : 'TERPILIH'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerApp;
