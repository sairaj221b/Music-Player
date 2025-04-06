
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Song, songs } from '@/data/songs';
import { toast } from '@/hooks/use-toast';

interface MusicContextProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  duration: number;
  favorites: Song[];
  recentlyPlayed: Song[];
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setProgress: (value: number) => void;
  toggleFavorite: (song: Song) => void;
  isFavorite: (song: Song) => boolean;
  setVolume: (value: number) => void;
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime);
      }
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    setAudioElement(audio);
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', () => {});
    };
  }, []);
  
  // Load saved favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
    
    const storedRecentlyPlayed = sessionStorage.getItem('recentlyPlayed');
    if (storedRecentlyPlayed) {
      try {
        const parsedRecentlyPlayed = JSON.parse(storedRecentlyPlayed);
        setRecentlyPlayed(parsedRecentlyPlayed);
      } catch (error) {
        console.error('Failed to parse recently played from sessionStorage', error);
      }
    }
  }, []);
  
  // Save favorites to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Save recently played to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);
  
  // Update audio source when current song changes
  useEffect(() => {
    if (audioElement && currentSong) {
      audioElement.src = currentSong.musicUrl;
      audioElement.load();
      
      if (isPlaying) {
        const playPromise = audioElement.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
          });
        }
      }
      
      // Update recently played
      const newRecentlyPlayed = [currentSong, ...recentlyPlayed.filter(song => song.id !== currentSong.id)].slice(0, 10);
      setRecentlyPlayed(newRecentlyPlayed);
    }
  }, [currentSong, audioElement]);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume;
    }
  }, [volume, audioElement]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    if (audioElement && isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const resumeSong = () => {
    if (audioElement && !isPlaying && currentSong) {
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error('Playback error:', error);
        });
      }
    }
  };

  const setProgressManually = (value: number) => {
    if (audioElement) {
      audioElement.currentTime = value;
      setProgress(value);
    }
  };

  const nextSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      playSong(songs[nextIndex]);
    } else if (songs.length > 0) {
      playSong(songs[0]);
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      playSong(songs[prevIndex]);
    } else if (songs.length > 0) {
      playSong(songs[songs.length - 1]);
    }
  };

  const toggleFavorite = (song: Song) => {
    const isFav = favorites.some(fav => fav.id === song.id);
    
    if (isFav) {
      setFavorites(favorites.filter(fav => fav.id !== song.id));
      toast({
        title: "Removed from favorites",
        description: `"${song.title}" by ${song.artistName} removed from favorites`,
      });
    } else {
      setFavorites([...favorites, song]);
      toast({
        title: "Added to favorites",
        description: `"${song.title}" by ${song.artistName} added to favorites`,
      });
    }
  };

  const isFavorite = (song: Song) => {
    return favorites.some(fav => fav.id === song.id);
  };

  const setVolumeLevel = (value: number) => {
    setVolume(Math.max(0, Math.min(1, value)));
  };

  const contextValue: MusicContextProps = {
    currentSong,
    isPlaying,
    progress,
    volume,
    duration,
    favorites,
    recentlyPlayed,
    playSong,
    pauseSong,
    resumeSong,
    nextSong,
    prevSong,
    setProgress: setProgressManually,
    toggleFavorite,
    isFavorite,
    setVolume: setVolumeLevel,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextProps => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
