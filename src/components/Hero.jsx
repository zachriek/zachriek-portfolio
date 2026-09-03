import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="about" className="hero-section">
      <div className="avatar-container pixel-border">
        {/* We'll use the generated image here */}
        <img src="/sans_avatar.jpg" alt="Zachrie Kurniawan" className="avatar-img" />
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title pixel-text-accent">Zachrie Kurniawan</h1>
        <p className="hero-bio">
          An ordinary person with an extraordinary passion for technology, especially in building intuitive and functional web applications.
        </p>
        
        <div className="social-links">
          <a href="https://github.com/zachriek" target="_blank" rel="noreferrer" className="pixel-btn">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
