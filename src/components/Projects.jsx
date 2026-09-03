import React from 'react';
import Section from './Section';
import './Projects.css';

const Projects = ({ onProjectClick }) => {
  return (
    <Section id="projects" title="Projects">
      
      {/* Main Project Card */}
      <div 
        className="project-card main-project pixel-border cursor-pointer" 
        onClick={() => onProjectClick('sispandu')}
      >
        <h3 className="project-title pixel-text-accent text-center">SISPANDU</h3>
        <p className="project-subtitle text-center mb-4">Sistem Informasi Sekolah Pendidikan dan Administrasi Terpadu</p>
        <p className="project-desc text-center">
          Super-app sekolah (Enterprise Resource Planning) yang mencakup seluruh aspek operasional pendidikan. 
          Klik untuk melihat detail lengkapnya!
        </p>
        <div className="click-hint text-center mt-4">
          <span className="blink">[ KLIK UNTUK MEMBUKA ]</span>
        </div>
      </div>

      {/* Development Status */}
      <div className="dev-status-card pixel-border mt-8">
        <div className="dev-badge">IN DEVELOPMENT</div>
        <h4 className="dev-title">Sistem Penerimaan Murid Baru (SPMB) Provinsi Lampung</h4>
        <p className="dev-desc">Saat ini sedang dalam tahap pengembangan aktif untuk menangani PPDB skala provinsi.</p>
      </div>
    </Section>
  );
};

export default Projects;
