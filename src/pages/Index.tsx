
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SongList from '@/components/SongList';
import { songs } from '@/data/songs';
import { useMusic } from '@/context/MusicContext';
import SearchInput from '@/components/SearchInput';

const Index = () => {
  const { recentlyPlayed } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <SearchInput onSearch={setSearchQuery} />
        </div>
        
        {searchQuery ? (
          <SongList songs={filteredSongs} title="Search Results" />
        ) : (
          <>
            {recentlyPlayed.length > 0 && (
              <div className="mb-12">
                <SongList songs={recentlyPlayed} title="Recently Played" />
              </div>
            )}
            
            <SongList songs={songs} title="All Songs" />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
