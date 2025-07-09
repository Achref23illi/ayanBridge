import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState('home');

  const handleSidebarItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <div className="w-full flex h-screen bg-secondary overflow-hidden">
      <Sidebar activeItem={activeItem} onItemClick={handleSidebarItemClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Dashboard Header */}
        <header className="bg-secondary-light shadow-sm border-b border-white/10 flex-shrink-0">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 