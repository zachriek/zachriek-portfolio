export const TRACKS = [
  { title: "Ghost Fight", file: "10. Ghost Fight.mp3", image: "/images/10. Ghost Fight.gif" },
  { title: "sans.", file: "15. sans..mp3", image: "/images/15. sans..gif" },
  { title: "Shop", file: "23. Shop.mp3", image: "/images/23. Shop.gif" },
  { title: "Spear of Justice", file: "46. Spear of Justice.mp3", image: "/images/46. Spear of Justice.gif" },
  { title: "It's Showtime!", file: "49. It's Showtime!.mp3", image: "/images/49. It's Showtime!.gif" },
  { title: "Spider Dance", file: "59. Spider Dance.mp3", image: null },
  { title: "Death By Glamour", file: "68. Death By Glamour.mp3", image: "/images/68. Death By Glamour.gif" },
  { title: "Undertale", file: "71. Undertale.mp3", image: null },
  { title: "ASGORE", file: "77. ASGORE.mp3", image: null },
  { title: "Finale", file: "80. Finale.mp3", image: null },
  { title: "Fallen Down (Reprise)", file: "85. Fallen Down (Reprise).mp3", image: null },
  { title: "Hopes And Dreams", file: "87. Hopes And Dreams.mp3", image: null },
  { title: "Battle Against A True Hero", file: "98. Battle Against A True Hero.mp3", image: "/images/98. Battle Against A True Hero.gif" },
  { title: "MEGALOVANIA", file: "100. MEGALOVANIA.mp3", image: "/images/100. MEGALOVANIA.gif" },
  { title: "THE WORLD REVOLVING", file: "THE WORLD REVOLVING.mp3", image: null },
  { title: "Attack of the Killer Queen", file: "Attack of the Killer Queen.mp3", image: null },
  { title: "BIG SHOT", file: "BIG SHOT.mp3", image: "/images/BIG SHOT.gif" },
  { title: "Black Knife", file: "Black Knife.mp3", image: "/images/Black Knife.gif" }
];

/**
 * Helper reusable untuk mengambil URL gambar dari suatu soundtrack.
 * @param {Object|string} track
 * @returns {string|null}
 */
export const getTrackImage = (track) => {
  if (!track) return null;
  if (typeof track === 'string') {
    const found = TRACKS.find(t => t.file === track || t.title === track);
    return found?.image || null;
  }
  return track.image || null;
};

