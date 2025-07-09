import React, { useState } from 'react';
import { Book, Play, Radio, GraduationCap, ShoppingCart } from 'lucide-react';
import EbooksSection from './marketplace/EbooksSection';
import VideosSection from './marketplace/VideosSection';
import LivesSection from './marketplace/LivesSection';
import FormationsSection from './marketplace/FormationsSection';
import { useCart } from '../contexts/CartContext';

const Marketplace: React.FC = () => {
  const [activeSection, setActiveSection] = useState('ebooks');
  const { openCart, getCartCount } = useCart();

  const sections = [
    {
      id: 'ebooks',
      label: 'E-books',
      icon: Book,
      component: EbooksSection
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: Play,
      component: VideosSection
    },
    {
      id: 'lives',
      label: 'Lives',
      icon: Radio,
      component: LivesSection
    },
    {
      id: 'formations',
      label: 'Formations',
      icon: GraduationCap,
      component: FormationsSection
    }
  ];

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || EbooksSection;

  return (
    <div className="h-full flex flex-col bg-secondary">
      {/* Header */}
      <div className="flex-shrink-0 bg-secondary-light border-b border-white/10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Marketplace</h2>
              <p className="text-white/60 text-sm mt-1">Explore learning resources and expand your knowledge</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-white text-lg font-semibold">12,847</div>
                <div className="text-white/50 text-xs">Total Resources</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-right">
                <div className="text-primary text-lg font-semibold">3,456</div>
                <div className="text-white/50 text-xs">Your Library</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 rounded-xl relative ${
                    activeSection === section.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 mr-2 ${
                    activeSection === section.id ? 'text-white' : 'text-white/60'
                  }`} />
                  <span>{section.label}</span>
                  {activeSection === section.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-2 h-2 bg-primary rotate-45 transform origin-center"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Marketplace; 