import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, SkipForward, Eye, EyeOff, Search } from 'lucide-react';
import type { TranscriptSegment } from '../../types/studio';

interface LessonVideoPlayerProps {
  videoUrl: string;
  transcript: TranscriptSegment[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
}

const LessonVideoPlayer = forwardRef<HTMLVideoElement, LessonVideoPlayerProps>(
  ({ videoUrl, transcript, currentTime, onTimeUpdate, onPlay, onPause, onSeek }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeTranscriptId, setActiveTranscriptId] = useState<string | null>(null);
    const [showTranscript, setShowTranscript] = useState(true);
    const [transcriptSearch, setTranscriptSearch] = useState('');
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Forward ref to parent
    useEffect(() => {
      if (ref && typeof ref === 'object' && videoRef.current) {
        ref.current = videoRef.current;
      }
    }, [ref]);

    // Update active transcript segment based on current time
    useEffect(() => {
      const activeSegment = transcript.find(
        segment => currentTime >= segment.startTime && currentTime <= segment.endTime
      );
      setActiveTranscriptId(activeSegment?.id || null);
    }, [currentTime, transcript]);

    const handlePlayPause = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        onTimeUpdate(videoRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (videoRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        videoRef.current.currentTime = newTime;
        onTimeUpdate(newTime);
        onSeek?.(newTime);
      }
    };

    const handleTranscriptClick = (segment: TranscriptSegment) => {
      if (videoRef.current) {
        videoRef.current.currentTime = segment.startTime;
        onTimeUpdate(segment.startTime);
        onSeek?.(segment.startTime);
      }
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    const skipForward = () => {
      if (videoRef.current) {
        videoRef.current.currentTime += 10;
      }
    };

    const skipBackward = () => {
      if (videoRef.current) {
        videoRef.current.currentTime -= 10;
      }
    };

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl overflow-hidden shadow-lg"
      >
        <div className="space-y-6 p-6">
          {/* Large Video Player */}
          <div className="w-full">
            <div 
              className="relative bg-black rounded-xl overflow-hidden group cursor-pointer shadow-xl"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full aspect-video object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => {
                  setIsPlaying(true);
                  onPlay?.();
                }}
                onPause={() => {
                  setIsPlaying(false);
                  onPause?.();
                }}
              />
              
              {/* AI Badge */}
              <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                🤖 Généré par IA
              </div>

              {/* Video Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  >
                    {/* Center Play Button */}
                    <button
                      onClick={handlePlayPause}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-4 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      {/* Progress Bar */}
                      <div 
                        className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-3"
                        onClick={handleProgressClick}
                      >
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={skipBackward} 
                            className="text-white hover:text-primary transition-colors"
                            title="Reculer de 10 secondes"
                            aria-label="Reculer de 10 secondes"
                          >
                            <RotateCcw className="w-5 h-5" />
                          </button>
                          
                          <button 
                            onClick={handlePlayPause} 
                            className="text-white hover:text-primary transition-colors"
                            title={isPlaying ? "Mettre en pause" : "Lire"}
                            aria-label={isPlaying ? "Mettre en pause" : "Lire"}
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </button>
                          
                          <button 
                            onClick={skipForward} 
                            className="text-white hover:text-primary transition-colors"
                            title="Avancer de 10 secondes"
                            aria-label="Avancer de 10 secondes"
                          >
                            <SkipForward className="w-5 h-5" />
                          </button>
                          
                          <button 
                            onClick={() => {
                              setIsMuted(!isMuted);
                              if (videoRef.current) {
                                videoRef.current.muted = !isMuted;
                              }
                            }}
                            className="text-white hover:text-primary transition-colors"
                            title={isMuted ? "Activer le son" : "Couper le son"}
                            aria-label={isMuted ? "Activer le son" : "Couper le son"}
                          >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </button>
                          
                          <span className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>
                        
                        <button 
                          onClick={toggleFullscreen} 
                          className="text-white hover:text-primary transition-colors"
                          title="Plein écran"
                          aria-label="Plein écran"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Caption-Style Transcript */}
          {transcript.length > 0 && (
            <div className="bg-background/50 rounded-xl border border-border">
              {/* Transcript Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  📝 Transcription synchronisée
                </h3>
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors"
                  title={showTranscript ? 'Masquer la transcription' : 'Afficher la transcription'}
                >
                  {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence>
                {showTranscript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4"
                  >
                    {/* Search Box */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Rechercher dans la transcription..."
                        value={transcriptSearch}
                        onChange={(e) => setTranscriptSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>

                    {/* Caption-Style Transcript Content */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {transcript
                        .filter(segment => 
                          transcriptSearch === '' || 
                          segment.text.toLowerCase().includes(transcriptSearch.toLowerCase())
                        )
                        .map((segment) => (
                        <motion.div
                          key={segment.id}
                          onClick={() => handleTranscriptClick(segment)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            activeTranscriptId === segment.id
                              ? 'bg-primary/20 border-primary/50 border'
                              : 'bg-muted/30 hover:bg-muted/50'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xs text-muted-foreground min-w-[45px] font-mono">
                              {formatTime(segment.startTime)}
                            </span>
                            <p className={`text-sm leading-relaxed ${
                              activeTranscriptId === segment.id ? 'text-primary font-medium' : 'text-foreground'
                            }`}>
                              {transcriptSearch && (
                                <span dangerouslySetInnerHTML={{
                                  __html: segment.text.replace(
                                    new RegExp(`(${transcriptSearch})`, 'gi'),
                                    '<mark class="bg-yellow-200 text-black rounded px-1">$1</mark>'
                                  )
                                }} />
                              ) || segment.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      
                      {transcriptSearch && transcript.filter(segment => 
                        segment.text.toLowerCase().includes(transcriptSearch.toLowerCase())
                      ).length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          Aucun résultat trouvé pour "{transcriptSearch}"
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 text-xs text-muted-foreground">
                      💡 Cliquez sur un segment pour naviguer dans la vidéo
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

LessonVideoPlayer.displayName = 'LessonVideoPlayer';

export default LessonVideoPlayer;