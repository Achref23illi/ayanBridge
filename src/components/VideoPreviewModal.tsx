import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings } from 'lucide-react';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
}

const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  channel,
  duration,
  views
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setHasError(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setIsLoading(false);
      setHasError(false);
    }
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-secondary-light rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          style={{ width: '80vw', height: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-secondary-light">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white line-clamp-1">{title}</h2>
                <div className="flex items-center space-x-2 text-sm text-white/60">
                  <span>{channel}</span>
                  <span>•</span>
                  <span>{views} views</span>
                  <span>•</span>
                  <span>{duration}</span>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRestart}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4 text-white" />
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4 text-white" />
              </button>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1 bg-black relative group">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={handleVideoError}
              onCanPlay={handleCanPlay}
              onClick={togglePlayPause}
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="text-white">Loading video...</div>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="text-6xl text-red-500 mb-4">⚠️</div>
                  <div className="text-white text-xl mb-2">Video failed to load</div>
                  <div className="text-white/60 text-sm mb-4">Please check your internet connection or try again later</div>
                  <button
                    onClick={() => {
                      setHasError(false);
                      setIsLoading(true);
                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLoading || hasError ? 'pointer-events-none' : ''}`}>
              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlayPause}
                  className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="mb-3">
                                     <input
                     type="range"
                     min="0"
                     max={videoDuration || 0}
                     value={currentTime}
                     onChange={handleSeek}
                     className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                     title="Video progress"
                     style={{
                       background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / videoDuration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / videoDuration) * 100}%, rgba(255,255,255,0.2) 100%)`
                     }}
                   />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlayPause}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <div className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(videoDuration)}
                    </div>
                  </div>
                                     <button
                     onClick={toggleFullscreen}
                     className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                     title="Fullscreen"
                   >
                     <Maximize className="w-5 h-5 text-white" />
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-secondary-light">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/60">
                Use spacebar to play/pause • Click and drag to seek
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/50">Video Player</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPreviewModal; 