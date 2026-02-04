'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Bookmark,
  BookmarkCheck,
  FileText,
  Download,
  Share2,
  Subtitles,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  FastForward,
  Rewind,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Clock,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Users,
  TrendingUp,
  BarChart3,
  PlayCircle,
  PauseCircle,
  Settings2,
  List,
  Grid3x3,
  Layers,
  Zap,
  Target,
  Award,
  Star,
  Heart,
  Share,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimatedWrapper, AnimatedProgress } from '@/components/ui/Animations';

// Video player interfaces
interface VideoSource {
  url: string;
  quality: 'auto' | '1080p' | '720p' | '480p' | '360p';
  label: string;
  size?: number;
}

interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  url: string;
}

interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  thumbnail?: string;
}

interface Note {
  id: string;
  timestamp: number;
  content: string;
  type: 'note' | 'question' | 'important';
  createdAt: Date;
}

interface Bookmark {
  id: string;
  timestamp: number;
  title: string;
  description?: string;
  thumbnail?: string;
  createdAt: Date;
}

interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence?: number;
}

// Video Player Component
export const AdvancedVideoPlayer = React.memo(function AdvancedVideoPlayer({
  videoId,
  title,
  sources,
  subtitles,
  chapters,
  transcript,
  onProgress,
  onComplete,
  onNoteAdd,
  onBookmarkAdd,
}: {
  videoId: string;
  title: string;
  sources: VideoSource[];
  subtitles: SubtitleTrack[];
  chapters: Chapter[];
  transcript: TranscriptSegment[];
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onNoteAdd?: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onBookmarkAdd?: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  
  // UI state
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('auto');
  const [selectedSubtitle, setSelectedSubtitle] = useState('none');
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');

  // Memoized time formatting function
  const formatTime = useCallback((time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Memoized progress calculation
  const progress = useMemo(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);

  // Memoized buffered calculation
  const buffered = useMemo(() => {
    if (!videoRef.current) return 0;
    const buffered = videoRef.current.buffered;
    if (buffered.length === 0) return 0;
    return (buffered.end(buffered.length - 1) / duration) * 100;
  }, [currentTime, duration]);

  // Memoized current source
  const currentSource = useMemo(() => {
    return sources.find(source => source.quality === selectedQuality) || sources[0];
  }, [sources, selectedQuality]);

  // Memoized current subtitle
  const currentSubtitle = useMemo(() => {
    return subtitles.find(subtitle => subtitle.id === selectedSubtitle);
  }, [subtitles, selectedSubtitle]);

  // Memoized current chapter
  const currentChapter = useMemo(() => {
    return chapters.find(chapter => 
      currentTime >= chapter.startTime && currentTime <= chapter.endTime
    );
  }, [chapters, currentTime]);

  // Memoized current transcript segment
  const currentTranscriptSegment = useMemo(() => {
    return transcript.find(segment => 
      currentTime >= segment.start && currentTime <= segment.end
    );
  }, [transcript, currentTime]);

  // Video event handlers
  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onProgress?.(progress);
    }
  }, [progress, onProgress]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onComplete?.();
  }, [onComplete]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  }, [isMuted]);

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleQualityChange = useCallback((quality: string) => {
    const currentTime = videoRef.current?.currentTime || 0;
    setSelectedQuality(quality);
    // Store current time and restore after source change
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
      }
    }, 100);
  }, []);

  const handleSubtitleChange = useCallback((subtitleId: string) => {
    setSelectedSubtitle(subtitleId);
  }, []);

  const handlePlaybackRateChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleSkipBack = useCallback(() => {
    handleSeek(Math.max(0, currentTime - 10));
  }, [currentTime, handleSeek]);

  const handleSkipForward = useCallback(() => {
    handleSeek(Math.min(duration, currentTime + 10));
  }, [currentTime, duration, handleSeek]);

  const handleNoteAdd = useCallback((note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotes(prev => [...prev, newNote]);
    onNoteAdd?.(note);
  }, [onNoteAdd]);

  const handleBookmarkAdd = useCallback((bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setBookmarks(prev => [...prev, newBookmark]);
    onBookmarkAdd?.(bookmark);
  }, [onBookmarkAdd]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handleDislike = useCallback(() => {
    setIsDisliked(!isDisliked);
  }, [isDisliked]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out this video: ${title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [title]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = currentSource.url;
    link.download = `${title}.${currentSource.quality}.mp4`;
    link.click();
  }, [currentSource, title]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          handlePlay();
          break;
        case 'k':
        case 'K':
          handlePause();
          break;
        case 'ArrowLeft':
          handleSkipBack();
          break;
        case 'ArrowRight':
          handleSkipForward();
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleFullscreenToggle();
          }
          break;
        case 'm':
        case 'M':
          handleMuteToggle();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePlay, handlePause, handleSkipBack, handleSkipForward, handleFullscreenToggle, handleMuteToggle]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) {
          timeout = setTimeout(() => {
            setShowControls(false);
          }, 1000);
        }
      });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // View count increment
  useEffect(() => {
    setViewCount(prev => prev + 1);
  }, []);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', () => setIsBuffering(true));
    video.addEventListener('canplay', () => setIsBuffering(false));

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', () => setIsBuffering(true));
      video.removeEventListener('canplay', () => setIsBuffering(false));
    };
  }, [handlePlay, handlePause, handleTimeUpdate, handleLoadedMetadata, handleEnded]);

  // Update video source when quality changes
  useEffect(() => {
    if (videoRef.current && currentSource) {
      videoRef.current.src = currentSource.url;
    }
  }, [currentSource]);

  return (
    <div ref={containerRef} className="relative w-full bg-black rounded-lg overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        playsInline
        preload="metadata"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p>جاري التحميل...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <p className="text-red-400 mb-4">خطأأ في تحميل الفيديو</p>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              إعادة المحاولة
            </Button>
          </div>
        </div>
      )}

      {/* Network Status */}
      {networkStatus === 'offline' && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          غير متصل بالإنترنت
        </div>
      )}

      {/* Controls */}
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="relative w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                <AnimatedProgress
                  value={progress}
                  className="absolute top-0 left-0 h-full bg-blue-500"
                />
                <div
                  className="absolute top-0 left-0 h-full bg-gray-400"
                  style={{ width: `${buffered}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <Button
                  onClick={isPlaying ? handlePause : handlePlay}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                {/* Skip Back */}
                <Button
                  onClick={handleSkipBack}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                {/* Skip Forward */}
                <Button
                  onClick={handleForward}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleMuteToggle}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* Time Display */}
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Settings */}
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-5 h-5" />
                </Button>

                {/* Subtitles */}
                <Button
                  onClick={() => setSelectedSubtitle(selectedSubtitle === 'none' ? subtitles[0]?.id : 'none')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Subtitles className="w-5 h-5" />
                </Button>

                {/* Picture-in-Picture */}
                <Button
                  onClick={() => {
                    if (videoRef.current && 'requestPictureInPicture' in videoRef.current) {
                      videoRef.current.requestPictureInPicture();
                    }
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Monitor className="w-5 h-5" />
                </Button>

                {/* Fullscreen */}
                <Button
                  onClick={handleFullscreenToggle}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg"
        >
          <h3 className="font-bold mb-4">الإعدادات</h3>
          
          {/* Quality Selection */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">الجودة</h4>
            <div className="space-y-2">
              {sources.map(source => (
                <button
                  key={source.quality}
                  onClick={() => handleQualityChange(source.quality)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    selectedQuality === source.quality
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {source.label}
                </button>
              ))}
            </div>
          </div>

          {/* Playback Speed */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">سرعة التشغيل</h4>
            <div className="space-y-2">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                <button
                  key={rate}
                  onClick={() => handlePlaybackRateChange(rate)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    playbackRate === rate
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Subtitles */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">الترجمة</h4>
            <div className="space-y-2">
              <button
                onClick={() => handleSubtitleChange('none')}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSubtitle === 'none'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                بدون ترجمة
              </button>
              {subtitles.map(subtitle => (
                <button
                  key={subtitle.id}
                  onClick={() => handleSubtitleChange(subtitle.id)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    selectedSubtitle === subtitle.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {subtitle.label} ({subtitle.language})
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setShowSettings(false)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            إغلاق
          </Button>
        </motion.div>
      )}

      {/* Video Info */}
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-blue-400' : ''}`} />
            {isLiked ? '1' : '0'}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'text-red-400' : ''}`} />
            {isDisliked ? '1' : '0'}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            0
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          onClick={handleLike}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-blue-400' : ''}`} />
        </Button>
        <Button
          onClick={handleDislike}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <ThumbsDown className={`w-4 h-4 ${isDisliked ? 'text-red-400' : ''}`} />
        </Button>
        <Button
          onClick={handleShare}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleDownload}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

AdvancedVideoPlayer.displayName = 'AdvancedVideoPlayer';
