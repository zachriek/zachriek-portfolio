import React from 'react';
import Section from '../common/Section';
import PixelCard from '../common/PixelCard';
import PixelIcon from '../common/PixelIcon';
import { achievementsData } from '../../data/achievements';
import './GridList.css';

export const Achievements = () => {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid-list">
        {achievementsData.map((ach, index) => (
          <PixelCard key={index} className="grid-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <PixelIcon name="trophy" size={20} color="var(--accent-color)" style={{ marginTop: '2px' }} />
              <div>
                <h3 className="grid-title pixel-text-accent">{ach.title}</h3>
                <p className="grid-subtitle" style={{ marginTop: '4px' }}>{ach.issuer}</p>
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </Section>
  );
};

export default Achievements;
