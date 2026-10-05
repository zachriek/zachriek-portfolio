/**
 * Image / GIF Media Dataset
 * Contains animated GIF assets available in the portfolio images directory.
 */

export const GALLERY_IMAGES = [
  {
    id: 'ghost-fight',
    title: 'Ghost Fight',
    filename: '10. Ghost Fight.gif',
    path: '/images/10. Ghost Fight.gif',
    size: '812 KB',
    soundtrack: '10. Ghost Fight.mp3',
    trackIndex: 0,
    tags: ['Undertale', 'Napstablook', 'Boss Fight', 'Animation'],
    description: 'Animated battle sequence featuring Napstablook swaying to the rhythm of Ghost Fight.'
  },
  {
    id: 'sans',
    title: 'sans.',
    filename: '15. sans..gif',
    path: '/images/15. sans..gif',
    size: '904 KB',
    soundtrack: '15. sans..mp3',
    trackIndex: 1,
    tags: ['Undertale', 'Sans', 'Snowdin', 'Skeleton'],
    description: 'The iconic wink and relaxed shrug of Sans the Skeleton in Snowdin Town.'
  },
  {
    id: 'shop',
    title: 'Shop',
    filename: '23. Shop.gif',
    path: '/images/23. Shop.gif',
    size: '742 KB',
    soundtrack: '23. Shop.mp3',
    trackIndex: 2,
    tags: ['Undertale', 'Snowdin Shopkeeper', 'Item Shop', 'Retro'],
    description: 'Snowdin shopkeeper interior animation with cozy warm lights and vintage RPG merchandise.'
  },
  {
    id: 'spear-of-justice',
    title: 'Spear of Justice',
    filename: '46. Spear of Justice.gif',
    path: '/images/46. Spear of Justice.gif',
    size: '610 KB',
    soundtrack: '46. Spear of Justice.mp3',
    trackIndex: 3,
    tags: ['Undertale', 'Undyne', 'Spears', 'Armor'],
    description: 'Undyne unleashing glowing magical energy spears with fiery battle determination.'
  },
  {
    id: 'its-showtime',
    title: "It's Showtime!",
    filename: "49. It's Showtime!.gif",
    path: "/images/49. It's Showtime!.gif",
    size: '86 KB',
    soundtrack: "49. It's Showtime!.mp3",
    trackIndex: 4,
    tags: ['Undertale', 'Mettaton', 'Showtime', 'TV Star'],
    description: 'Mettaton making a dramatic television broadcast debut with dazzling stage spotlights.'
  },
  {
    id: 'death-by-glamour',
    title: 'Death By Glamour',
    filename: '68. Death By Glamour.gif',
    path: '/images/68. Death By Glamour.gif',
    size: '59 KB',
    soundtrack: '68. Death By Glamour.mp3',
    trackIndex: 6,
    tags: ['Undertale', 'Mettaton EX', 'Glamour', 'Dance'],
    description: 'Mettaton EX striking dynamic high-energy dance poses across the flashing dance floor.'
  },
  {
    id: 'true-hero',
    title: 'Battle Against A True Hero',
    filename: '98. Battle Against A True Hero.gif',
    path: '/images/98. Battle Against A True Hero.gif',
    size: '1.7 MB',
    soundtrack: '98. Battle Against A True Hero.mp3',
    trackIndex: 12,
    tags: ['Undertale', 'Undyne the Undying', 'True Hero', 'Determination'],
    description: 'Undyne the Undying standing resolute as the heroine protecting monsters and the underground.'
  },
  {
    id: 'megalovania',
    title: 'MEGALOVANIA',
    filename: '100. MEGALOVANIA.gif',
    path: '/images/100. MEGALOVANIA.gif',
    size: '904 KB',
    soundtrack: '100. MEGALOVANIA.mp3',
    trackIndex: 13,
    tags: ['Undertale', 'Sans', 'Bad Time', 'Gaster Blaster', 'Judgement'],
    description: 'Sans unleashing glowing blue eye energy in the Judgement Hall for the climactic battle.'
  },
  {
    id: 'big-shot',
    title: 'BIG SHOT',
    filename: 'BIG SHOT.gif',
    path: '/images/BIG SHOT.gif',
    size: '286 KB',
    soundtrack: 'BIG SHOT.mp3',
    trackIndex: 16,
    tags: ['Deltarune', 'Spamton NEO', 'Big Shot', 'Kromer'],
    description: 'Spamton NEO suspended by cyber puppet strings living his wildest [[BIG SHOT]] dream.'
  },
  {
    id: 'black-knife',
    title: 'Black Knife',
    filename: 'Black Knife.gif',
    path: '/images/Black Knife.gif',
    size: '2.3 MB',
    soundtrack: 'Black Knife.mp3',
    trackIndex: 17,
    tags: ['Deltarune', 'Kris', 'Dark World', 'Blade'],
    description: 'Dark World silhouette holding the shadowy knife with intense ambient particle effects.'
  }
];

export const getImageById = (id) => {
  return GALLERY_IMAGES.find(img => img.id === id) || null;
};
