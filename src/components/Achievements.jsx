import React from 'react';
import Section from './Section';
import './GridList.css'; 

const achievementsData = [
  {
    title: 'Junior Web Developer Certification',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)'
  },
  {
    title: 'Gold Medalist National Science Olympiad Mathematics',
    issuer: 'Prestasi Maju Indonesia'
  },
  {
    title: '1st Place IT Competition Teknik Informatika (ITC-TI) 2023 Software Engineering',
    issuer: 'Institut Informatika dan Bisnis Darmajaya'
  },
  {
    title: '4th Place/Medallion for Excellence LKS Web Technologies National',
    issuer: 'Pusat Prestasi Nasional'
  }
];

const Achievements = () => {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid-list">
        {achievementsData.map((ach, index) => (
          <div key={index} className="grid-card pixel-border">
            <h3 className="grid-title pixel-text-accent">{ach.title}</h3>
            <p className="grid-subtitle">{ach.issuer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Achievements;
