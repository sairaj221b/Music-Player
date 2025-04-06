
import React from 'react';
import Layout from '@/components/Layout';
import SongList from '@/components/SongList';
import { useMusic } from '@/context/MusicContext';
import { Clock } from 'lucide-react';

const RecentlyPlayed = () => {
  const { recentlyPlayed } = useMusic();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Clock size={24} className="mr-3" />
          <h1 className="text-3xl font-bold">Recently Played</h1>
        </div>
        
        <SongList songs={recentlyPlayed} />
        
        {recentlyPlayed.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 text-muted-foreground">
            <Clock size={48} className="mb-4 opacity-50" />
            <p className="text-lg">You haven't played any songs yet</p>
            <p className="text-sm mt-2">Play a song to see your history here</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecentlyPlayed;
