import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, BookOpen, Lightbulb, Code, Image as ImageIcon, ChevronDown, ChevronUp, X, Clock } from 'lucide-react';
import type { LessonSection } from '../../types/studio';
import ReactMarkdown from 'react-markdown';

interface LessonContentProps {
  sections: LessonSection[];
  onTextSelection: (text: string, position: { x: number; y: number }) => void;
  onPracticeClick: () => void;
}

const LessonContent = forwardRef<HTMLDivElement, LessonContentProps>(
  ({ sections, onTextSelection, onPracticeClick }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [isContentCollapsed, setIsContentCollapsed] = useState(false);

    useEffect(() => {
      if (ref && typeof ref === 'object' && containerRef.current) {
        ref.current = containerRef.current;
      }
    }, [ref]);

    const toggleSectionCollapse = (sectionId: string) => {
      const newCollapsed = new Set(collapsedSections);
      if (newCollapsed.has(sectionId)) {
        newCollapsed.delete(sectionId);
      } else {
        newCollapsed.add(sectionId);
      }
      setCollapsedSections(newCollapsed);
    };

    const markSectionComplete = (sectionId: string) => {
      const newCompleted = new Set(completedSections);
      newCompleted.add(sectionId);
      setCompletedSections(newCompleted);
    };

    const estimateReadingTime = (content: string) => {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    };

    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        onTextSelection(selection.toString(), {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 10
        });
      }
    };

    const renderMarkdownContent = (content: string) => {
      return (
        <ReactMarkdown
          className="prose prose-gray max-w-none dark:prose-invert"
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-foreground leading-relaxed mb-4 select-text">
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg mb-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-foreground">{children}</div>
                </div>
              </div>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes('language-');
              if (isBlock) {
                return (
                  <div className="bg-muted rounded-lg p-4 mb-4 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Code Example</span>
                    </div>
                    <pre className="text-sm text-foreground">
                      <code>{children}</code>
                    </pre>
                  </div>
                );
              }
              return (
                <code className="bg-muted text-primary px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              );
            },
            ul: ({ children }) => (
              <ul className="space-y-2 mb-4">
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                <span className="text-foreground">{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-primary">{children}</strong>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      );
    };

    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
        onMouseUp={handleTextSelection}
      >
        {/* Course Content Header */}
        <div className="flex items-center justify-between p-4 bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              📚 Contenu du cours
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{completedSections.size}/{sections.length} sections complétées</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isContentCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {sections.map((section, index) => {
                const isCollapsed = collapsedSections.has(section.id);
                const isCompleted = completedSections.has(section.id);
                const readingTime = estimateReadingTime(section.content);

                return (
                  <motion.section
                    key={section.id}
                    id={`section-${section.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl border border-border shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden scroll-mt-24"
                  >
                    {/* Section Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur-sm">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500 text-white' : 'bg-primary/20 text-primary'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="font-semibold text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-1">
                            Section {index + 1}: {section.title || 'Contenu principal'}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {readingTime} min de lecture
                            </span>
                            <span className="bg-muted px-2 py-1 rounded-full">
                              {Math.floor(section.videoTimestamp / 60)}:{(section.videoTimestamp % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!isCompleted && (
                          <button
                            onClick={() => markSectionComplete(section.id)}
                            className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
                            title="Marquer comme terminé"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => toggleSectionCollapse(section.id)}
                          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
                          title={isCollapsed ? 'Développer' : 'Réduire'}
                        >
                          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Section Content */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-6"
                        >
                          <div className="max-w-4xl">
                            {renderMarkdownContent(section.content)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Subsections */}
                    {!isCollapsed && section.subsections && section.subsections.length > 0 && (
                      <div className="border-t border-border pt-4 mt-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-primary/50 rounded-full" />
                          Sous-sections
                        </h4>
                        <div className="space-y-3">
                          {section.subsections.map((subsection, subIndex) => (
                            <motion.div
                              key={subsection.id}
                              id={`section-${subsection.id}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.1) + (subIndex * 0.05) }}
                              className="border-l-2 border-primary/30 pl-4 py-2 bg-muted/30 rounded-r-lg"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-primary font-medium text-xs">
                                    {index + 1}.{subIndex + 1}
                                  </span>
                                </div>
                                <h5 className="font-medium text-foreground">{subsection.title}</h5>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                  {Math.floor(subsection.videoTimestamp / 60)}:{(subsection.videoTimestamp % 60).toString().padStart(2, '0')}
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground ml-8">{subsection.content}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.section>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

LessonContent.displayName = 'LessonContent';

export default LessonContent;