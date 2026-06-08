export interface Track {
  src: string
  label: string
}

// Add more tracks here — drop MP3 files into public/music/
// and add an entry to this array.
const BASE = import.meta.env.BASE_URL

export const playlist: Track[] = [
  { src: `${BASE}music/track-1.mp3`, label: 'Happy Birdhday' },
  { src: `${BASE}music/mitski-losing-dogs.mp3`, label: 'I Bet on Losing Dogs' },
  { src: `${BASE}music/miaw-miaw-miaw.mp3`, label: 'miaw miaw miaw sad song' },
  // { src: '/music/track-2.mp3', label: 'River Flows in You' },
  // { src: '/music/track-3.mp3', label: 'Kiss the Rain' },
]
