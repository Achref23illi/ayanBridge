import React, { useState } from 'react';
import { Book, Play, Radio, GraduationCap } from 'lucide-react';
import EbooksSection from './marketplace/EbooksSection';
import VideosSection from './marketplace/VideosSection';
import LivesSection from './marketplace/LivesSection';
import FormationsSection from './marketplace/FormationsSection';

const Marketplace: React.FC = () => {
  const [activeSection, setActiveSection] = useState('ebooks');

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
    <div className="h-full flex bg-secondary">
      {/* Sub-sidebar */}
      <div className="w-64 bg-secondary-light border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Marketplace</h2>
          <p className="text-white/60 text-sm mt-1">Explore learning resources</p>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl ${
                    activeSection === section.id
                      ? 'bg-primary/15 text-primary border-l-4 border-primary'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 mr-3 ${
                    activeSection === section.id ? 'text-primary' : 'text-white/60'
                  }`} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Marketplace; 