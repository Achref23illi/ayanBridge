import React, { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, BookOpen, Lightbulb, Code, Image as ImageIcon } from 'lucide-react';
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

    useEffect(() => {
      if (ref && typeof ref === 'object' && containerRef.current) {
        ref.current = containerRef.current;
      }
    }, [ref]);

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
        className="bg-card rounded-xl p-8 shadow-lg"
        onMouseUp={handleTextSelection}
      >
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="scroll-mt-24"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">{index + 1}</span>
                </div>
                <div className="h-px bg-border flex-1" />
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {Math.floor(section.videoTimestamp / 60)}:{(section.videoTimestamp % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Section Content */}
              <div className="pl-11">
                {renderMarkdownContent(section.content)}
              </div>

              {/* Subsections */}
              {section.subsections && section.subsections.length > 0 && (
                <div className="pl-11 mt-6">
                  <div className="space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <motion.div
                        key={subsection.id}
                        id={`section-${subsection.id}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (subIndex * 0.05) }}
                        className="border-l-2 border-primary/30 pl-6 py-2"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium text-xs">
                              {index + 1}.{subIndex + 1}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground">{subsection.title}</h4>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {Math.floor(subsection.videoTimestamp / 60)}:{(subsection.videoTimestamp % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <div className="text-muted-foreground">{subsection.content}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}

          {/* Completion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sections.length * 0.1 }}
            className="border-t border-border pt-8"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Félicitations ! 🎉
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Vous avez terminé la leçon. Êtes-vous prêt à tester vos connaissances 
                  avec des exercices pratiques ?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onPracticeClick}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
                >
                  J'ai bien compris
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Relire la leçon
                </button>
              </div>

              {/* Learning Progress Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-700 dark:text-green-400">Concepts acquis</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Types d'apprentissage, algorithmes de base
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-700 dark:text-blue-400">Pratique recommandée</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Implémenter une régression linéaire
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-700 dark:text-purple-400">Prochaine étape</span>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-300">
                    Approfondir avec TensorFlow
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

LessonContent.displayName = 'LessonContent';

export default LessonContent;