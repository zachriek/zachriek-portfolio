import React from 'react';
import {
  Home,
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Minimize2,
  Maximize2,
  ListMusic,
  X,
  Sun,
  Moon,
  Zap,
  Terminal,
  ExternalLink,
  Code,
  Folder,
  FolderOpen,
  FileText,
  User,
  Sparkles,
  Info,
  Check,
  Disc,
  Radio,
  ChevronRight,
  CornerDownLeft,
  Square,
  Minus,
  Image,
  Shield,
  Bug,
  Search,
  Wifi,
  Globe,
  Lock,
  Key,
  Eye,
  Skull,
  Crosshair,
  Activity,
  Sliders,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Grid,
  List,
  Copy,
  CheckCheck,
  RefreshCw,
  Layers,
  HardDrive,
  Monitor
} from 'lucide-react';

/**
 * Custom SVG for GitHub matching Lucide's exact stroke, grid (24x24) and style.
 * (Lucide removed brand icons in recent versions)
 */
const GithubIcon = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  style = {},
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-github pixel-icon ${className}`}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/**
 * Central dictionary mapping icon names / aliases to Lucide components.
 */
const ICON_MAP = {
  home: Home,
  briefcase: Briefcase,
  work: Briefcase,
  graduation: GraduationCap,
  'graduation-cap': GraduationCap,
  graduationcap: GraduationCap,
  education: GraduationCap,
  trophy: Trophy,
  achievement: Trophy,
  calendar: Calendar,
  'map-pin': MapPin,
  mappin: MapPin,
  location: MapPin,
  music: Music,
  play: Play,
  pause: Pause,
  volume: Volume2,
  'volume-2': Volume2,
  volume2: Volume2,
  'volume-1': Volume1,
  volume1: Volume1,
  'volume-x': VolumeX,
  volumex: VolumeX,
  mute: VolumeX,
  unmute: Volume2,
  minimize: Minimize2,
  'minimize-2': Minimize2,
  minimize2: Minimize2,
  maximize: Maximize2,
  'maximize-2': Maximize2,
  maximize2: Maximize2,
  expand: Maximize2,
  'list-music': ListMusic,
  listmusic: ListMusic,
  playlist: ListMusic,
  close: X,
  x: X,
  sun: Sun,
  moon: Moon,
  zap: Zap,
  flash: Zap,
  terminal: Terminal,
  'external-link': ExternalLink,
  externallink: ExternalLink,
  'chevron-right': ChevronRight,
  chevronright: ChevronRight,
  'corner-down-left': CornerDownLeft,
  cornerdownleft: CornerDownLeft,
  code: Code,
  folder: Folder,
  file: FileText,
  'file-text': FileText,
  filetext: FileText,
  user: User,
  sparkles: Sparkles,
  info: Info,
  check: Check,
  disc: Disc,
  radio: Radio,
  minus: Minus,
  'folder-open': FolderOpen,
  folderopen: FolderOpen,
  image: Image,
  img: Image,
  photo: Image,
  shield: Shield,
  bug: Bug,
  search: Search,
  wifi: Wifi,
  globe: Globe,
  lock: Lock,
  key: Key,
  eye: Eye,
  skull: Skull,
  crosshair: Crosshair,
  radar: Activity,
  activity: Activity,
  sliders: Sliders,
  'skip-back': SkipBack,
  skipback: SkipBack,
  prev: SkipBack,
  'skip-forward': SkipForward,
  skipforward: SkipForward,
  next: SkipForward,
  shuffle: Shuffle,
  repeat: Repeat,
  loop: Repeat,
  'arrow-left': ArrowLeft,
  arrowleft: ArrowLeft,
  'arrow-right': ArrowRight,
  arrowright: ArrowRight,
  'arrow-up': ArrowUp,
  arrowup: ArrowUp,
  grid: Grid,
  list: List,
  copy: Copy,
  'check-check': CheckCheck,
  checkcheck: CheckCheck,
  refresh: RefreshCw,
  'refresh-cw': RefreshCw,
  layers: Layers,
  harddrive: HardDrive,
  'hard-drive': HardDrive,
  monitor: Monitor
};

/**
 * PixelIcon renders modern, crisp Lucide icons across the application.
 * Fully backwards-compatible with existing icon name props and Lucide component references.
 */
export const PixelIcon = ({
  name,
  icon,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  style = {},
  ...props
}) => {
  const iconTarget = name || icon;

  // 1. Direct React component passed as name or icon
  if (typeof iconTarget === 'function' || (typeof iconTarget === 'object' && iconTarget !== null)) {
    const Component = iconTarget;
    return (
      <Component
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={`pixel-icon ${className}`}
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
        {...props}
      />
    );
  }

  // 2. String icon name resolution
  const rawKey = String(iconTarget || '').trim().toLowerCase();

  if (rawKey === 'github' || rawKey === 'git-hub') {
    return (
      <GithubIcon
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  const LucideComponent = ICON_MAP[rawKey] || Square;

  return (
    <LucideComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={`pixel-icon ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      {...props}
    />
  );
};

export {
  PixelIcon as Icon,
  PixelIcon as LucideIcon,
  Home,
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Minimize2,
  Maximize2,
  ListMusic,
  X,
  Sun,
  Moon,
  Zap,
  Terminal,
  ExternalLink,
  Code,
  Folder,
  FileText,
  User,
  Sparkles,
  Info,
  Check,
  Disc,
  Radio,
  ChevronRight,
  CornerDownLeft
};

export default PixelIcon;
