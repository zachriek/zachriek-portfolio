import React from 'react';
import Section from './Section';
import './GridList.css'; // Shared CSS for simple grids/lists

const educationsData = [
  {
    school: 'University of Lampung',
    degree: "Bachelor's degree, Informatics Engineering",
    duration: 'August 2023 - Present'
  },
  {
    school: 'SMK Negeri 1 Bandar Lampung',
    degree: 'Multimedia',
    duration: 'July 2020 - July 2023'
  }
];

const Educations = () => {
  return (
    <Section id="educations" title="Educations">
      <div className="grid-list">
        {educationsData.map((edu, index) => (
          <div key={index} className="grid-card pixel-border">
            <h3 className="grid-title pixel-text-accent">{edu.school}</h3>
            <h4 className="grid-subtitle">{edu.degree}</h4>
            <p className="grid-meta">{edu.duration}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Educations;
