import React from 'react';
import PixelIcon from '../common/PixelIcon';
import { profileData } from '../../data/profile';
import './Hero.css';

export const Hero = () => {
  return (
    <section id="about" className="hero-section">
      <div className="avatar-container pixel-border">
        <img
          src={profileData.avatar}
          alt={profileData.name}
          className="avatar-img"
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
