'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  
  // Notes and bookmarks
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  
  // Picture-in-Picture
  const [isPiP, setIsPiP] = useState(false);
  
  // Analytics
  const [watchTime, setWatchTime] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const [seekCount, setSeekCount] = useState(0);
  const [qualityChanges, setQualityChanges] = useState(0);

  // Format time helper
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setPauseCount(prev => prev + 1);
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Volume control
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Seek control
  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      setSeekCount(prev => prev + 1);
    }
  }, []);

  // Playback rate control
  const handlePlaybackRateChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }, []);

  // Quality control
  const handleQualityChange = useCallback((quality: string) => {
    setSelectedQuality(quality);
    setQualityChanges(prev => prev + 1);
    // In real implementation, this would switch video source
  }, []);

  // Fullscreen control
  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement && containerRef.current) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Picture-in-Picture
  const togglePiP = useCallback(async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      if (!document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
        setIsPiP(true);
      } else {
        await document.exitPictureInPicture();
        setIsPiP(false);
      }
    }
  }, []);

  // Add note
  const addNote = useCallback(() => {
    if (currentNote.trim() && onNoteAdd) {
      const note: Omit<Note, 'id' | 'createdAt'> = {
        timestamp: currentTime,
        content: currentNote,
        type: 'note',
      };
      onNoteAdd(note);
      setNotes(prev => [...prev, { ...note, id: Date.now().toString(), createdAt: new Date() }]);
      setCurrentNote('');
      setShowNoteDialog(false);
    }
  }, [currentNote, currentTime, onNoteAdd]);

  // Add bookmark
  const addBookmark = useCallback(() => {
    if (onBookmarkAdd) {
      const bookmark: Omit<Bookmark, 'id' | 'createdAt'> = {
        timestamp: currentTime,
        title: `علامة في ${formatTime(currentTime)}`,
      };
      onBookmarkAdd(bookmark);
      setBookmarks(prev => [...prev, { ...bookmark, id: Date.now().toString(), createdAt: new Date() }]);
    }
  }, [currentTime, onBookmarkAdd]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          handleSeek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          handleSeek(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
        case 'p':
          togglePiP();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlay, currentTime, duration, volume, toggleFullscreen, toggleMute, togglePiP]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) {
        onProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };

    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onProgress, onComplete]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  return (
    <div className="relative bg-black rounded-2xl overflow-hidden" ref={containerRef}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      >
        {sources.map((source, index) => (
          <source key={index} src={source.url} type="video/mp4" />
        ))}
        {subtitles.map((subtitle) => (
          <track
            key={subtitle.id}
            kind="subtitles"
            src={subtitle.url}
            srcLang={subtitle.language}
            label={subtitle.label}
          />
        ))}
      </video>

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
        </div>
      )}

      {/* Center Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 pointer-events-auto"
            onClick={togglePlay}
          >
            <Play className="w-8 h-8 text-white" />
          </Button>
        </div>
      )}

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/80"
          >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="text-white">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm opacity-75">{formatTime(currentTime)} / {formatTime(duration)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePiP}>
                  <Monitor className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="relative">
                  <div className="bg-white/30 h-1 rounded-full cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    handleSeek(duration * percent);
                  }}>
                    <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${(currentTime / duration) * 100}%` }} />
                  </div>
                  {/* Bookmarks on timeline */}
                  {bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
                      style={{ left: `${(bookmark.timestamp / duration) * 100}%` }}
                      onClick={() => handleSeek(bookmark.timestamp)}
                    />
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <div className="w-20 bg-white/30 h-1 rounded-full cursor-pointer" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percent = (e.clientX - rect.left) / rect.width;
                      handleVolumeChange(percent);
                    }}>
                      <div className="bg-white h-full rounded-full" style={{ width: `${volume * 100}%` }} />
                    </div>
                  </div>

                  <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Playback Speed */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    {playbackRate}x
                  </Button>

                  {/* Notes */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowNoteDialog(true)}
                  >
                    <FileText className="w-4 h-4" />
                  </Button>

                  {/* Bookmarks */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={addBookmark}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>

                  {/* Subtitles */}
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Subtitles className="w-4 h-4" />
                  </Button>

                  {/* Settings */}
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="w-4 h-4" />
                  </Button>

                  {/* Fullscreen */}
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Dialog */}
      <AnimatePresence>
        {showNoteDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowNoteDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">إضافة ملاحظة</h3>
              <p className="text-sm text-gray-500 mb-4">في {formatTime(currentTime)}</p>
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="اكتب ملاحظتك هنا..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={addNote} disabled={!currentNote.trim()}>
                  إضافة
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Panels */}
      <div className="absolute top-20 right-4 space-y-2">
        {/* Notes Panel */}
        {showNotes && (
          <Card className="w-80 max-h-96 overflow-y-auto">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">الملاحظات</h3>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div key={note.id} className="p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">{formatTime(note.timestamp)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transcript Panel */}
        {showTranscript && (
          <Card className="w-80 max-h-96 overflow-y-auto">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">النص المكتوب</h3>
              <div className="space-y-2">
                {transcript.map((segment, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg cursor-pointer ${
                      currentTime >= segment.start && currentTime <= segment.end
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSeek(segment.start)}
                  >
                    <span className="text-xs text-gray-500">{formatTime(segment.start)}</span>
                    <p className="text-sm mt-1">{segment.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-20 left-4 space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
          onClick={() => setShowNotes(!showNotes)}
        >
          <FileText className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
          onClick={() => setShowTranscript(!showTranscript)}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Video Analytics Component
export const VideoAnalytics = React.memo(function VideoAnalytics({
  videoId,
  watchTime,
  pauseCount,
  seekCount,
  qualityChanges,
  completionRate,
}: {
  videoId: string;
  watchTime: number;
  pauseCount: number;
  seekCount: number;
  qualityChanges: number;
  completionRate: number;
}) {
  // Helper function for time formatting
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        تحليلات المشاهدة
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{formatTime(watchTime)}</div>
          <div className="text-sm text-gray-600">وقت المشاهدة</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{pauseCount}</div>
          <div className="text-sm text-gray-600">عدد الإيقاف</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{seekCount}</div>
          <div className="text-sm text-gray-600">عدد التقديم</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{Math.round(completionRate)}%</div>
          <div className="text-sm text-gray-600">معدل الإكمال</div>
        </div>
      </div>
    </Card>
  );
});
