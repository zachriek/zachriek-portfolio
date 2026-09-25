import React from 'react';
import Section from '../common/Section';
import PixelCard from '../common/PixelCard';
import PixelIcon from '../common/PixelIcon';
import { educationsData } from '../../data/educations';
import './GridList.css';

export const Educations = () => {
  return (
    <Section id="educations" title="Educations">
      <div className="grid-list">
        {educationsData.map((edu, index) => (
          <PixelCard key={index} className="grid-card">
            <h3 className="grid-title pixel-text-accent">{edu.school}</h3>
            <h4 className="grid-subtitle">{edu.degree}</h4>
            <p className="grid-meta">
              <PixelIcon name="calendar" size={14} />
              <span>{edu.duration}</span>
            </p>
          </PixelCard>
        ))}
      </div>
    </Section>
  );
};

export default Educations;
