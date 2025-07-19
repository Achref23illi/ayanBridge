import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Play, Pause, MessageCircle, Settings, Brain, Minimize2, Maximize2, Pin, PinOff, X, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
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
  const [isVideoSticky, setIsVideoSticky] = useState(false);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  const [isVideoPinned, setIsVideoPinned] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pipSize, setPipSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [pipDimensions, setPipDimensions] = useState({ width: 400, height: 225 });
  const [pipPosition, setPipPosition] = useState({ x: window.innerWidth - 420, y: 80 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky video
  useEffect(() => {
    const handleScroll = () => {
      if (videoContainerRef.current && !isVideoPinned) {
        const rect = videoContainerRef.current.getBoundingClientRect();
        const shouldBeSticky = rect.top < -100; // When video scrolls 100px past top
        setIsVideoSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoPinned]);

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

  // Synchronize video playback between main and PiP videos
  const syncVideoPlayback = (action: 'play' | 'pause') => {
    const videos = [videoRef.current, pipVideoRef.current];
    videos.forEach(video => {
      if (video) {
        if (action === 'play') {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  };

  // Handle play/pause from main video
  const handleMainVideoPlay = () => {
    setIsPlaying(true);
    syncVideoPlayback('play');
  };

  const handleMainVideoPause = () => {
    setIsPlaying(false);
    syncVideoPlayback('pause');
  };

  // Handle play/pause from PiP video
  const handlePipVideoPlay = () => {
    setIsPlaying(true);
    syncVideoPlayback('play');
  };

  const handlePipVideoPause = () => {
    setIsPlaying(false);
    syncVideoPlayback('pause');
  };

  // Handle time sync when one video seeks
  const handleVideoSeek = (time: number) => {
    const videos = [videoRef.current, pipVideoRef.current];
    videos.forEach(video => {
      if (video && Math.abs(video.currentTime - time) > 0.5) {
        video.currentTime = time;
      }
    });
  };

  // Handle PiP drag start
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within screen bounds
      const maxX = window.innerWidth - pipDimensions.width;
      const maxY = window.innerHeight - pipDimensions.height;
      
      setPipPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY))
      });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setIsDragging(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'move';
    document.body.style.userSelect = 'none';
  };

  // Handle PiP resize
  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = pipDimensions.width;
    const startHeight = pipDimensions.height;
    const startPosX = pipPosition.x;
    const startPosY = pipPosition.y;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const minWidth = 200;
      const minHeight = 120;
      const maxWidth = window.innerWidth - 40;
      const maxHeight = window.innerHeight - 40;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newPosX = startPosX;
      let newPosY = startPosY;
      
      // Resize based on corner
      switch (corner) {
        case 'bottom-right':
          newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
          newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
          break;
        case 'bottom-left':
          newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
          newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
          newPosX = startPosX + (startWidth - newWidth);
          break;
        case 'top-right':
          newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
          newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
          newPosY = startPosY + (startHeight - newHeight);
          break;
        case 'top-left':
          newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
          newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
          newPosX = startPosX + (startWidth - newWidth);
          newPosY = startPosY + (startHeight - newHeight);
          break;
      }
      
      setPipDimensions({ width: newWidth, height: newHeight });
      setPipPosition({ x: newPosX, y: newPosY });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setIsResizing(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'nw-resize';
    document.body.style.userSelect = 'none';
  };

  // Quick resize buttons
  const handleQuickResize = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        setPipDimensions({ width: 300, height: 169 });
        break;
      case 'medium':
        setPipDimensions({ width: 450, height: 253 });
        break;
      case 'large':
        setPipDimensions({ width: 600, height: 338 });
        break;
    }
  };

  // Get PiP size classes (for preset sizes)
  const getPipSizeClasses = () => {
    switch (pipSize) {
      case 'small':
        return 'w-64 h-36';
      case 'large':
        return 'w-96 h-54';
      default:
        return 'w-80 h-45';
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar - Zone C */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border p-6">
              <LessonOutlineSidebar
                sections={lessonData.sections}
                currentTime={currentTime}
                onSectionClick={handleSectionClick}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video Player - Zone A */}
            <div ref={videoContainerRef} className="relative">
              <div className={`bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border overflow-hidden transition-all duration-300 ${
                isVideoMinimized ? 'h-16' : ''
              }`}>
                {/* Video Header Controls */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    🎥 Vidéo du cours
                    {isVideoSticky && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Épinglé</span>}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsVideoPinned(!isVideoPinned)}
                      className={`p-2 rounded-lg transition-colors ${
                        isVideoPinned 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground'
                      }`}
                      title={isVideoPinned ? 'Détacher la vidéo' : 'Épingler la vidéo'}
                    >
                      {isVideoPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsVideoMinimized(!isVideoMinimized)}
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
                      title={isVideoMinimized ? 'Agrandir la vidéo' : 'Réduire la vidéo'}
                    >
                      {isVideoMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Video Content */}
                {!isVideoMinimized && (
                  <LessonVideoPlayer
                    ref={videoRef}
                    videoUrl={lessonData.videoUrl}
                    transcript={lessonData.transcript}
                    currentTime={currentTime}
                    onTimeUpdate={handleVideoTimeUpdate}
                    onPlay={handleMainVideoPlay}
                    onPause={handleMainVideoPause}
                    onSeek={handleVideoSeek}
                  />
                )}
              </div>
            </div>

            {/* Picture-in-Picture Video Overlay */}
            <AnimatePresence>
              {(isVideoSticky || isVideoPinned) && !isVideoMinimized && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed bg-black rounded-xl shadow-2xl border border-gray-700/50 z-50 overflow-hidden backdrop-blur-sm"
                  style={{
                    width: `${pipDimensions.width}px`,
                    height: `${pipDimensions.height}px`,
                    left: `${pipPosition.x}px`,
                    top: `${pipPosition.y}px`,
                    transition: (isResizing || isDragging) ? 'none' : 'all 0.3s ease'
                  }}
                >
                  {/* Draggable header */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm cursor-move z-20"
                    onMouseDown={handleDragStart}
                  >
                    <div className="flex items-center justify-between px-3 py-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-white/80 font-medium">Vidéo en cours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Quick resize buttons */}
                        <div className="flex bg-black/40 rounded px-1 gap-0.5">
                          <button
                            onClick={() => handleQuickResize('small')}
                            className="px-1.5 py-0.5 text-xs text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors"
                            title="Petite taille"
                          >
                            S
                          </button>
                          <button
                            onClick={() => handleQuickResize('medium')}
                            className="px-1.5 py-0.5 text-xs text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors"
                            title="Taille moyenne"
                          >
                            M
                          </button>
                          <button
                            onClick={() => handleQuickResize('large')}
                            className="px-1.5 py-0.5 text-xs text-white/70 hover:text-white hover:bg-white/20 rounded transition-colors"
                            title="Grande taille"
                          >
                            L
                          </button>
                        </div>
                        
                        {/* Close button */}
                        <button
                          onClick={() => {
                            setIsVideoSticky(false);
                            setIsVideoPinned(false);
                          }}
                          className="p-1 rounded-full bg-black/40 hover:bg-red-500/80 text-white/70 hover:text-white transition-colors"
                          title="Fermer la vidéo flottante"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video content */}
                  <div className="relative w-full h-full pt-8">
                    <video
                      ref={pipVideoRef}
                      src={lessonData.videoUrl}
                      className="w-full h-full object-cover"
                      onTimeUpdate={handleVideoTimeUpdate}
                      onPlay={handlePipVideoPlay}
                      onPause={handlePipVideoPause}
                      onSeeked={() => {
                        if (pipVideoRef.current && videoRef.current) {
                          const timeDiff = Math.abs(pipVideoRef.current.currentTime - videoRef.current.currentTime);
                          if (timeDiff > 0.5) {
                            videoRef.current.currentTime = pipVideoRef.current.currentTime;
                          }
                        }
                      }}
                    />
                    
                    {/* Play/pause overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <button
                        onClick={() => {
                          if (isPlaying) {
                            syncVideoPlayback('pause');
                          } else {
                            syncVideoPlayback('play');
                          }
                        }}
                        className="bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 hover:opacity-100 pointer-events-auto"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Resize handles - all corners */}
                  {/* Top-left */}
                  <div 
                    className="absolute top-8 left-0 w-8 h-8 cursor-nw-resize z-10 group"
                    onMouseDown={(e) => handleResizeStart(e, 'top-left')}
                    title="Redimensionner depuis le coin supérieur gauche"
                  >
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/50 group-hover:border-white/90 rounded-tl-sm transition-colors"></div>
                  </div>

                  {/* Top-right */}
                  <div 
                    className="absolute top-8 right-0 w-8 h-8 cursor-ne-resize z-10 group"
                    onMouseDown={(e) => handleResizeStart(e, 'top-right')}
                    title="Redimensionner depuis le coin supérieur droit"
                  >
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/50 group-hover:border-white/90 rounded-tr-sm transition-colors"></div>
                  </div>

                  {/* Bottom-left */}
                  <div 
                    className="absolute bottom-0 left-0 w-8 h-8 cursor-sw-resize z-10 group"
                    onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
                    title="Redimensionner depuis le coin inférieur gauche"
                  >
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/50 group-hover:border-white/90 rounded-bl-sm transition-colors"></div>
                  </div>

                  {/* Bottom-right */}
                  <div 
                    className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize z-10 group"
                    onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
                    title="Redimensionner depuis le coin inférieur droit"
                  >
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/50 group-hover:border-white/90 rounded-br-sm transition-colors"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lesson Content - Zone B */}
            <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border p-6">
              <LessonContent
                ref={contentRef}
                sections={lessonData.sections}
                onTextSelection={handleTextSelection}
                onPracticeClick={() => setShowPractice(true)}
              />
            </div>

            {/* AI Chat - Zone D */}
            <div className="bg-accent/20 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-border">
              <div className="p-4 border-b border-border bg-accent/10">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  🤖 Assistant IA du cours
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">En direct</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Posez vos questions sur le contenu du cours
                </p>
              </div>
              <div className="p-6">
                <LessonAIChat lessonTitle={lessonData.title} />
              </div>
              
              {/* Congratulations Section */}
              <div className="p-6 border-t border-border bg-accent/5">
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
                      onClick={() => setShowPractice(true)}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
                    >
                      J'ai bien compris
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                      Relire la leçon
                    </button>
                  </div>
                </div>
              </div>
            </div>
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