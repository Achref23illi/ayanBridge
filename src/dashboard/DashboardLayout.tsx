import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import Marketplace from './Marketplace';
import LearnHub from './LearnHub';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState('home');

  const handleSidebarItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    switch (activeItem) {
      case 'home':
        return <Home />;
      case 'marketplace':
        return <Marketplace />;
      case 'learnHub':
        return <LearnHub />;
      case 'aiStudio':
        return <div className="p-8"><h1 className="text-2xl font-bold text-white">AI Studio - Coming Soon</h1></div>;
      case 'clubInvest':
        return <div className="p-8"><h1 className="text-2xl font-bold text-white">Club Invest - Coming Soon</h1></div>;
      default:
        return <Home />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeItem) {
      case 'home':
        return 'Dashboard';
      case 'marketplace':
        return 'Marketplace';
      case 'learnHub':
        return 'Learn Hub';
      case 'aiStudio':
        return 'AI Studio';
      case 'clubInvest':
        return 'Club Invest';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="w-full flex h-screen bg-secondary overflow-hidden">
      <Sidebar activeItem={activeItem} onItemClick={handleSidebarItemClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Dashboard Header */}
        <header className="bg-secondary-light shadow-sm border-b border-white/10 flex-shrink-0">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">{getHeaderTitle()}</h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 