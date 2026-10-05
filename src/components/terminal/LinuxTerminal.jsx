import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { profileData, DEFAULT_AVATAR } from '../../data/profile';
import { experiencesData } from '../../data/experiences';
import { educationsData } from '../../data/educations';
import { achievementsData } from '../../data/achievements';
import PixelIcon from '../common/PixelIcon';
import './LinuxTerminal.css';

export const COMMAND_LIST = [
  { name: '/about-me', label: '/about-me', desc: 'Profil lengkap & biodata diri' },
  { name: '/experiences', label: '/experiences', desc: 'Riwayat pengalaman & magang' },
  { name: '/educations', label: '/educations', desc: 'Riwayat pendidikan formal' },
  { name: '/achievements', label: '/achievements', desc: 'Daftar sertifikasi & penghargaan' },
  { name: '/play', label: '/play', desc: 'Putar / lanjutkan musik soundtrack' },
  { name: '/pause', label: '/pause', desc: 'Jeda pemutaran musik' },
  { name: '/volume', label: '/volume [0-100]', desc: 'Atur / cek volume (contoh: /volume 80)' },
  { name: '/tracks', label: '/tracks', desc: 'Daftar 18 soundtrack & pilih lagu' },
  { name: '/all', label: '/all', desc: 'Tampilkan semua isi portofolio' },
  { name: '/clear', label: '/clear', desc: 'Bersihkan layar terminal' },
];

export const LinuxTerminal = () => {
  const {
    currentAvatar,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    volume,
    playAudio,
    pauseAudio,
    setVolumeDirect,
    selectTrack,
    tracks
  } = useAudio();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      id: 'init-welcome',
      type: 'system',
      content: (
        <div className="terminal-welcome-msg">
          <p className="terminal-green">
            [SYS-READY] Linux 6.8.0-zachrie-arch x86_64 loaded successfully.
          </p>
          <p className="terminal-muted">
            Ketik perintah di baris input bawah atau klik tombol shortcut di atas.
          </p>
        </div>
      )
    }
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const inputRef = useRef(null);
  const terminalBottomRef = useRef(null);
  const historyScrollRef = useRef(null);

  const avatarSrc = currentAvatar || profileData.avatar;

  // Auto-scroll history container when new output is added
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Refocus input whenever user clicks inside terminal
  const handleTerminalClick = (e) => {
    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
      inputRef.current?.focus();
    }
  };

  const executeCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Save to command history for arrow navigation
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const parts = trimmed.split(/\s+/);
    let cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    // Normalize: allow commands with or without leading '/'
    if (!cmd.startsWith('/')) {
      cmd = '/' + cmd;
    }

    let outputElement = null;

    switch (cmd) {
      case '/help':
        outputElement = (
          <div className="terminal-output-block">
            <p className="terminal-highlight">DAFTAR COMMAND TERSEDIA:</p>
            <div className="terminal-table">
              {COMMAND_LIST.map((c) => (
                <div key={c.name} className="terminal-table-row">
                  <span className="terminal-cmd-name">{c.label}</span>
                  <span className="terminal-cmd-desc">— {c.desc}</span>
                </div>
              ))}
            </div>
            <p className="terminal-muted">
              Tips: Gunakan tombol Tab untuk autocomplete, dan Panah Atas/Bawah untuk riwayat perintah.
            </p>
          </div>
        );
        break;

      case '/about-me':
      case '/about':
        outputElement = (
          <div className="terminal-output-block about-output">
            <div className="output-section-header">=== TENTANG SAYA (PROFILE) ===</div>
            <p><strong className="terminal-accent">Nama :</strong> {profileData.name}</p>
            <p><strong className="terminal-accent">Peran:</strong> {profileData.role}</p>
            <p><strong className="terminal-accent">Bio  :</strong> {profileData.bio}</p>
            <div className="about-links">
              <strong className="terminal-accent">Tautan Sosial:</strong>
              {profileData.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="terminal-social-link pixel-btn"
                >
                  <PixelIcon name={s.icon} size={16} />
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        );
        break;

      case '/experiences':
      case '/experience':
      case '/exp':
        outputElement = (
          <div className="terminal-output-block">
            <div className="output-section-header">=== PENGALAMAN KERJA (EXPERIENCES) ===</div>
            {experiencesData.map((exp, idx) => (
              <div key={idx} className="terminal-card">
                <div className="terminal-card-title">
                  [{idx + 1}] {exp.role} <span className="terminal-accent">@ {exp.company}</span>
                </div>
                <div className="terminal-muted">
                  Waktu: {exp.duration} | Lokasi: {exp.location}
                </div>
                <ul className="terminal-bullets">
                  {exp.desc.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case '/educations':
      case '/education':
      case '/edu':
        outputElement = (
          <div className="terminal-output-block">
            <div className="output-section-header">=== RIWAYAT PENDIDIKAN (EDUCATIONS) ===</div>
            {educationsData.map((edu, idx) => (
              <div key={idx} className="terminal-card">
                <div className="terminal-card-title">
                  [{idx + 1}] {edu.school}
                </div>
                <p>Jurusan / Gelar: <span className="terminal-accent">{edu.degree}</span></p>
                <p className="terminal-muted">Periode: {edu.duration}</p>
              </div>
            ))}
          </div>
        );
        break;

      case '/achievements':
      case '/achievement':
      case '/achieve':
        outputElement = (
          <div className="terminal-output-block">
            <div className="output-section-header">=== PENGHARGAAN & PRESTASI (ACHIEVEMENTS) ===</div>
            <div className="terminal-achievements-list">
              {achievementsData.map((ach, idx) => (
                <div key={idx} className="terminal-card">
                  <div className="terminal-card-title">
                    ★ {ach.title}
                  </div>
                  <div className="terminal-muted">Penyelenggara: {ach.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case '/play':
        playAudio();
        outputElement = (
          <div className="terminal-output-block terminal-green">
            [AUDIO] ▶️ Memutar soundtrack: "{currentTrack?.title || 'Track'}"
            <div className="terminal-muted">
              Volume: {Math.round(volume * 100)}% | Ketik /pause untuk jeda musik, atau /tracks untuk ganti lagu.
            </div>
          </div>
        );
        break;

      case '/pause':
        pauseAudio();
        outputElement = (
          <div className="terminal-output-block terminal-accent">
            [AUDIO] ⏸️ Soundtrack dijeda. Ketik /play untuk memutar kembali.
          </div>
        );
        break;

      case '/volume':
      case '/vol': {
        if (!arg) {
          const currentPct = Math.round(volume * 100);
          const barFilled = Math.round(currentPct / 10);
          const barEmpty = 10 - barFilled;
          const barStr = '■'.repeat(barFilled) + '□'.repeat(barEmpty);
          outputElement = (
            <div className="terminal-output-block">
              <p>[AUDIO] 🔊 Volume saat ini: <strong className="terminal-green">{currentPct}%</strong></p>
              <p className="terminal-ascii-bar">[{barStr}]</p>
              <p className="terminal-muted">Untuk mengubah, ketik: /volume &lt;0-100&gt; (contoh: /volume 80)</p>
            </div>
          );
        } else {
          const num = parseInt(arg, 10);
          if (isNaN(num) || num < 0 || num > 100) {
            outputElement = (
              <div className="terminal-output-block terminal-accent">
                [ERROR] Nilai volume harus angka antara 0 dan 100. Contoh: /volume 75
              </div>
            );
          } else {
            const frac = num / 100;
            setVolumeDirect(frac);
            const barFilled = Math.round(num / 10);
            const barEmpty = 10 - barFilled;
            const barStr = '■'.repeat(barFilled) + '□'.repeat(barEmpty);
            outputElement = (
              <div className="terminal-output-block terminal-green">
                <p>[AUDIO] 🔊 Volume berhasil diatur ke: <strong>{num}%</strong></p>
                <p className="terminal-ascii-bar">[{barStr}]</p>
              </div>
            );
          }
        }
        break;
      }

      case '/tracks':
      case '/tracklist':
        outputElement = (
          <div className="terminal-output-block">
            <div className="output-section-header">=== DAFTAR SOUNDTRACK (UNDERTALE / DELTARUNE) ===</div>
            <p className="terminal-muted">
              Klik lagu di bawah atau ketik /track &lt;nomor&gt; untuk memutar lagu dan mengubah foto profil:
            </p>
            <div className="terminal-tracks-grid">
              {tracks.map((t, idx) => {
                const isCurrent = idx === currentTrackIndex;
                return (
                  <button
                    key={t.file}
                    className={`terminal-track-btn pixel-border ${isCurrent ? 'active' : ''}`}
                    onClick={() => {
                      selectTrack(idx);
                      executeCommand(`/track ${idx + 1}`);
                    }}
                  >
                    <span className="track-num">[{idx + 1}]</span>
                    <span className="track-title">{t.title}</span>
                    {t.image && <span className="track-gif-badge">GIF</span>}
                    {isCurrent && <span className="track-now-playing">▶ ACTIVE</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
        break;

      case '/track': {
        const num = parseInt(arg, 10);
        if (isNaN(num) || num < 1 || num > tracks.length) {
          outputElement = (
            <div className="terminal-output-block terminal-accent">
              [ERROR] Nomor lagu tidak valid! Pilih nomor antara 1 dan {tracks.length}.
              <br />
              Ketik /tracks untuk melihat daftar nomor soundtrack.
            </div>
          );
        } else {
          const targetIndex = num - 1;
          selectTrack(targetIndex);
          const selected = tracks[targetIndex];
          outputElement = (
            <div className="terminal-output-block terminal-green">
              [AUDIO] 🔀 Memutar lagu: "{selected.title}" {selected.image ? '(GIF Avatar Aktif)' : ''}
            </div>
          );
        }
        break;
      }

      case '/all':
        outputElement = (
          <div className="terminal-output-block">
            <div className="output-section-header">=== PORTOFOLIO LENGKAP: ZACHRIE KURNIAWAN ===</div>

            <div className="terminal-card">
              <div className="terminal-card-title">TENTANG SAYA</div>
              <p><strong className="terminal-accent">Nama:</strong> {profileData.name}</p>
              <p><strong className="terminal-accent">Peran:</strong> {profileData.role}</p>
              <p><strong className="terminal-accent">Bio:</strong> {profileData.bio}</p>
            </div>

            <div className="terminal-card">
              <div className="terminal-card-title">PENGALAMAN</div>
              {experiencesData.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '8px' }}>
                  <strong>• {exp.role}</strong> @ {exp.company} ({exp.duration})
                </div>
              ))}
            </div>

            <div className="terminal-card">
              <div className="terminal-card-title">PENDIDIKAN</div>
              {educationsData.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '6px' }}>
                  <strong>• {edu.school}</strong> - {edu.degree} ({edu.duration})
                </div>
              ))}
            </div>

            <div className="terminal-card">
              <div className="terminal-card-title">PRESTASI</div>
              {achievementsData.map((ach, idx) => (
                <div key={idx} style={{ marginBottom: '6px' }}>
                  ★ {ach.title} ({ach.issuer})
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case '/clear':
      case '/cls':
        setHistory([]);
        return;

      default:
        outputElement = (
          <div className="terminal-output-block terminal-error">
            bash: {trimmed}: command not found.
            <div className="terminal-muted">
              Ketik <span className="terminal-highlight">/help</span> atau klik tombol di atas untuk melihat command yang tersedia.
            </div>
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        type: 'command',
        commandText: trimmed,
        content: outputElement
      }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIndex = historyPointer + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextIndex);
        setInputVal(commandHistory[nextIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = inputVal.trim().toLowerCase();
      if (!trimmed) return;
      const match = COMMAND_LIST.find(
        (c) => c.name.startsWith(trimmed) || c.name.substring(1).startsWith(trimmed)
      );
      if (match) {
        setInputVal(match.name);
      }
    }
  };

  return (
    <div className="terminal-wrapper" onClick={handleTerminalClick}>
      <div className="terminal-window pixel-border">
        {/* Linux Terminal Header Bar */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="terminal-title">
            zachrie@archlinux: ~ (bash)
          </div>
          <div className="terminal-audio-status">
            {isPlaying ? (
              <span className="audio-playing-indicator" title={currentTrack?.title}>
                🎵 {currentTrack?.title} [PLAYING]
              </span>
            ) : (
              <span className="audio-paused-indicator">
                🔇 PAUSED
              </span>
            )}
          </div>
        </div>

        {/* Persistent Top Section: Profile Image Header (Always in view!) */}
        <div className="terminal-profile-header">
          <div className="terminal-avatar-container pixel-border">
            <img
              key={avatarSrc}
              src={avatarSrc}
              alt={currentTrack?.title ? `${profileData.name} - ${currentTrack.title}` : profileData.name}
              className="terminal-avatar-img"
              onError={(e) => {
                if (e.currentTarget.src !== profileData.avatar && e.currentTarget.src !== DEFAULT_AVATAR) {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }
              }}
            />
          </div>
          <div className="terminal-profile-info">
            <h1 className="terminal-name pixel-text-accent">{profileData.name}</h1>
            <p className="terminal-role">{profileData.role}</p>
            <p className="terminal-sub">
              <span className="status-online">● ONLINE</span> | Linux Interactive Portfolio v2.0
            </p>
          </div>
        </div>

        {/* Persistent Commands Panel (Always visible so visitor immediately knows available commands) */}
        <div className="terminal-commands-panel">
          <div className="commands-panel-title">
            ★ COMMANDS TERSEDIA (Klik tombol atau ketik di baris perintah):
          </div>

          {/* Quick-action interactive chips */}
          <div className="commands-chips-grid">
            {COMMAND_LIST.map((cmd) => (
              <button
                key={cmd.name}
                className="terminal-chip pixel-border"
                onClick={() => executeCommand(cmd.name)}
                title={cmd.desc}
              >
                <span className="chip-name">{cmd.label}</span>
              </button>
            ))}
          </div>

          {/* Clean Cheatsheet list */}
          <div className="commands-cheatsheet">
            {COMMAND_LIST.map((cmd) => (
              <div key={cmd.name} className="cheatsheet-item">
                <span className="cmd-tag">{cmd.label}</span>
                <span className="cmd-desc">— {cmd.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Command Output History Area */}
        <div className="terminal-history-container" ref={historyScrollRef}>
          {history.map((item) => (
            <div key={item.id} className="history-entry">
              {item.type === 'command' && (
                <div className="prompt-echo-line">
                  <span className="prompt-user">guest@zachrie</span>
                  <span className="prompt-sep">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-symbol">$</span>
                  <span className="echo-command">{item.commandText}</span>
                </div>
              )}
              <div className="history-content">{item.content}</div>
            </div>
          ))}
          <div ref={terminalBottomRef} />
        </div>

        {/* Interactive Input Prompt Line (Always visible at bottom of terminal window) */}
        <div className="terminal-input-row">
          <span className="prompt-user">guest@zachrie</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-symbol">$</span>
          <div className="input-field-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Ketik perintah (contoh: /about-me, /experiences, /volume 80)..."
            />
            <span className="terminal-cursor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinuxTerminal;
