
export interface Song {
  id: string;
  title: string;
  thumbnail: string;
  musicUrl: string;
  duration: number; // in seconds
  artistName: string;
  color: string; // Color for background gradient
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artistName: "The Weeknd",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/blinding-lights.mp3",
    duration: 202,
    color: "#cc0000"
  },
  {
    id: "2",
    title: "Space Oddity",
    artistName: "David Bowie",
    thumbnail: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/space-oddity.mp3",
    duration: 315,
    color: "#0066cc"
  },
  {
    id: "3",
    title: "Dreams",
    artistName: "Fleetwood Mac",
    thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/dreams.mp3",
    duration: 254,
    color: "#9966cc"
  },
  {
    id: "4",
    title: "Bohemian Rhapsody",
    artistName: "Queen",
    thumbnail: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/bohemian-rhapsody.mp3",
    duration: 367,
    color: "#ffcc00"
  },
  {
    id: "5",
    title: "Hotel California",
    artistName: "Eagles",
    thumbnail: "https://images.unsplash.com/photo-1476900966873-ab290e38e3f7?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/hotel-california.mp3",
    duration: 391,
    color: "#ff6600"
  },
  {
    id: "6",
    title: "Rolling in the Deep",
    artistName: "Adele",
    thumbnail: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/rolling-in-the-deep.mp3",
    duration: 228,
    color: "#333333"
  },
  {
    id: "7",
    title: "Smells Like Teen Spirit",
    artistName: "Nirvana",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/smells-like-teen-spirit.mp3",
    duration: 301,
    color: "#006666"
  },
  {
    id: "8",
    title: "Billie Jean",
    artistName: "Michael Jackson",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/billie-jean.mp3",
    duration: 294,
    color: "#990099"
  },
  {
    id: "9",
    title: "Like a Rolling Stone",
    artistName: "Bob Dylan",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/like-a-rolling-stone.mp3",
    duration: 369,
    color: "#666633"
  },
  {
    id: "10",
    title: "Purple Haze",
    artistName: "Jimi Hendrix",
    thumbnail: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/purple-haze.mp3",
    duration: 273,
    color: "#660066"
  },
  {
    id: "11",
    title: "Imagine",
    artistName: "John Lennon",
    thumbnail: "https://images.unsplash.com/photo-1459233313842-cd392ee2c388?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/imagine.mp3",
    duration: 183,
    color: "#006699"
  },
  {
    id: "12",
    title: "Sweet Child O' Mine",
    artistName: "Guns N' Roses",
    thumbnail: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=300&auto=format&fit=crop",
    musicUrl: "https://example.com/music/sweet-child-o-mine.mp3",
    duration: 356,
    color: "#cc6600"
  }
];
