import React from 'react';
import './Section.css';

const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="content-section">
      <h2 className="section-title pixel-text-accent">
        <span className="title-bracket">[</span> {title} <span className="title-bracket">]</span>
      </h2>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;
