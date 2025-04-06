
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SongList from '@/components/SongList';
import { songs } from '@/data/songs';
import SearchInput from '@/components/SearchInput';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center">
          <SearchIcon size={24} className="mr-3" />
          <h1 className="text-3xl font-bold">Search</h1>
        </div>
        
        <div className="mb-8">
          <SearchInput onSearch={setSearchQuery} placeholder="Search by song title or artist..." />
        </div>
        
        {searchQuery ? (
          <SongList songs={filteredSongs} title={`Results for "${searchQuery}"`} />
        ) : (
          <div className="flex flex-col items-center justify-center mt-12 text-muted-foreground">
            <SearchIcon size={48} className="mb-4 opacity-50" />
            <p className="text-lg">Search for your favorite songs</p>
            <p className="text-sm mt-2">Enter a song title or artist name to get started</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
