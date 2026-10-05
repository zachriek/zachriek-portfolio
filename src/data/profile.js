export const DEFAULT_AVATAR = '/sans_avatar.jpg';

export const profileData = {
  name: 'Zachrie Kurniawan',
  role: 'Web Developer & Tech Enthusiast',
  avatar: DEFAULT_AVATAR,
  bio: 'An ordinary person with an extraordinary passion for technology, especially in building intuitive and functional web applications.',
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/zachriek',
      icon: 'github'
    }
  ]
};

/**
 * Mendapatkan URL avatar profil berdasarkan soundtrack yang dimainkan.
 * Jika soundtrack memiliki gambar pada folder images, gunakan gambar tersebut.
 * Jika belum ada, gunakan avatar default saat ini (/sans_avatar.jpg).
 *
 * @param {Object|string|null} [track] - Objek soundtrack atau string path gambar
 * @returns {string} URL avatar yang sesuai
 */
export const getProfileAvatar = (track) => {
  if (!track) return profileData.avatar;
  if (typeof track === 'string') {
    return track;
  }
  if (track.image) {
    return track.image;
  }
  return profileData.avatar;
};

/**
 * Mendapatkan salinan profileData yang avatar-nya disesuaikan dengan soundtrack yang dimainkan.
 * Reusable dan konsisten untuk data layer / back-end dan front-end.
 *
 * @param {Object|string|null} [track] - Objek soundtrack yang sedang dimainkan
 * @returns {typeof profileData} Objek profileData dengan avatar yang disesuaikan
 */
export const getProfileData = (track) => {
  return {
    ...profileData,
    avatar: getProfileAvatar(track)
  };
};

/**
 * Memperbarui nilai avatar pada profileData secara langsung jika diperlukan.
 *
 * @param {Object|string|null} [track]
 * @returns {typeof profileData}
 */
export const updateProfileAvatar = (track) => {
  profileData.avatar = getProfileAvatar(track);
  return profileData;
};

