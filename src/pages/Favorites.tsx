
import React from 'react';
import Layout from '@/components/Layout';
import SongList from '@/components/SongList';
import { useMusic } from '@/context/MusicContext';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useMusic();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Heart size={24} className="fill-primary text-primary mr-3" />
          <h1 className="text-3xl font-bold">Favorites</h1>
        </div>
        
        <SongList songs={favorites} />
        
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 text-muted-foreground">
            <Heart size={48} className="mb-4 opacity-50" />
            <p className="text-lg">Your favorites list is empty</p>
            <p className="text-sm mt-2">Add songs to your favorites by clicking the heart icon</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
