import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, SkipForward } from 'lucide-react';
import type { TranscriptSegment } from '../../types/studio';

interface LessonVideoPlayerProps {
  videoUrl: string;
  transcript: TranscriptSegment[];
  currentTime: number;
  onTimeUpdate: (time: number) => void;
}

const LessonVideoPlayer = forwardRef<HTMLVideoElement, LessonVideoPlayerProps>(
  ({ videoUrl, transcript, currentTime, onTimeUpdate }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeTranscriptId, setActiveTranscriptId] = useState<string | null>(null);
    
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
      }
    };

    const handleTranscriptClick = (segment: TranscriptSegment) => {
      if (videoRef.current) {
        videoRef.current.currentTime = segment.startTime;
        onTimeUpdate(segment.startTime);
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div 
              className="relative bg-black rounded-lg overflow-hidden group cursor-pointer"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full aspect-video object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
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
                          <button onClick={skipBackward} className="text-white hover:text-primary transition-colors">
                            <RotateCcw className="w-5 h-5" />
                          </button>
                          
                          <button onClick={handlePlayPause} className="text-white hover:text-primary transition-colors">
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </button>
                          
                          <button onClick={skipForward} className="text-white hover:text-primary transition-colors">
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
                          >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </button>
                          
                          <span className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>
                        
                        <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Transcript Panel */}
          <div className="lg:col-span-2 bg-background/50 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              📝 Transcription synchronisée
            </h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {transcript.map((segment) => (
                <motion.div
                  key={segment.id}
                  onClick={() => handleTranscriptClick(segment)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeTranscriptId === segment.id
                      ? 'bg-primary/20 border-primary/50 border'
                      : 'bg-muted/50 hover:bg-muted/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-muted-foreground min-w-[50px]">
                      {formatTime(segment.startTime)}
                    </span>
                    <p className={`text-sm leading-relaxed ${
                      activeTranscriptId === segment.id ? 'text-primary font-medium' : 'text-foreground'
                    }`}>
                      {segment.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              💡 Cliquez sur un segment pour naviguer dans la vidéo
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

LessonVideoPlayer.displayName = 'LessonVideoPlayer';

export default LessonVideoPlayer;