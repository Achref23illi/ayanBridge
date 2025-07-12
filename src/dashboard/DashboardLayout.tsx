import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import Marketplace from './Marketplace';
import LearnHub from './LearnHub';
import ClubInvest from './ClubInvest';
import AIStudio from './AIStudio';
import { CartProvider } from '../contexts/CartContext';
import CartSidebar from '../components/CartSidebar';

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
        return <AIStudio />;
      case 'clubInvest':
        return <ClubInvest />;
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
    <CartProvider>
      <div className="w-full flex h-screen bg-secondary overflow-hidden">
        <Sidebar activeItem={activeItem} onItemClick={handleSidebarItemClick} isInitiallyCollapsed={activeItem === 'aiStudio'} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Dashboard Header - Hide for AI Studio */}
          {activeItem !== 'aiStudio' && (
            <header className="bg-secondary-light shadow-sm border-b border-white/10 flex-shrink-0">
              <div className="px-8 py-6">
                <h1 className="text-2xl font-bold text-white tracking-tight">{getHeaderTitle()}</h1>
              </div>
            </header>
          )}

          {/* Dashboard Content */}
          <main className={activeItem === 'aiStudio' ? 'flex-1 h-full' : 'flex-1'}>
            {renderContent()}
          </main>
        </div>

        {/* Cart Sidebar */}
        <CartSidebar />
      </div>
    </CartProvider>
  );
};

export default DashboardLayout; 