import React from 'react';
import Section from './Section';
import './Experiences.css';

const experiencesData = [
  {
    role: 'Member – Project Division',
    company: 'UKM-U Gerakan Digital Ekosistem Nusantara',
    duration: 'December 2024 - Present',
    location: 'University of Lampung',
    desc: [
      'Participated in the Edutech program, completing a JavaScript language course.',
      'Served as a fundraiser for the Gradien Programming Competition event.',
      'Contributed as a frontend developer in the internal project Sistem Klinik Advokasi Mahasiswa.'
    ]
  },
  {
    role: 'Frontend Intern',
    company: 'Core Initiative Studio x Rakamin',
    duration: 'January 2024 - February 2024',
    location: 'Remote',
    desc: [
      'Built a responsive e-commerce UI using Vue.js, focusing on intuitive product listing.',
      'Designed clean layouts with thoughtful color schemes and visual elements.',
      'Improved user experience by optimizing navigation and overall UI appeal.'
    ]
  },
  {
    role: 'Fullstack Intern',
    company: 'Qwords Cloud Web Hosting',
    duration: 'November 2023 - December 2023',
    location: 'Remote',
    desc: [
      'Optimized website frontend using HTML5, CSS, and JavaScript for responsive design.',
      'Redesigned the Qwords website using Laravel to improve functionality and appeal.',
      'Contributed to planning, developing, and implementing new website features.'
    ]
  }
];

const Experiences = () => {
  return (
    <Section id="experiences" title="Experiences">
      <div className="timeline">
        {experiencesData.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content pixel-border">
              <h3 className="exp-role pixel-text-accent">{exp.role}</h3>
              <h4 className="exp-company">{exp.company}</h4>
              <p className="exp-meta">{exp.duration} | {exp.location}</p>
              <ul className="exp-desc">
                {exp.desc.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experiences;
