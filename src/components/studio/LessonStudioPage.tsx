import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Play, Pause, Settings, Brain, Minimize2, Maximize2, Pin, PinOff, X, CheckCircle, ArrowRight, GraduationCap, Briefcase, Edit, Globe, Save, X as CloseIcon } from 'lucide-react';
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

type CourseType = 'educational' | 'non-educational' | null;
type CreationStep = 'course-type' | 'file-upload' | 'trainer-mode' | 'generating';

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

  const [pipDimensions, setPipDimensions] = useState({ width: 400, height: 225 });
  const [pipPosition, setPipPosition] = useState({ x: window.innerWidth - 420, y: 80 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0
  });

  // New state for course creation flow
  const [courseType, setCourseType] = useState<CourseType>(null);
  const [currentStep, setCurrentStep] = useState<CreationStep>('course-type');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // New state for edit and publish functionality
  const [isEditing, setIsEditing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [editedContent, setEditedContent] = useState('');

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
    setSelectedFile(file);
    setCurrentStep('trainer-mode');
  };

  const handleGenerateCourse = async () => {
    if (!selectedFile) return;
    
    setCurrentStep('generating');
    setUploadState({
      isUploading: true,
      progress: 0,
      fileName: selectedFile.name
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
        fileName: selectedFile.name
      });
      setCurrentStep('course-type');
      setCourseType(null);
      setSelectedFile(null);
      setIsTrainerMode(false);
    }, 500);
  };

  const handleCourseTypeSelect = (type: CourseType) => {
    setCourseType(type);
    setCurrentStep('file-upload');
  };

  const handleBackToCourseType = () => {
    setCurrentStep('course-type');
    setCourseType(null);
    setSelectedFile(null);
  };

  const handleBackToFileUpload = () => {
    setCurrentStep('file-upload');
    setSelectedFile(null);
  };

  // Edit and Publish handlers
  const handleEdit = () => {
    setIsEditing(true);
    // Initialize edited content with current lesson content
    setEditedContent(lessonData?.content || '');
  };

  const handleSaveEdit = () => {
    if (lessonData) {
      setLessonData({
        ...lessonData,
        content: editedContent
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const handlePublish = () => {
    setShowPublishModal(true);
    setIsPublishing(true);
    setPublishProgress(0);
    
    // Simulate publishing process
    const interval = setInterval(() => {
      setPublishProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsPublishing(false);
            setShowPublishModal(false);
            setPublishProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
                  Studio AI
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
                  onClick={() => setLessonData(null)}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Nouveau cours
                </button>
              </div>
            </div>

            {/* Course Creation Flow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card/50"
            >
              {currentStep === 'generating' && uploadState.isUploading ? (
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
              ) : currentStep === 'course-type' ? (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Brain className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Choisissez le type de cours</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Sélectionnez le type de cours que vous souhaitez créer pour optimiser la génération IA
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCourseTypeSelect('educational')}
                      className="p-6 border-2 border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-semibold text-foreground">Cours Éducatif</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cours académiques, formations, tutoriels avec exercices et évaluations
                      </p>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCourseTypeSelect('non-educational')}
                      className="p-6 border-2 border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Briefcase className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="font-semibold text-foreground">Cours Non-Éducatif</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Présentations, démonstrations, guides pratiques sans évaluation
                      </p>
                    </motion.button>
                  </div>
                  
                  <button
                    onClick={() => setLessonData(mockLessonData)}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Play className="w-4 h-4" />
                    Demo avec contenu exemple
                  </button>
                </div>
              ) : currentStep === 'file-upload' ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <button
                      onClick={handleBackToCourseType}
                      className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      title="Retour au choix du type de cours"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {courseType === 'educational' ? 'Cours Éducatif' : 'Cours Non-Éducatif'}
                    </span>
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
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Formats supportés: PDF, Word (.doc, .docx), PowerPoint (.ppt, .pptx)
                  </p>
                </div>
              ) : currentStep === 'trainer-mode' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <button
                      onClick={handleBackToFileUpload}
                      className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                      title="Retour à la sélection de fichier"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Fichier sélectionné: {selectedFile?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">Configuration du Mode Formateur</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Activez le mode formateur pour des options avancées de personnalisation
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleGenerateCourse}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Générer le cours
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>


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
              onClick={handleEdit}
              className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
            
            <button
              onClick={handlePublish}
              className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Publier
            </button>
            
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
              Nouveau cours
            </button>
          </div>
        </motion.div>

        {/* Trainer Mode Panel */}
        <AnimatePresence>
          {isTrainerMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <TrainerModePanel onLoadTemplate={() => setLessonData(mockLessonData)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Editor Modal */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-4xl h-[80vh] flex flex-col"
              >
                {/* Editor Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Modifier le contenu du cours</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
                    >
                      <CloseIcon className="w-4 h-4" />
                      Annuler
                    </button>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-4">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-full p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Modifiez le contenu de votre cours ici..."
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Publish Modal */}
        <AnimatePresence>
          {showPublishModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-md p-6"
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Globe className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Publication en cours...</h3>
                  <p className="text-muted-foreground">
                    {isPublishing ? 'Publication de votre cours sur la plateforme' : 'Cours publié avec succès!'}
                  </p>
                  
                  <div className="w-full bg-secondary rounded-full h-3">
                    <motion.div 
                      className="bg-green-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${publishProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {publishProgress}% - {isPublishing ? 'Traitement...' : 'Terminé!'}
                  </p>
                  
                  {!isPublishing && publishProgress >= 100 && (
                    <button
                      onClick={() => setShowPublishModal(false)}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Fermer
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                              <TrainerModePanel onLoadTemplate={() => setLessonData(mockLessonData)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonStudioPage;