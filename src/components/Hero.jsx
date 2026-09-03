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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
