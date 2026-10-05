import React from 'react';
import PixelIcon from '../common/PixelIcon';
import { profileData } from '../../data/profile';
import { useAudio } from '../../context/AudioContext';
import './Hero.css';

export const Hero = () => {
  const { currentAvatar, currentTrack } = useAudio();
  const avatarSrc = currentAvatar || profileData.avatar;

  return (
    <section id="about" className="hero-section">
      <div className="avatar-container pixel-border">
        <img
          key={avatarSrc}
          src={avatarSrc}
          alt={currentTrack?.title ? `${profileData.name} - ${currentTrack.title}` : profileData.name}
          className="avatar-img"
          onError={(e) => {
            if (e.currentTarget.src !== profileData.avatar) {
              e.currentTarget.src = profileData.avatar;
            }
          }}
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-title pixel-text-accent">{profileData.name}</h1>
        <p className="hero-bio">{profileData.bio}</p>

        <div className="social-links">
          {profileData.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn"
            >
              <PixelIcon name={social.icon} size={20} />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
