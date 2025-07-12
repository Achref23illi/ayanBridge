import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Play, Clock, BookOpen, List } from 'lucide-react';
import type { LessonSection } from '../../types/studio';

interface LessonOutlineSidebarProps {
  sections: LessonSection[];
  currentTime: number;
  onSectionClick: (sectionId: string, timestamp: number) => void;
}

const LessonOutlineSidebar: React.FC<LessonOutlineSidebarProps> = ({
  sections,
  currentTime,
  onSectionClick
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  
  // Auto-expand sections with subsections by default
  useEffect(() => {
    const sectionsWithSubsections = sections
      .filter(section => section.subsections && section.subsections.length > 0)
      .map(section => section.id);
    setExpandedSections(new Set(sectionsWithSubsections));
  }, [sections]);

  // Determine active section based on current time
  useEffect(() => {
    let activeSection = null;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      if (currentTime >= sections[i].videoTimestamp) {
        activeSection = sections[i].id;
        break;
      }
    }
    
    setActiveSectionId(activeSection);
  }, [currentTime, sections]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    if (sections.length === 0) return 0;
    const lastSection = sections[sections.length - 1];
    return lastSection.videoTimestamp + 120; // Estimate 2 minutes per section
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-xl p-6 shadow-lg sticky top-6 max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <List className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Plan de cours</h2>
            <p className="text-sm text-muted-foreground">
              {sections.length} sections • {formatTime(getTotalDuration())}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="text-primary font-medium">
              {Math.round((currentTime / getTotalDuration()) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentTime / getTotalDuration()) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Main Section */}
            <div
              onClick={() => onSectionClick(section.id, section.videoTimestamp)}
              className={`group cursor-pointer rounded-lg transition-all duration-200 ${
                activeSectionId === section.id
                  ? 'bg-primary/10 border-primary/30 border'
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Section Number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  activeSectionId === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                }`}>
                  {index + 1}
                </div>

                {/* Section Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium text-sm truncate ${
                      activeSectionId === section.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {section.title}
                    </h3>
                    {activeSectionId === section.id && (
                      <Play className="w-3 h-3 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {formatTime(section.videoTimestamp)}
                    </span>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                {section.subsections && section.subsections.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(section.id);
                    }}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    {expandedSections.has(section.id) ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Subsections */}
            <AnimatePresence>
              {section.subsections && expandedSections.has(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-8 mt-2 space-y-1">
                    {section.subsections.map((subsection, subIndex) => (
                      <motion.div
                        key={subsection.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: subIndex * 0.03 }}
                        onClick={() => onSectionClick(subsection.id, subsection.videoTimestamp)}
                        className={`group cursor-pointer rounded-lg p-2 transition-all duration-200 ${
                          activeSectionId === subsection.id
                            ? 'bg-primary/10 border-primary/30 border'
                            : 'hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                            activeSectionId === subsection.id
                              ? 'bg-primary/20 text-primary'
                              : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                          }`}>
                            {index + 1}.{subIndex + 1}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm truncate ${
                              activeSectionId === subsection.id ? 'text-primary font-medium' : 'text-foreground'
                            }`}>
                              {subsection.title}
                            </h4>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {formatTime(subsection.videoTimestamp)}
                              </span>
                            </div>
                          </div>

                          {activeSectionId === subsection.id && (
                            <Play className="w-3 h-3 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>Cliquez pour naviguer dans le contenu</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonOutlineSidebar;