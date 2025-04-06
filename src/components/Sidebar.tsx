
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Clock, Search } from 'lucide-react';

interface SidebarProps {
  onNavigation: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigation }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigation();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-primary">Chroma Player</h1>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleNavigate('/')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/') 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary/50 text-foreground'
          }`}
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </button>

        <button
          onClick={() => handleNavigate('/search')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/search') 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary/50 text-foreground'
          }`}
        >
          <Search size={20} />
          <span className="font-medium">Search</span>
        </button>

        <button
          onClick={() => handleNavigate('/favorites')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/favorites') 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary/50 text-foreground'
          }`}
        >
          <Heart size={20} />
          <span className="font-medium">Favorites</span>
        </button>

        <button
          onClick={() => handleNavigate('/recently-played')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
            isActive('/recently-played') 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-secondary/50 text-foreground'
          }`}
        >
          <Clock size={20} />
          <span className="font-medium">Recently Played</span>
        </button>
      </div>

      <div className="mt-auto">
        <p className="text-xs text-muted-foreground">© 2025 Chroma Player</p>
      </div>
    </div>
  );
};

export default Sidebar;
