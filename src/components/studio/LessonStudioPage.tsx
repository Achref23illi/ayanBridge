import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Play, MessageCircle, Settings, Brain } from 'lucide-react';
import type { LessonData, FileUploadState } from '../../types/studio';
import { mockLessonData } from '../../data/mockLesson';
import LessonVideoPlayer from './LessonVideoPlayer';
import LessonContent from './LessonContent';
import LessonOutlineSidebar from './LessonOutlineSidebar';
import LessonAIChat from './LessonAIChat';
import ContextualHelperMenu from './ContextualHelperMenu';
import PracticeExercises from './PracticeExercises';
import TrainerModePanel from './TrainerModePanel';

interface LessonStudioPageProps {
  className?: string;
}

const LessonStudioPage: React.FC<LessonStudioPageProps> = ({ className }) => {
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [showPractice, setShowPractice] = useState(false);
  const [isTrainerMode, setIsTrainerMode] = useState(false);
  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (file: File) => {
    setUploadState({
      isUploading: true,
      progress: 0,
      fileName: file.name
    });

    // Simulate file processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadState(prev => ({ ...prev, progress: i }));
    }

    // Load mock lesson data after "processing"
    setTimeout(() => {
      setLessonData(mockLessonData);
      setUploadState({
        isUploading: false,
        progress: 100,
        fileName: file.name
      });
    }, 500);
  };

  const handleTextSelection = (text: string, position: { x: number; y: number }) => {
    if (text.trim()) {
      setSelectedText(text);
      setSelectionPosition(position);
    } else {
      setSelectedText('');
      setSelectionPosition(null);
    }
  };

  const handleSectionClick = (sectionId: string, timestamp: number) => {
    setCurrentTime(timestamp);
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp;
    }
    
    // Scroll to section in content
    const element = document.getElementById(`section-${sectionId}`);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleVideoTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  if (!lessonData) {
    return (
      <div className={`min-h-screen bg-background p-6 ${className}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header with Upload */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Brain className="w-8 h-8 text-primary" />
                  Studio Professeur
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-normal">
                    Powered by AI
                  </span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Transformez vos documents en leçons interactives enrichies par l'IA
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsTrainerMode(!isTrainerMode)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isTrainerMode 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Mode Formateur
                </button>
              </div>
            </div>

            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card/50"
            >
              {uploadState.isUploading ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                  <h3 className="text-lg font-semibold">Traitement en cours...</h3>
                  <p className="text-muted-foreground">
                    Analyse du document : {uploadState.fileName}
                  </p>
                  <div className="w-full max-w-xs mx-auto bg-secondary rounded-full h-2">
                    <motion.div 
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadState.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {uploadState.progress}% - Génération de la vidéo et des exercices...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Déposez votre document ici</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Glissez-déposez un fichier Word, PDF ou PowerPoint pour générer automatiquement 
                    une leçon interactive avec vidéo, exercices et chat IA.
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <label className="px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Choisir un fichier
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="hidden"
                      />
                    </label>
                    
                    <button
                      onClick={() => setLessonData(mockLessonData)}
                      className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Demo avec contenu exemple
                    </button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Formats supportés: PDF, Word (.doc, .docx), PowerPoint (.ppt, .pptx)
                  </p>
                </div>
              )}
            </motion.div>

            {/* Trainer Mode Panel */}
            <AnimatePresence>
              {isTrainerMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <TrainerModePanel onLoadTemplate={(template) => setLessonData(mockLessonData)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showPractice) {
    return (
      <PracticeExercises 
        exercises={lessonData.exercises}
        onComplete={() => setShowPractice(false)}
        onBack={() => setShowPractice(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Brain className="w-6 h-6 text-primary" />
              {lessonData.title}
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-normal">
                Powered by AI
              </span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsTrainerMode(!isTrainerMode)}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                isTrainerMode 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Settings className="w-4 h-4" />
              Mode Formateur
            </button>
            
            <button
              onClick={() => setLessonData(null)}
              className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
            >
              Nouveau document
            </button>
          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Zone C */}
          <div className="lg:col-span-1">
            <LessonOutlineSidebar
              sections={lessonData.sections}
              currentTime={currentTime}
              onSectionClick={handleSectionClick}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player - Zone A */}
            <LessonVideoPlayer
              ref={videoRef}
              videoUrl={lessonData.videoUrl}
              transcript={lessonData.transcript}
              currentTime={currentTime}
              onTimeUpdate={handleVideoTimeUpdate}
            />

            {/* Lesson Content - Zone B */}
            <LessonContent
              ref={contentRef}
              sections={lessonData.sections}
              onTextSelection={handleTextSelection}
              onPracticeClick={() => setShowPractice(true)}
            />

            {/* AI Chat - Zone D */}
            <LessonAIChat lessonTitle={lessonData.title} />
          </div>
        </div>

        {/* Contextual Menu - Zone E */}
        <AnimatePresence>
          {selectedText && selectionPosition && (
            <ContextualHelperMenu
              selectedText={selectedText}
              position={selectionPosition}
              onClose={() => {
                setSelectedText('');
                setSelectionPosition(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Trainer Mode Panel */}
        <AnimatePresence>
          {isTrainerMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
              <TrainerModePanel onLoadTemplate={(template) => setLessonData(mockLessonData)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonStudioPage;