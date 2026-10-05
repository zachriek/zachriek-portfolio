import React, { useState, useEffect, useRef } from 'react';
import PixelIcon from '../common/PixelIcon';
import DesktopWindow from './DesktopWindow';
import LinuxTerminal from '../terminal/LinuxTerminal';
import FileManager from '../files/FileManager';
import MusicPlayerApp from '../audio/MusicPlayerApp';
import BackgroundAnimation from '../layout/BackgroundAnimation';
import { useAudio } from '../../context/AudioContext';
import './DesktopEnvironment.css';

export const DesktopEnvironment = () => {
  const { currentTrack, isPlaying, togglePlay, isMuted, volume, toggleMute } = useAudio();

  // Live system time clock
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');

  // Start menu dropdown state
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const startMenuRef = useRef(null);

  // File manager active folder tracker
  const [fileManagerFolder, setFileManagerFolder] = useState('~');

  // Desktop Windows State: Terminal is default open as requested!
  const [windows, setWindows] = useState({
    terminal: {
      id: 'terminal',
      title: 'guest@zachrie: ~ (bash)',
      icon: 'terminal',
      isOpen: true, // Default open app!
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 50, y: 48 },
      size: { width: 860, height: 580 }
    },
    files: {
      id: 'files',
      title: 'File Manager — ~/portfolio',
      icon: 'folder',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 120, y: 70 },
      size: { width: 900, height: 580 }
    },
    music: {
      id: 'music',
      title: 'Music Player — Undertale & Deltarune OST',
      icon: 'music',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      position: { x: 90, y: 60 },
      size: { width: 920, height: 620 }
    }
  });

  // Active focused window ID
  const [activeWindowId, setActiveWindowId] = useState('terminal');

  // Real-time clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
      setCurrentTimeStr(time);
      setCurrentDateStr(date);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target) && !e.target.closest('.app-launcher-btn')) {
        setIsStartMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus a window
  const focusWindow = (id) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map(w => w.zIndex || 10), 10) + 1;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: maxZ,
          isMinimized: false
        }
      };
    });
  };

  // Open a window with optional initial folder
  const openWindow = (id, options = {}) => {
    setActiveWindowId(id);

    if (id === 'files' && options.folder) {
      setFileManagerFolder(options.folder);
    }

    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map(w => w.zIndex || 10), 10) + 1;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: maxZ
        }
      };
    });

    setIsStartMenuOpen(false);
  };

  // Close window
  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));

    if (activeWindowId === id) {
      // Find another open and non-minimized window to focus
      const otherOpen = Object.values(windows).find(w => w.id !== id && w.isOpen && !w.isMinimized);
      if (otherOpen) {
        focusWindow(otherOpen.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Minimize window
  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));

    if (activeWindowId === id) {
      const otherOpen = Object.values(windows).find(w => w.id !== id && w.isOpen && !w.isMinimized);
      if (otherOpen) {
        focusWindow(otherOpen.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Maximize / restore window
  const toggleMaximizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
    focusWindow(id);
  };

  // Toggle window from taskbar button
  const handleTaskbarTabClick = (id) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  // Position change
  const handlePositionChange = (id, pos) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: pos
      }
    }));
  };

  // Size change
  const handleSizeChange = (id, size) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size: size
      }
    }));
  };

  // Open app from terminal command (e.g. /files, /tools, /images, /music)
  const handleTerminalOpenApp = (appName, data = {}) => {
    openWindow(appName, data);
  };

  // Desktop Shortcuts
  const desktopShortcuts = [
    {
      id: 'terminal',
      title: 'Terminal',
      icon: 'terminal',
      action: () => openWindow('terminal')
    },
    {
      id: 'files',
      title: 'Files',
      icon: 'folder',
      action: () => openWindow('files', { folder: '~' })
    },
    {
      id: 'tools',
      title: 'Pentest Tools',
      icon: 'shield',
      action: () => openWindow('files', { folder: '~/tools' })
    },
    {
      id: 'images',
      title: 'Images & GIFs',
      icon: 'image',
      action: () => openWindow('files', { folder: '~/images' })
    },
    {
      id: 'music',
      title: 'Music Player',
      icon: 'music',
      action: () => openWindow('music')
    }
  ];

  return (
    <div className="desktop-environment-root">
      {/* Background Binary Ambient Rain */}
      <BackgroundAnimation />

      {/* Top Linux Panel / Taskbar */}
      <header className="linux-top-panel pixel-border">
        {/* Left: Applications Menu Launcher */}
        <div className="panel-left-section">
          <button
            type="button"
            className={`app-launcher-btn ${isStartMenuOpen ? 'active' : ''}`}
            onClick={() => setIsStartMenuOpen((prev) => !prev)}
            title="Menu Aplikasi Linux"
          >
            <span className="distro-icon">▲</span>
            <span className="launcher-text">Applications</span>
          </button>

          {/* Quick Launcher Icons */}
          <div className="quick-launchers">
            <button
              type="button"
              className="quick-icon-btn"
              onClick={() => openWindow('terminal')}
              title="Terminal (Bash)"
            >
              <PixelIcon name="terminal" size={14} />
            </button>
            <button
              type="button"
              className="quick-icon-btn"
              onClick={() => openWindow('files', { folder: '~' })}
              title="File Manager"
            >
              <PixelIcon name="folder" size={14} />
            </button>
            <button
              type="button"
              className="quick-icon-btn"
              onClick={() => openWindow('music')}
              title="Soundtrack Music Player"
            >
              <PixelIcon name="music" size={14} />
            </button>
          </div>
        </div>

        {/* Center: Open Window Tabs / Taskbar */}
        <div className="panel-center-taskbar">
          {Object.values(windows).map((win) => {
            if (!win.isOpen) return null;
            const isActive = activeWindowId === win.id && !win.isMinimized;

            return (
              <button
                key={win.id}
                type="button"
                className={`taskbar-window-pill ${isActive ? 'active' : ''} ${win.isMinimized ? 'minimized' : ''}`}
                onClick={() => handleTaskbarTabClick(win.id)}
                title={win.title}
              >
                <PixelIcon name={win.icon} size={13} className="tab-icon" />
                <span className="tab-title">{win.title.split('—')[0].trim()}</span>
                {win.isMinimized && <span className="tab-min-indicator">[min]</span>}
              </button>
            );
          })}
        </div>

        {/* Right: System Tray & Clock */}
        <div className="panel-right-tray">
          {/* Mini Audio Status Pill */}
          <div
            className="tray-audio-widget"
            onClick={() => openWindow('music')}
            title="Buka Music Player"
          >
            <button
              type="button"
              className="tray-audio-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
            >
              <PixelIcon name={isPlaying ? "pause" : "play"} size={11} />
            </button>

            <span className="tray-track-name">
              {currentTrack?.title || 'Undertale OST'}
            </span>

            <button
              type="button"
              className="tray-audio-vol-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              title={isMuted || volume === 0 ? 'Bunyikan' : 'Bisukan'}
            >
              <PixelIcon name={isMuted || volume === 0 ? "volume-x" : "volume"} size={11} />
            </button>
          </div>

          {/* Network & Sys info */}
          <div className="tray-status-group">
            <span className="tray-item" title="Kernel: Arch Linux 6.8.0-x86_64">
              <PixelIcon name="wifi" size={13} />
            </span>
            <span className="tray-user-badge">guest@zachrie</span>
          </div>

          {/* Live Date & Time Clock */}
          <div className="tray-clock" title={`Waktu Sistem: ${currentDateStr}`}>
            <span className="clock-time">{currentTimeStr}</span>
            <span className="clock-date">{currentDateStr}</span>
          </div>
        </div>
      </header>

      {/* Start Menu Popup */}
      {isStartMenuOpen && (
        <div ref={startMenuRef} className="linux-start-menu pixel-border">
          <div className="start-menu-header">
            <span className="start-menu-user">zachrie@archlinux</span>
            <span className="start-menu-sub">Linux Desktop v2.0</span>
          </div>

          <div className="start-menu-list">
            <button
              type="button"
              className="start-menu-item"
              onClick={() => openWindow('terminal')}
            >
              <PixelIcon name="terminal" size={16} className="start-icon" />
              <div className="start-item-info">
                <span className="start-item-title">Terminal</span>
                <span className="start-item-desc">Interactive bash shell with autocomplete</span>
              </div>
            </button>

            <button
              type="button"
              className="start-menu-item"
              onClick={() => openWindow('files', { folder: '~' })}
            >
              <PixelIcon name="folder" size={16} className="start-icon" />
              <div className="start-item-info">
                <span className="start-item-title">File Manager</span>
                <span className="start-item-desc">Jelajahi folder portofolio & berkas</span>
              </div>
            </button>

            <button
              type="button"
              className="start-menu-item"
              onClick={() => openWindow('files', { folder: '~/tools' })}
            >
              <PixelIcon name="shield" size={16} className="start-icon icon-shield" />
              <div className="start-item-info">
                <span className="start-item-title">Penetration Testing Tools</span>
                <span className="start-item-desc">Burp Suite, Nmap, Metasploit, Wireshark...</span>
              </div>
            </button>

            <button
              type="button"
              className="start-menu-item"
              onClick={() => openWindow('files', { folder: '~/images' })}
            >
              <PixelIcon name="image" size={16} className="start-icon icon-image" />
              <div className="start-item-info">
                <span className="start-item-title">Images & GIFs</span>
                <span className="start-item-desc">Animasi GIF soundtrack Undertale / Deltarune</span>
              </div>
            </button>

            <button
              type="button"
              className="start-menu-item"
              onClick={() => openWindow('music')}
            >
              <PixelIcon name="music" size={16} className="start-icon" />
              <div className="start-item-info">
                <span className="start-item-title">Music Player</span>
                <span className="start-item-desc">Soundtrack player dengan spektrum visualizer</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Workspace with Icons & Windows */}
      <main className="desktop-workspace-area">
        {/* Desktop Shortcuts Grid */}
        <div className="desktop-shortcuts-grid">
          {desktopShortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              className="desktop-shortcut-item"
              onClick={shortcut.action}
              onDoubleClick={shortcut.action}
              tabIndex={0}
              role="button"
              title={`Klik dua kali untuk membuka ${shortcut.title}`}
            >
              <div className="shortcut-icon-box pixel-border">
                <PixelIcon name={shortcut.icon} size={28} />
              </div>
              <span className="shortcut-title">{shortcut.title}</span>
            </div>
          ))}
        </div>

        {/* WINDOW 1: Linux Terminal (Default Open Application!) */}
        <DesktopWindow
          id="terminal"
          title={windows.terminal.title}
          icon={windows.terminal.icon}
          isOpen={windows.terminal.isOpen}
          isMinimized={windows.terminal.isMinimized}
          isMaximized={windows.terminal.isMaximized}
          zIndex={windows.terminal.zIndex}
          position={windows.terminal.position}
          size={windows.terminal.size}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={focusWindow}
          onPositionChange={(pos) => handlePositionChange('terminal', pos)}
          onSizeChange={(size) => handleSizeChange('terminal', size)}
        >
          <LinuxTerminal
            isEmbedded={true}
            onOpenApp={handleTerminalOpenApp}
          />
        </DesktopWindow>

        {/* WINDOW 2: File Manager (with tools/ and images/ folders) */}
        <DesktopWindow
          id="files"
          title={windows.files.title}
          icon={windows.files.icon}
          isOpen={windows.files.isOpen}
          isMinimized={windows.files.isMinimized}
          isMaximized={windows.files.isMaximized}
          zIndex={windows.files.zIndex}
          position={windows.files.position}
          size={windows.files.size}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={focusWindow}
          onPositionChange={(pos) => handlePositionChange('files', pos)}
          onSizeChange={(size) => handleSizeChange('files', size)}
        >
          <FileManager
            initialFolder={fileManagerFolder}
            onOpenTerminalWithCommand={(_cmd) => {
              openWindow('terminal');
            }}
            onOpenMusicPlayer={() => openWindow('music')}
          />
        </DesktopWindow>

        {/* WINDOW 3: Music Player (with Wide Layout, GIF & Audio Visualizer) */}
        <DesktopWindow
          id="music"
          title={windows.music.title}
          icon={windows.music.icon}
          isOpen={windows.music.isOpen}
          isMinimized={windows.music.isMinimized}
          isMaximized={windows.music.isMaximized}
          zIndex={windows.music.zIndex}
          position={windows.music.position}
          size={windows.music.size}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onFocus={focusWindow}
          onPositionChange={(pos) => handlePositionChange('music', pos)}
          onSizeChange={(size) => handleSizeChange('music', size)}
        >
          <MusicPlayerApp />
        </DesktopWindow>
      </main>
    </div>
  );
};

export default DesktopEnvironment;
