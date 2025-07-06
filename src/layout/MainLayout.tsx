import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <Header />
      <main className="w-full flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 