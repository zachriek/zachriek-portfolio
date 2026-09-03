import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './SispanduDetail.css';

const dummySchools = [
  "SMK Negeri 1 Pugung", "SMKN 1 Negeri Besar", "SMK Negeri 01 Bombana", "SMK Negeri 2 Mojokerto"
];

const SispanduDetail = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sispandu-page">
      <div className="sispandu-header">
        <button className="back-btn pixel-btn" onClick={onBack}>
          <ArrowLeft size={20} className="mr-2" />
          Kembali
        </button>
      </div>

      <div className="sispandu-hero pixel-border">
        <h1 className="modal-title pixel-text-accent text-center">SISPANDU</h1>
        <p className="modal-subtitle text-center">Sistem Informasi Sekolah Pendidikan dan Administrasi Terpadu</p>
      </div>

      <div className="sispandu-tabs-container">
        <div className="sispandu-tabs">
          <button
            className={`tab-btn pixel-btn ${activeTab === 'deskripsi' ? 'active' : ''}`}
            onClick={() => setActiveTab('deskripsi')}
          >
            Deskripsi
          </button>
          <button
            className={`tab-btn pixel-btn ${activeTab === 'teknologi' ? 'active' : ''}`}
            onClick={() => setActiveTab('teknologi')}
          >
            Teknologi
          </button>
          <button
            className={`tab-btn pixel-btn ${activeTab === 'fitur' ? 'active' : ''}`}
            onClick={() => setActiveTab('fitur')}
          >
            Modul & Fitur
          </button>
          <button
            className={`tab-btn pixel-btn ${activeTab === 'klien' ? 'active' : ''}`}
            onClick={() => setActiveTab('klien')}
          >
            Klien
          </button>
        </div>
      </div>

      <div className="sispandu-content">
        {activeTab === 'deskripsi' && (
          <div className="modal-section pixel-border fade-in">
            <h3>1. Deskripsi Project</h3>
            <div className="image-container mb-6" style={{ marginBottom: '2rem' }}>
              <img
                src="/images/sispandu/dashboard.jpg"
                alt="Sispandu Dashboard"
                className="dashboard-img pixel-border"
                onClick={() => setIsImageOpen(true)}
              />
            </div>
            <p>
              Sispandu adalah sebuah aplikasi School Management System (Sistem Informasi Manajemen Sekolah)
              yang berskala besar (Enterprise). Aplikasi ini dirancang untuk mendigitalisasi dan mengotomatisasi
              hampir seluruh aspek operasional sekolah—mulai dari kegiatan belajar mengajar (KBM), administrasi
              tata usaha, bimbingan konseling, manajemen sarana dan prasarana (inventaris), hingga pengelolaan
              kegiatan magang atau Praktik Kerja Lapangan (PKL) serta prediksi kelulusan universitas negeri (SNBP).
            </p>
          </div>
        )}

        {activeTab === 'teknologi' && (
          <div className="modal-section pixel-border fade-in">
            <h3>2. Teknologi yang Digunakan (Tech Stack)</h3>
            <p>Aplikasi ini dikembangkan dengan stack modern dan berkinerja tinggi:</p>
            <ul className="tech-list">
              <li><strong>Backend:</strong> Laravel dengan arsitektur Octane untuk menunjang kecepatan proses data.</li>
              <li><strong>Frontend:</strong> React menggunakan Inertia.js sebagai penghubung (Monolith SPA).</li>
              <li><strong>Styling & UI:</strong> Menggunakan kombinasi Tailwind CSS v4 dan Material UI (MUI).</li>
              <li><strong>Fitur Spesifik:</strong> Didukung oleh Tiptap (Rich text editor), Recharts (Grafik/Statistik), Map Location (Leaflet), QR Code/Barcode Scanner, dan sistem konversi dokumen lanjutan seperti export PDF/Excel.</li>
            </ul>
          </div>
        )}

        {activeTab === 'fitur' && (
          <div className="modal-section pixel-border fade-in">
            <h3>3. Modul dan Fitur-Fiturnya</h3>
            <p>Melihat rincian struktur model data yang sangat luas, project ini dapat dikategorikan menjadi beberapa modul fitur utama, yaitu:</p>

            <div className="feature-module">
              <h4>Modul Akademik & KBM</h4>
              <ul>
                <li><strong>Manajemen Kelas & Siswa:</strong> Pengelolaan data siswa, struktur kelas, wali kelas, ketua kelas, dan kenaikan kelas.</li>
                <li><strong>Manajemen Kurikulum:</strong> Mendukung Kurikulum Merdeka/K13 (Terdapat fitur Elemen, Capaian Pembelajaran, Tujuan Pembelajaran, Asesmen Diagnostik, dan Modul Ajar/Deep Learning).</li>
                <li><strong>Jadwal Pelajaran:</strong> Manajemen jadwal mengajar guru secara detail (termasuk jurnal mengajar/agenda kelas harian).</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul Presensi & Kehadiran</h4>
              <ul>
                <li><strong>Presensi Terpadu:</strong> Melacak absensi harian siswa maupun absensi per-mata pelajaran.</li>
                <li><strong>Presensi Guru & Staf:</strong> Manajemen jam kedatangan guru (lengkap dengan pengaturan absensi/koordinat).</li>
                <li><strong>Pelanggaran Waktu:</strong> Pencatatan kedisiplinan spesifik seperti siswa terlambat datang atau siswa yang pulang sebelum waktunya (pulang awal).</li>
                <li><strong>Presensi Ekstra:</strong> Kehadiran saat Upacara dan Ekstrakurikuler.</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul Ujian & Penilaian (CBT)</h4>
              <ul>
                <li><strong>Sistem Ujian:</strong> Terdapat manajemen Bank Soal, Jadwal Ujian, Peserta Ujian, hingga Lembar Jawaban Siswa.</li>
                <li><strong>Anti-Cheat System:</strong> Dilengkapi dengan AntiCheatLog untuk mencegah kecurangan saat siswa mengerjakan ujian.</li>
                <li><strong>E-Rapor:</strong> Pengolahan nilai, rentang nilai (Interval Nilai), hingga penentuan kelulusan dan rapor TKA (Tes Kemampuan Akademik).</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul PKL & DUDI</h4>
              <ul>
                <li><strong>Manajemen Mitra:</strong> Mengelola data Instansi/Perusahaan (DUDI) beserta kuota magang.</li>
                <li><strong>Jurnal & Absensi PKL:</strong> Siswa dapat mengisi jurnal logbook harian dan melakukan presensi dari tempat magang.</li>
                <li><strong>Monitoring Guru:</strong> Modul bagi Guru Pembimbing Industri untuk memantau, melakukan kunjungan, dan menilai peserta PKL.</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul BK & Kedisiplinan</h4>
              <ul>
                <li><strong>Buku Kasus/Poin:</strong> Fitur catatan pelanggaran, catatan pembinaan, hingga pemberian poin prestasi siswa.</li>
                <li><strong>Home Visit:</strong> Dokumentasi kunjungan rumah siswa bermasalah oleh guru BK.</li>
                <li><strong>TPPK:</strong> Fitur pelaporan satgas pencegahan dan penanganan kekerasan/perundungan di sekolah (LaporTppk).</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul Karier & Alumni</h4>
              <ul>
                <li><strong>BKK:</strong> Pelacakan data penelusuran tamatan (Tracer Study).</li>
                <li><strong>Prediksi SNBP:</strong> Manajemen nilai rasionalisasi, kuota sekolah untuk PTN, dan prediksi SNBP bagi siswa yang ingin melanjutkan ke universitas negeri.</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul Sarana Prasarana & Inventaris</h4>
              <ul>
                <li><strong>Peminjaman & Pengembalian:</strong> Sistem sirkulasi perpustakaan (Buku) maupun alat/inventaris bengkel dan laboratorium.</li>
                <li><strong>Manajemen Aset:</strong> Pendataan barang masuk dan buku inventaris sekolah.</li>
              </ul>
            </div>

            <div className="feature-module">
              <h4>Modul Administrasi Tata Usaha (TU)</h4>
              <ul>
                <li><strong>E-Office:</strong> Fitur persuratan (Surat Masuk & Surat Keluar).</li>
                <li><strong>Buku Tamu & Notulensi:</strong> Pencatatan tamu sekolah secara digital dan arsip Notulen Rapat beserta dokumentasi.</li>
                <li><strong>Pengumuman:</strong> Sistem broadcast informasi ke siswa/guru.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'klien' && (
          <div className="modal-section pixel-border fade-in">
            <h3>4. Klien / Sekolah Pengguna</h3>
            <p>Saat ini SISPANDU telah dipercaya dan digunakan oleh puluhan sekolah, di antaranya:</p>
            <div className="schools-grid mt-4">
              {dummySchools.map((school, i) => (
                <div key={i} className="school-tag pixel-border">{school}</div>
              ))}
            </div>
          </div>
        )}

      </div>

      {isImageOpen && (
        <div className="image-modal-overlay" onClick={() => setIsImageOpen(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn pixel-btn" onClick={() => setIsImageOpen(false)}>X</button>
            <img src="/images/sispandu/dashboard.jpg" alt="Sispandu Dashboard Full" className="full-image pixel-border" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SispanduDetail;
