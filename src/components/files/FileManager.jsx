import React, { useState, useMemo } from 'react';
import PixelIcon from '../common/PixelIcon';
import { PENTEST_TOOLS } from '../../data/tools';
import { GALLERY_IMAGES } from '../../data/images';
import { useAudio } from '../../context/AudioContext';
import { updateProfileAvatar } from '../../data/profile';
import './FileManager.css';

export const FileManager = ({
  initialFolder = '~',
  onOpenTerminalWithCommand = null,
  onOpenMusicPlayer = null
}) => {
  const { selectTrack, tracks } = useAudio();

  // Navigation state
  const [currentFolder, setCurrentFolder] = useState(initialFolder); // '~', '~/tools', '~/images'
  const [history, setHistory] = useState([initialFolder]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // View state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [avatarUpdatedNotice, setAvatarUpdatedNotice] = useState('');

  // Tool category filter
  const [toolCategory, setToolCategory] = useState('ALL');

  // Navigation helpers
  const navigateTo = (folder) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(folder);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setCurrentFolder(folder);
    setSearchQuery('');
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentFolder(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentFolder(history[newIndex]);
    }
  };

  const goUp = () => {
    if (currentFolder !== '~') {
      navigateTo('~');
    }
  };

  // Filtered tools
  const filteredTools = useMemo(() => {
    return PENTEST_TOOLS.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = toolCategory === 'ALL' || tool.category === toolCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, toolCategory]);

  // Filtered images
  const filteredImages = useMemo(() => {
    return GALLERY_IMAGES.filter(img => {
      return (
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.soundtrack.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (img.tags && img.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    });
  }, [searchQuery]);

  // Copy command to clipboard
  const handleCopyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    });
  };

  // Play soundtrack matching image
  const handlePlayImageSoundtrack = (img) => {
    if (typeof img.trackIndex === 'number' && img.trackIndex >= 0 && img.trackIndex < tracks.length) {
      selectTrack(img.trackIndex);
    } else {
      // Find by title or file
      const foundIdx = tracks.findIndex(t => t.title.toLowerCase() === img.title.toLowerCase() || t.file === img.soundtrack);
      if (foundIdx !== -1) {
        selectTrack(foundIdx);
      }
    }
  };

  // Set as profile avatar
  const handleSetAvatar = (img) => {
    updateProfileAvatar(img.path);
    setAvatarUpdatedNotice(`Avatar diperbarui dengan ${img.title}!`);
    setTimeout(() => setAvatarUpdatedNotice(''), 3000);
  };

  return (
    <div className="file-manager-root">
      {/* Top File Manager Navigation Bar */}
      <div className="fm-topbar">
        {/* History & Nav Buttons */}
        <div className="fm-nav-buttons">
          <button
            type="button"
            className="fm-btn"
            onClick={goBack}
            disabled={historyIndex <= 0}
            title="Kembali (Back)"
            aria-label="Back"
          >
            <PixelIcon name="arrow-left" size={14} />
          </button>
          <button
            type="button"
            className="fm-btn"
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            title="Maju (Forward)"
            aria-label="Forward"
          >
            <PixelIcon name="arrow-right" size={14} />
          </button>
          <button
            type="button"
            className="fm-btn"
            onClick={goUp}
            disabled={currentFolder === '~'}
            title="Naik ke Direktori Induk (Up to parent)"
            aria-label="Up"
          >
            <PixelIcon name="arrow-up" size={14} />
          </button>
        </div>

        {/* Breadcrumb Path Bar */}
        <div className="fm-breadcrumb">
          <span className="crumb-root" onClick={() => navigateTo('~')}>
            <PixelIcon name="home" size={13} style={{ marginRight: '4px' }} />
            home
          </span>
          <span className="crumb-sep">/</span>
          <span className="crumb-user" onClick={() => navigateTo('~')}>zachrie</span>
          {currentFolder !== '~' && (
            <>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">
                {currentFolder.replace('~/', '')}
              </span>
            </>
          )}
        </div>

        {/* Search & View Mode Switcher */}
        <div className="fm-tools-right">
          <div className="fm-search-wrapper">
            <PixelIcon name="search" size={13} className="fm-search-icon" />
            <input
              type="text"
              placeholder={`Cari di ${currentFolder === '~' ? 'folder' : currentFolder.replace('~/', '')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="fm-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="fm-search-clear"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>

          <div className="fm-view-toggle">
            <button
              type="button"
              className={`fm-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Tampilan Kisi (Grid)"
            >
              <PixelIcon name="grid" size={13} />
            </button>
            <button
              type="button"
              className={`fm-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Tampilan Daftar (List)"
            >
              <PixelIcon name="list" size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="fm-layout">
        {/* Left Places Sidebar */}
        <aside className="fm-sidebar">
          <div className="fm-sidebar-group">
            <span className="fm-sidebar-title">PLACES</span>
            <button
              type="button"
              className={`fm-sidebar-item ${currentFolder === '~' ? 'active' : ''}`}
              onClick={() => navigateTo('~')}
            >
              <PixelIcon name="home" size={14} />
              <span>Home (~)</span>
            </button>
            <button
              type="button"
              className={`fm-sidebar-item ${currentFolder === '~/tools' ? 'active' : ''}`}
              onClick={() => navigateTo('~/tools')}
            >
              <PixelIcon name="shield" size={14} className="icon-shield" />
              <span>tools/</span>
              <span className="item-count-badge">{PENTEST_TOOLS.length}</span>
            </button>
            <button
              type="button"
              className={`fm-sidebar-item ${currentFolder === '~/images' ? 'active' : ''}`}
              onClick={() => navigateTo('~/images')}
            >
              <PixelIcon name="image" size={14} className="icon-image" />
              <span>images/</span>
              <span className="item-count-badge">{GALLERY_IMAGES.length}</span>
            </button>
          </div>

          <div className="fm-sidebar-group">
            <span className="fm-sidebar-title">QUICK LAUNCH</span>
            {onOpenMusicPlayer && (
              <button
                type="button"
                className="fm-sidebar-item"
                onClick={onOpenMusicPlayer}
              >
                <PixelIcon name="music" size={14} />
                <span>Music Player</span>
              </button>
            )}
          </div>

          <div className="fm-system-card">
            <div className="sys-badge">LINUX FILESYSTEM</div>
            <div className="sys-info">
              <span>Host: archlinux</span>
              <span>Kernel: 6.8.0-x86_64</span>
              <span>Root: ext4 (rw)</span>
            </div>
          </div>
        </aside>

        {/* Right Explorer Workspace */}
        <main className="fm-workspace">
          {/* FOLDER: Home (~) */}
          {currentFolder === '~' && (
            <div className="fm-home-view">
              <div className="fm-section-header">
                <h3 className="fm-section-title">
                  <PixelIcon name="folder" size={16} /> Direktori Portofolio
                </h3>
                <span className="fm-section-meta">2 folder, 1 berkas</span>
              </div>

              <div className="fm-home-grid">
                {/* Tools Folder Card */}
                <div
                  className="fm-folder-card pixel-border"
                  onClick={() => navigateTo('~/tools')}
                >
                  <div className="folder-icon-wrapper folder-tools-accent">
                    <PixelIcon name="shield" size={38} />
                  </div>
                  <div className="folder-card-info">
                    <div className="folder-name">tools/</div>
                    <div className="folder-desc">Penetration testing & cybersecurity tools (Burp Suite, Nmap, Metasploit, dll)</div>
                    <div className="folder-count">{PENTEST_TOOLS.length} tools terpasang</div>
                  </div>
                  <span className="folder-enter-badge">Buka →</span>
                </div>

                {/* Images Folder Card */}
                <div
                  className="fm-folder-card pixel-border"
                  onClick={() => navigateTo('~/images')}
                >
                  <div className="folder-icon-wrapper folder-images-accent">
                    <PixelIcon name="image" size={38} />
                  </div>
                  <div className="folder-card-info">
                    <div className="folder-name">images/</div>
                    <div className="folder-desc">Koleksi animasi GIF soundtrack Undertale & Deltarune</div>
                    <div className="folder-count">{GALLERY_IMAGES.length} animasi GIF</div>
                  </div>
                  <span className="folder-enter-badge">Buka →</span>
                </div>

                {/* README info file */}
                <div className="fm-file-card pixel-border">
                  <div className="file-icon-wrapper">
                    <PixelIcon name="file-text" size={28} />
                  </div>
                  <div className="file-card-info">
                    <div className="file-name">README.txt</div>
                    <div className="file-sub">Zachrie Kurniawan — Linux Desktop Portfolio v2.0</div>
                    <div className="file-meta">Ketik /help di terminal atau klik folder di atas</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FOLDER: ~/tools */}
          {currentFolder === '~/tools' && (
            <div className="fm-tools-view">
              {/* Category Pills */}
              <div className="fm-filter-bar">
                {['ALL', 'Web Application Security', 'Network Reconnaissance', 'Exploitation Framework', 'Packet Analysis & Forensics', 'Database Pentest', 'Password Security', 'Wireless Pentest'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`fm-filter-chip ${toolCategory === cat ? 'active' : ''}`}
                    onClick={() => setToolCategory(cat)}
                  >
                    {cat === 'ALL' ? 'Semua Kategori' : cat}
                  </button>
                ))}
              </div>

              {viewMode === 'grid' ? (
                <div className="fm-tools-grid">
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="tool-card pixel-border"
                      onClick={() => setSelectedTool(tool)}
                    >
                      <div className="tool-card-header">
                        <div className="tool-icon-box" style={{ borderColor: tool.color }}>
                          <PixelIcon name={tool.icon} size={22} color={tool.color} />
                        </div>
                        <span className="tool-badge-pill" style={{ borderColor: tool.color, color: tool.color }}>
                          {tool.badge}
                        </span>
                      </div>
                      <h4 className="tool-card-name">{tool.name}</h4>
                      <p className="tool-card-category">{tool.category}</p>
                      <p className="tool-card-desc">{tool.description}</p>
                      <div className="tool-command-preview">
                        <code>$ {tool.command}</code>
                      </div>
                      <div className="tool-card-footer">
                        <span className="tool-inspect-link">Lihat Detail & Output →</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="fm-list-table-wrapper pixel-border">
                  <table className="fm-list-table">
                    <thead>
                      <tr>
                        <th>NAMA TOOL</th>
                        <th>KATEGORI</th>
                        <th>COMMAND</th>
                        <th>DESKRIPSI</th>
                        <th>AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTools.map((tool) => (
                        <tr
                          key={tool.id}
                          className="fm-list-row"
                          onClick={() => setSelectedTool(tool)}
                        >
                          <td className="cell-tool-name">
                            <PixelIcon name={tool.icon} size={16} color={tool.color} style={{ marginRight: '8px' }} />
                            <span>{tool.name}</span>
                          </td>
                          <td className="cell-category">
                            <span className="table-badge">{tool.category}</span>
                          </td>
                          <td className="cell-command">
                            <code>{tool.command}</code>
                          </td>
                          <td className="cell-desc">{tool.description}</td>
                          <td className="cell-action">
                            <button
                              type="button"
                              className="fm-mini-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTool(tool);
                              }}
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* FOLDER: ~/images */}
          {currentFolder === '~/images' && (
            <div className="fm-images-view">
              <div className="fm-images-meta-bar">
                <span>{filteredImages.length} Berkas GIF Animasi</span>
                <span className="meta-hint">Klik gambar untuk melihat resolusi penuh dan memutar lagunya</span>
              </div>

              {viewMode === 'grid' ? (
                <div className="fm-images-grid">
                  {filteredImages.map((img) => (
                    <div
                      key={img.id}
                      className="image-card pixel-border"
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className="image-card-thumb-wrapper">
                        <img
                          src={img.path}
                          alt={img.title}
                          className="image-card-thumb"
                          loading="lazy"
                        />
                        <div className="image-card-hover-overlay">
                          <PixelIcon name="maximize" size={24} />
                          <span>Perbesar GIF</span>
                        </div>
                      </div>
                      <div className="image-card-info">
                        <h4 className="image-card-title">{img.title}</h4>
                        <div className="image-card-details">
                          <span className="image-size-pill">{img.size}</span>
                          <span className="image-track-pill" title={`Soundtrack: ${img.soundtrack}`}>
                            <PixelIcon name="music" size={11} /> {img.soundtrack.replace('.mp3', '')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="fm-list-table-wrapper pixel-border">
                  <table className="fm-list-table">
                    <thead>
                      <tr>
                        <th>PREVIEW</th>
                        <th>NAMA BERKAS</th>
                        <th>SOUNDTRACK TIE-IN</th>
                        <th>UKURAN</th>
                        <th>AKSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredImages.map((img) => (
                        <tr
                          key={img.id}
                          className="fm-list-row"
                          onClick={() => setSelectedImage(img)}
                        >
                          <td className="cell-thumb">
                            <img src={img.path} alt={img.title} className="table-thumb" />
                          </td>
                          <td className="cell-img-title">
                            <strong>{img.title}</strong>
                            <span className="filename-sub">{img.filename}</span>
                          </td>
                          <td className="cell-soundtrack">
                            <button
                              type="button"
                              className="fm-table-music-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayImageSoundtrack(img);
                              }}
                              title="Putar soundtrack ini"
                            >
                              <PixelIcon name="play" size={12} />
                              <span>{img.soundtrack}</span>
                            </button>
                          </td>
                          <td className="cell-size">{img.size}</td>
                          <td className="cell-action">
                            <button
                              type="button"
                              className="fm-mini-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(img);
                              }}
                            >
                              Buka
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MODAL: Tool Detail Inspector */}
      {selectedTool && (
        <div className="fm-modal-backdrop" onClick={() => setSelectedTool(null)}>
          <div className="fm-modal-window pixel-border" onClick={(e) => e.stopPropagation()}>
            <div className="fm-modal-header">
              <div className="fm-modal-title">
                <PixelIcon name={selectedTool.icon} size={18} color={selectedTool.color} />
                <span>{selectedTool.name}</span>
                <span className="fm-modal-badge" style={{ borderColor: selectedTool.color, color: selectedTool.color }}>
                  {selectedTool.category}
                </span>
              </div>
              <button
                type="button"
                className="fm-modal-close-btn"
                onClick={() => setSelectedTool(null)}
              >
                ×
              </button>
            </div>

            <div className="fm-modal-body">
              <p className="tool-full-desc">{selectedTool.description}</p>
              <p className="tool-full-details">{selectedTool.details}</p>

              <div className="tool-features-section">
                <h5 className="sub-heading">FITUR & KAPABILITAS:</h5>
                <ul className="features-list">
                  {selectedTool.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feat-check">✔</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tool-command-box">
                <div className="command-box-header">
                  <span>COMMAND CONTOH:</span>
                  <button
                    type="button"
                    className="copy-btn pixel-border"
                    onClick={() => handleCopyCommand(selectedTool.command)}
                  >
                    <PixelIcon name={copiedCommand ? "check" : "copy"} size={12} />
                    <span>{copiedCommand ? 'Tersalin!' : 'Salin Perintah'}</span>
                  </button>
                </div>
                <pre className="command-pre">
                  <code>$ {selectedTool.command}</code>
                </pre>
              </div>

              {selectedTool.sampleOutput && (
                <div className="tool-output-preview">
                  <div className="output-header">SAMPLE TERMINAL EXECUTION:</div>
                  <pre className="terminal-sample-pre">
                    <code>{selectedTool.sampleOutput}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="fm-modal-footer">
              {onOpenTerminalWithCommand && (
                <button
                  type="button"
                  className="execute-terminal-btn pixel-btn"
                  onClick={() => {
                    onOpenTerminalWithCommand(selectedTool.command);
                    setSelectedTool(null);
                  }}
                >
                  <PixelIcon name="terminal" size={14} />
                  <span>Jalankan di Terminal</span>
                </button>
              )}
              <button
                type="button"
                className="fm-close-action-btn pixel-btn"
                onClick={() => setSelectedTool(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Full Image & GIF Viewer */}
      {selectedImage && (
        <div className="fm-modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="fm-image-modal-window pixel-border" onClick={(e) => e.stopPropagation()}>
            <div className="fm-modal-header">
              <div className="fm-modal-title">
                <PixelIcon name="image" size={16} />
                <span>{selectedImage.title} ({selectedImage.filename})</span>
              </div>
              <button
                type="button"
                className="fm-modal-close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>

            <div className="fm-image-modal-body">
              <div className="modal-gif-display pixel-border">
                <img
                  src={selectedImage.path}
                  alt={selectedImage.title}
                  className="modal-gif-full"
                />
              </div>

              <div className="modal-image-sidebar">
                <div className="image-meta-card pixel-border">
                  <h4 className="meta-card-title">{selectedImage.title}</h4>
                  <p className="meta-desc">{selectedImage.description}</p>

                  <div className="meta-kv-group">
                    <div className="kv-row">
                      <span className="kv-key">Ukuran Berkas:</span>
                      <span className="kv-val">{selectedImage.size}</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-key">Tipe Format:</span>
                      <span className="kv-val">GIF Animated Image</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-key">Soundtrack:</span>
                      <span className="kv-val">{selectedImage.soundtrack}</span>
                    </div>
                  </div>

                  {selectedImage.tags && (
                    <div className="image-tags-wrapper">
                      {selectedImage.tags.map(t => (
                        <span key={t} className="image-tag-chip">#{t}</span>
                      ))}
                    </div>
                  )}

                  {avatarUpdatedNotice && (
                    <div className="avatar-updated-alert pixel-border">
                      {avatarUpdatedNotice}
                    </div>
                  )}

                  <div className="image-modal-actions">
                    <button
                      type="button"
                      className="pixel-btn play-track-btn"
                      onClick={() => handlePlayImageSoundtrack(selectedImage)}
                    >
                      <PixelIcon name="play" size={15} />
                      <span>Putar Lagu ({selectedImage.soundtrack.replace('.mp3', '')})</span>
                    </button>

                    <button
                      type="button"
                      className="pixel-btn set-avatar-btn"
                      onClick={() => handleSetAvatar(selectedImage)}
                    >
                      <PixelIcon name="user" size={15} />
                      <span>Jadikan Avatar Profil</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManager;
