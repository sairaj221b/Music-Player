import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMusic } from '@/context/MusicContext';
// import MusicPlayer from '@/components/MusicPlayer';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import { Menu, PanelRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentSong } = useMusic();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const location = useLocation();

  const getBackgroundStyle = () => {
    return {
      background: currentSong
        ? `linear-gradient(135deg, ${currentSong.color}aa, hsl(244, 55%, 15%))`
        : 'linear-gradient(135deg, hsl(262, 83%, 28%), hsl(244, 55%, 15%))',
      transition: 'background 1.5s ease',
    };
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-dynamic" style={getBackgroundStyle()}>
      <div className="flex flex-1 overflow-hidden md:flex-row flex-col">
        
        {/* Mobile Header */}
        <div className="md:hidden w-full flex items-center justify-between px-4 py-3 z-10">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full hover:bg-white/10 transition">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">
            {location.pathname === '/' ? 'Home' : location.pathname === '/favorites' ? 'Favorites' : 'Recently Played'}
          </h1>
          <Sheet open={rightPanelOpen} onOpenChange={setRightPanelOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-white/10 transition">
                <PanelRight className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] bg-card/90 backdrop-blur-lg">
              <RightPanel />
            </SheetContent>
          </Sheet>
        </div>

        {/* Sidebar (Mobile) */}
        <div className={`fixed inset-0 z-50 md:hidden transition-all transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-card p-4 overflow-auto">
            <Sidebar onNavigation={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 h-full bg-card/70 backdrop-blur-md overflow-auto">
          <Sidebar onNavigation={() => {}} />
        </div>

        {/* Main Content */}
        <div className="hidden md:flex flex-col w-1/2 overflow-hidden relative">
          <main className="flex-1 overflow-auto px-4 pb-24 pt-4 md:pt-8">
            {children}
          </main>
        </div>

        {/* Right Panel + Music Player */}
        <div className="hidden md:flex flex-col w-1/2 bg-card/70 backdrop-blur-md border-l border-border">
          <div className="flex-1 overflow-auto">
            <RightPanel />
          </div>
          {/* {currentSong && (
            <div className="border-t border-border">
              <MusicPlayer />
            </div>
          )} */}
        </div>

      </div>

      {/* Mobile Music Player */}
      {/* {currentSong && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <MusicPlayer />
        </div>
      )} */}
    </div>
  );
};

export default Layout;