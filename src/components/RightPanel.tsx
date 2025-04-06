import React, { useState } from 'react';
import { useMusic } from '@/context/MusicContext';
import { Heart, Clock, Music, MoreVertical, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const RightPanel = () => {
  const { 
    currentSong, 
    isPlaying, 
    progress, 
    duration, 
    volume,
    playSong, 
    pauseSong, 
    resumeSong, 
    nextSong, 
    prevSong, 
    setProgress,
    toggleFavorite,
    isFavorite,
    setVolume
  } = useMusic();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleProgressChange = (values: number[]) => {
    setProgress(values[0]);
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  if (!currentSong) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400 p-6 bg-gradient-to-b from-gray-900 to-black">
        <Music size={48} className="mb-4 opacity-50" />
        <p className="text-lg">No song selected</p>
        <p className="text-sm mt-2">Select a song to see details</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black">
      {/* Main Content with custom padding */}
      <div 
        className="flex-1 overflow-auto"
        style={{
          paddingLeft: '102px',
          paddingRight: '59px',
          paddingBottom: '59px'
        }}
      >
        <h2 className="text-xl font-bold mb-6 text-white">Now Playing</h2>
        
        <div className="aspect-square w-full max-w-[280px] mx-auto mb-6 rounded-md overflow-hidden shadow-lg">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-white">{currentSong.title}</h2>
            <p className="text-lg text-gray-400">{currentSong.artistName}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="text-gray-400 hover:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
              <DropdownMenuItem 
                onClick={() => toggleFavorite(currentSong)}
                className="focus:bg-gray-700"
              >
                <Heart 
                  size={18} 
                  className={`mr-2 ${isFavorite(currentSong) ? 'text-green-500 fill-green-500' : ''}`} 
                />
                {isFavorite(currentSong) ? 'Remove from Favorites' : 'Add to Favorites'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mb-8">
          <Button
            onClick={() => toggleFavorite(currentSong)}
            variant={isFavorite(currentSong) ? "default" : "outline"}
            className={`w-full flex items-center gap-2 ${
              isFavorite(currentSong) 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "border-gray-600 hover:bg-gray-800 text-white"
            }`}
          >
            <Heart 
              size={18} 
              className={isFavorite(currentSong) ? "fill-white" : ""} 
            />
            {isFavorite(currentSong) ? "Saved to Favorites" : "Save to Favorites"}
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-400">
            <span>Duration</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>
      </div>

      {/* Integrated Music Player */}
      <div className="w-full bg-black/90 backdrop-blur-lg border-t border-gray-800 p-4" style={{
    paddingLeft: '102px',
    paddingRight: '59px',
    paddingBottom: '59px',
  }}>
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-400">{formatTime(progress)}</span>
          <Slider
            value={[progress]}
            min={0}
            max={duration || 100}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1 mx-2"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center gap-4 w-1/4 min-w-[200px]">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-800">
              <img 
                src={currentSong.thumbnail} 
                alt={currentSong.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center justify-center gap-4"style={{
    paddingRight: '43px',
    paddingLeft: '0px',
  }}>
              <button onClick={prevSong} className="p-2 text-gray-400 hover:text-white">
                <SkipBack size={20} />
              </button>

              <button 
                onClick={handlePlayPause} 
                className="p-2 rounded-full bg-white hover:bg-gray-300"
              >
                {isPlaying ? <Pause size={24} className="text-black" /> : <Play size={24} className="text-black" />}
              </button>

              <button onClick={nextSong} className="p-2 text-gray-400 hover:text-white">
                <SkipForward size={20} />
              </button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-end gap-2 w-1/4">
            <button onClick={() => setVolume(volume === 0 ? 0.5 : 0)}>
              {volume === 0 ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-gray-400" />}
            </button>
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;