"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, 
  Settings, Share2, Download, Bookmark, Clock, PlayCircle, 
  CheckCircle2, Circle, ChevronLeft, ChevronRight, 
  Settings2, Subtitles, Monitor, Smartphone, Globe,
  Gauge, Rewind, FastForward, Repeat, List, MessageSquare,
  ThumbsUp, ThumbsDown, Star, FileText, Award
} from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';

export default function CoursePlayerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('720p');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<Array<{time: number, text: string}>>([]);

  // Course data
  const courseData = {
    title: 'احتراف React.js من الصفر إلى الاحتراف',
    instructor: 'أحمد محمد',
    progress: 65,
    totalLessons: 45,
    completedLessons: 29
  };

  const currentLesson = {
    id: 1,
    title: 'مقدمة في React.js ومفاهيمها الأساسية',
    duration: 1245, // seconds
    description: 'في هذا الدرس سنتعلم أساسيات React.js ومفاهيمها الأساسية مثل المكونات والحالة والخصائص.',
    videoUrl: '/sample-video.mp4', // Placeholder
    thumbnail: '/api/placeholder/1280/720'
  };

  const courseContent = [
    {
      id: 1,
      title: 'الوحدة الأولى: أساسيات React',
      lessons: [
        { id: 1, title: 'مقدمة في React.js', duration: '20:45', completed: true, current: true },
        { id: 2, title: 'المكونات (Components)', duration: '15:30', completed: true },
        { id: 3, title: 'الخصائص (Props)', duration: '18:20', completed: false },
        { id: 4, title: 'الحالة (State)', duration: '22:15', completed: false }
      ]
    },
    {
      id: 2,
      title: 'الوحدة الثانية: Hooks المتقدمة',
      lessons: [
        { id: 5, title: 'useState و useEffect', duration: '25:10', completed: false },
        { id: 6, title: 'useContext و useReducer', duration: '30:45', completed: false },
        { id: 7, title: 'Custom Hooks', duration: '20:30', completed: false }
      ]
    }
  ];

  const transcript = [
    { time: 0, text: 'مرحباً بكم في هذا الدرس عن React.js' },
    { time: 5, text: 'React.js هي مكتبة JavaScript لبناء واجهات المستخدم' },
    { time: 10, text: 'تم تطويرها بواسطة فيسباك وتستخدم في العديد من التطبيقات الكبيرة' },
    { time: 15, text: 'في هذا الدرس سنتعلم المفاهيم الأساسية لـ React' }
  ];

  const resources = [
    { id: 1, title: 'شرائح الدرس', type: 'pdf', size: '2.5 MB' },
    { id: 2, title: 'كود المصدر', type: 'zip', size: '156 KB' },
    { id: 3, title: 'تمارين إضافية', type: 'pdf', size: '1.2 MB' }
  ];

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const qualities = ['360p', '480p', '720p', '1080p', '4K'];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = parseFloat(e.target.value) / 100;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const changeQuality = (newQuality: string) => {
    setQuality(newQuality);
    setShowQualityMenu(false);
    // In real app, this would switch video source
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { time: currentTime, text: noteText }]);
      setNoteText('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col lg:flex-row h-screen">
        
        {/* Video Player Section */}
        <div className="lg:flex-1 relative">
          {/* Video Container */}
          <div 
            className="relative bg-black aspect-video lg:h-full"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full"
              poster={currentLesson.thumbnail}
            >
              <source src={currentLesson.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  {/* Skip Back/Forward */}
                  <button
                    onClick={() => skipTime(-10)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <SkipBack size={20} />
                  </button>
                  <button
                    onClick={() => skipTime(10)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <SkipForward size={20} />
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <Volume2 size={20} />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume * 100}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Playback Speed */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Gauge size={20} />
                    </button>
                    {showSpeedMenu && (
                      <div className="absolute bottom-full left-0 mb-2 bg-gray-800 rounded-lg p-2 min-w-20">
                        {playbackSpeeds.map((speed) => (
                          <button
                            key={speed}
                            onClick={() => changePlaybackSpeed(speed)}
                            className={`block w-full text-right px-3 py-1 hover:bg-gray-700 rounded ${
                              playbackSpeed === speed ? 'text-blue-400' : ''
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quality */}
                  <div className="relative">
                    <button
                      onClick={() => setShowQualityMenu(!showQualityMenu)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Monitor size={20} />
                    </button>
                    {showQualityMenu && (
                      <div className="absolute bottom-full left-0 mb-2 bg-gray-800 rounded-lg p-2 min-w-25">
                        {qualities.map((q) => (
                          <button
                            key={q}
                            onClick={() => changeQuality(q)}
                            className={`block w-full text-right px-3 py-1 hover:bg-gray-700 rounded ${
                              quality === q ? 'text-blue-400' : ''
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Bookmark */}
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 hover:bg-white/20 rounded-full transition-colors ${
                      isBookmarked ? 'text-yellow-400' : ''
                    }`}
                  >
                    <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Settings size={20} />
                  </button>

                  {/* Picture in Picture */}
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Monitor size={20} />
                  </button>

                  {/* Subtitles */}
                  <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <Subtitles size={20} />
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading Spinner */}
            {!duration && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-900 p-6">
            <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
            <p className="text-gray-400 mb-4">{currentLesson.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {formatTime(currentLesson.duration)}
              </span>
              <span className="flex items-center gap-2">
                <PlayCircle size={16} />
                1,234 مشاهدة
              </span>
              <span className="flex items-center gap-2">
                <ThumbsUp size={16} />
                98%
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 bg-gray-900 overflow-hidden flex flex-col">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'content' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              المحتوى
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'transcript' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              النص
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'notes' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ملاحظات
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'resources' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              موارد
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            
            {activeTab === 'content' && (
              <div className="p-4">
                {courseContent.map((unit) => (
                  <div key={unit.id} className="mb-6">
                    <h3 className="font-bold text-white mb-3">{unit.title}</h3>
                    <div className="space-y-2">
                      {unit.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            lesson.current 
                              ? 'bg-blue-600/20 border border-blue-600' 
                              : 'hover:bg-gray-800'
                          }`}
                        >
                          <div className="shrink-0">
                            {lesson.completed ? (
                              <CheckCircle2 size={20} className="text-green-500" />
                            ) : lesson.current ? (
                              <PlayCircle size={20} className="text-blue-500" />
                            ) : (
                              <Circle size={20} className="text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-gray-400">{lesson.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="p-4">
                <h3 className="font-bold text-white mb-4">النص الكامل للدرس</h3>
                <div className="space-y-4">
                  {transcript.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-xs text-gray-400 min-w-12.5">
                        {formatTime(item.time)}
                      </span>
                      <p className="text-sm text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="p-4">
                <h3 className="font-bold text-white mb-4">ملاحظاتي</h3>
                
                {/* Add Note */}
                <div className="mb-6">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="أضف ملاحظة في هذا الوقت..."
                    className="w-full p-3 bg-gray-800 text-white rounded-lg resize-none h-24"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {formatTime(currentTime)}
                    </span>
                    <Button onClick={addNote} size="sm">
                      إضافة ملاحظة
                    </Button>
                  </div>
                </div>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-400">
                          {formatTime(note.time)}
                        </span>
                        <button className="text-gray-400 hover:text-white">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-300">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="p-4">
                <h3 className="font-bold text-white mb-4">موارد الدرس</h3>
                <div className="space-y-3">
                  {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <h4 className="text-sm font-medium text-white">{resource.title}</h4>
                          <p className="text-xs text-gray-400">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download size={16} className="ml-2" />
                        تحميل
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

