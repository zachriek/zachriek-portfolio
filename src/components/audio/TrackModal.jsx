import React from 'react';
import PixelIcon from '../common/PixelIcon';

export const TrackModal = ({
  isOpen,
  onClose,
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack
}) => {
  if (!isOpen) return null;

  return (
    <div className="track-modal-overlay" onClick={onClose}>
      <div className="track-modal pixel-border" onClick={(e) => e.stopPropagation()}>
        <div className="track-modal-header">
          <h2>
            <PixelIcon name="list-music" size={20} />
            <span>Pilih Soundtrack</span>
          </h2>
          <button className="modal-close" onClick={onClose} title="Tutup Modal">
            <PixelIcon name="close" size={18} />
          </button>
        </div>
        <div className="track-list">
          {tracks.map((track, idx) => {
            const isCurrent = currentTrackIndex === idx;
            return (
              <button
                key={idx}
                className={`track-card ${isCurrent ? 'active' : ''}`}
                onClick={() => onSelectTrack(idx)}
              >
                <div className="track-card-icon">
                  {isCurrent && isPlaying ? (
                    <PixelIcon name="music" size={16} />
                  ) : (
                    <PixelIcon name="play" size={16} />
                  )}
                </div>
                <div className="track-card-info">
                  <p className="track-card-title">{track.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackModal;
