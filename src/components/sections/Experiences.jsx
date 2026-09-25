import React from 'react';
import Section from '../common/Section';
import PixelIcon from '../common/PixelIcon';
import PixelCard from '../common/PixelCard';
import { experiencesData } from '../../data/experiences';
import './Experiences.css';

export const Experiences = () => {
  return (
    <Section id="experiences" title="Experiences">
      <div className="timeline">
        {experiencesData.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" aria-hidden="true"></div>
            <PixelCard className="timeline-content">
              <h3 className="exp-role pixel-text-accent">{exp.role}</h3>
              <h4 className="exp-company">{exp.company}</h4>
              <div className="exp-meta">
                <span className="exp-meta-item">
                  <PixelIcon name="calendar" size={14} />
                  <span>{exp.duration}</span>
                </span>
                <span>•</span>
                <span className="exp-meta-item">
                  <PixelIcon name="map-pin" size={14} />
                  <span>{exp.location}</span>
                </span>
              </div>
              <ul className="exp-desc">
                {exp.desc.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </PixelCard>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experiences;
