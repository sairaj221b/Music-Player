
import React, { useState, useEffect } from 'react';
import { useMusic } from '@/context/MusicContext';
import { Song } from '@/data/songs';
import { Play, Pause, Music, MoreVertical, Heart } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface SongListProps {
  songs: Song[];
  title?: string;
}

const SongList: React.FC<SongListProps> = ({ songs, title }) => {
  const { playSong, pauseSong, resumeSong, currentSong, isPlaying, isFavorite, toggleFavorite } = useMusic();
  const [animatedSongs, setAnimatedSongs] = useState<Song[]>([]);

  useEffect(() => {
    // Stagger the animation of songs loading
    const timeout = setTimeout(() => {
      setAnimatedSongs(songs);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [songs]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handlePlayPause = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        pauseSong();
      } else {
        resumeSong();
      }
    } else {
      playSong(song);
    }
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      <div className="space-y-2">
        {animatedSongs.map((song, index) => (
          <div 
            key={song.id}
            className={`song-list-item flex items-center justify-between animate-fade-in-up`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div 
                className="relative w-12 h-12 rounded-md overflow-hidden bg-secondary flex items-center justify-center"
                onClick={() => handlePlayPause(song)}
              >
                <img 
                  src={song.thumbnail} 
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause size={18} className="text-white" />
                  ) : (
                    <Play size={18} className="text-white" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{song.artistName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">{formatDuration(song.duration)}</span>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <MoreVertical size={18} className="text-muted-foreground hover:text-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleFavorite(song)}>
                    <Heart size={16} className={`mr-2 ${isFavorite(song) ? 'fill-primary text-primary' : ''}`} />
                    {isFavorite(song) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        
        {songs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Music size={48} className="mb-4 opacity-50" />
            <p>No songs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongList;
