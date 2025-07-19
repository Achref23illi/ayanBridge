import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  GraduationCap, 
  Bot, 
  TrendingUp, 
  LogOut,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  type LucideIcon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

function Sidebar({ activeItem = 'home', onItemClick }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  
  const isExpanded = isPinned || isHovered;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'learnHub', label: 'Learn Hub', icon: GraduationCap },
    { id: 'aiStudio', label: 'AI Studio', icon: Bot },
    { id: 'clubInvest', label: 'Club Invest', icon: TrendingUp },
  ];

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside 
      className={`${isExpanded ? 'w-72' : 'w-20'} h-screen bg-secondary-light shadow-xl border-r border-white/10 flex flex-col transition-all duration-300 group z-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        overflow: isExpanded ? 'visible' : 'hidden',
        transition: 'width 300ms ease-in-out, overflow 300ms ease-in-out 150ms'
      }}
    >
      {/* Logo/Brand Section */}
      <div className="flex-shrink-0 p-3 border-b border-white/10 relative">
        {!isExpanded && !isPinned && (
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1 h-8 bg-primary/30 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        {!isExpanded ? (
          /* Collapsed Header */
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              {/* Logo Background */}
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-xl border border-primary/20 shadow-lg backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="AyanBridge Logo" 
                  className="w-8 h-8 object-contain filter brightness-110"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-10 h-10 bg-primary/10 rounded-xl blur-md -z-10"></div>
            </div>
            
            {/* Pin Toggle - Centered */}
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`p-1.5 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 ${
                isPinned ? 'text-primary' : 'text-white/60'
              }`}
              title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
            >
              <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                isPinned ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
        ) : (
          /* Expanded Header */
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Logo Background */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-xl border border-primary/20 shadow-lg backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logo.png" 
                    alt="AyanBridge Logo" 
                    className="w-10 h-10 object-contain filter brightness-110"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-12 h-12 bg-primary/10 rounded-xl blur-md -z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">AyanBridge</span>
                <span className="text-xs text-white/50">AI-Powered Platform</span>
              </div>
            </div>
            
            {/* Pin Toggle */}
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`p-2 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex-shrink-0 ${
                isPinned ? 'text-primary' : 'text-white/60'
              }`}
              title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${
                isPinned ? 'rotate-180' : ''
              }`} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-hidden">
        {isExpanded && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 mb-4">
              Navigation
            </h3>
          </div>
        )}
        <div className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center ${!isExpanded ? 'justify-center px-2 py-3' : 'px-4 py-3'} text-sm font-medium transition-all duration-200 group rounded-xl relative ${
                  activeItem === item.id
                    ? 'bg-primary/15 text-primary shadow-sm'
                    : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                {activeItem === item.id && isExpanded && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                )}
                <div className={`${!isExpanded ? 'mr-0' : 'mr-4'} p-2 rounded-lg transition-all duration-200 ${
                  activeItem === item.id 
                    ? 'bg-primary/20' 
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <IconComponent 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      activeItem === item.id ? 'text-primary' : 'text-white/60 group-hover:text-white'
                    }`}
                  />
                </div>
                {isExpanded && (
                  <span className="font-medium tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="flex-shrink-0 border-t border-white/10 p-4">
        {!isExpanded ? (
          /* Collapsed User Section */
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white/80" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary-light"></div>
            </div>
            <div className="flex flex-col space-y-1">
              <button 
                className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Expanded User Section */
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white/80" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-secondary-light"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-white/50 truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="flex space-x-1">
              <button 
                className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 