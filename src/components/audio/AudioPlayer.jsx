import React from 'react';
import PixelIcon from '../common/PixelIcon';
import PixelVisualizer from './PixelVisualizer';
import TrackModal from './TrackModal';
import { useAudio } from '../../context/AudioContext';
import './AudioPlayer.css';

export const AudioPlayer = () => {
  const {
    tracks,
    currentTrack,
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
  } = useAudio();

  return (
    <>
      {/* Retro Pixel Equalizer Visualizer */}
      <PixelVisualizer analyserNode={analyserNode} isPlaying={isPlaying} />

      {/* Floating Audio Player Widget (Desktop) */}
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
              <span>{currentTrack.title}</span>
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
                  onInput={handleVolumeChange}
                  title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  aria-label="Volume"
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
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onSelectTrack={selectTrack}
      />
    </>
  );
};

export default AudioPlayer;
