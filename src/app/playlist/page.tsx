"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Plus, Clock, Bookmark, 
  Share2, Eye, Search, List, Grid, CheckCircle, Star,
  SkipForward, SkipBack, Shuffle, Volume2, Repeat,
  ChevronRight, Users, Lock, Globe, Calendar, Target, Zap,
  TrendingUp, BarChart3, Award
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  url: string;
  thumbnail: string;
  instructor: string;
  category: string;
  tags: string[];
  isCompleted: boolean;
  progress: number;
  lastWatched: string;
  totalWatchTime: number;
  isBookmarked: boolean;
  rating: number;
  views: number;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  videos: Video[];
  isPublic: boolean;
  created: string;
  updated: string;
  totalDuration: number;
  totalVideos: number;
  category: string;
  tags: string[];
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  followers: number;
}

interface StudySession {
  id: string;
  date: string;
  duration: number;
  videosWatched: number;
  playlistId: string;
  playlistTitle: string;
}

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title' | 'duration' | 'rating'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentTime, setCurrentTime] = useState(0);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(600); // 10 hours in minutes
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [pomodoroBreak, setPomodoroBreak] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock data
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'مقدمة في React.js - الجزء الأول: المفاهيم الأساسية',
      description: 'مقدمة في المفاهيم الأساسية لـ React.js بما في ذلك المكونات والحالة والخصائص',
      duration: 720,
      url: '/videos/react-basics-1.mp4',
      thumbnail: '/thumbnails/react-basics-1.jpg',
      instructor: 'أحمد محمد',
      category: 'برمجة',
      tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
      isCompleted: true,
      progress: 100,
      lastWatched: '2024-03-15T10:30:00Z',
      totalWatchTime: 720,
      isBookmarked: true,
      rating: 4.8,
      views: 1250
    },
    {
      id: '2',
      title: 'مقدمة في React.js - الجزء الثاني: المكونات المتقدمة',
      description: 'تعمق في المكونات المتقدمة مثل Hooks وContext وRedux',
      duration: 900,
      url: '/videos/react-basics-2.mp4',
      thumbnail: '/thumbnails/react-basics-2.jpg',
      instructor: 'أحمد محمد',
      category: 'برمجة',
      tags: ['React', 'Hooks', 'State Management', 'Context API'],
      isCompleted: false,
      progress: 75,
      lastWatched: '2024-03-14T14:45:00Z',
      totalWatchTime: 675,
      isBookmarked: false,
      rating: 4.9,
      views: 980
    },
    {
      id: '3',
      title: 'مقدمة في React.js - الجزء الثالث: التطبيقات المتقدمة',
      description: 'تطبيق التطبيقات المتقدمة مثل التوجيه ومعالجة النماذج',
      duration: 600,
      url: '/videos/react-basics-3.mp4',
      thumbnail: '/thumbnails/react-basics-3.jpg',
      instructor: 'أحمد محمد',
      category: 'برمجة',
      tags: ['React', 'Forms', 'Events', 'Routing'],
      isCompleted: false,
      progress: 45,
      lastWatched: '2024-03-13T12:20:00Z',
      totalWatchTime: 270,
      isBookmarked: true,
      rating: 4.7,
      views: 650
    },
    {
      id: '4',
      title: 'مقدمة في Next.js - الإطار المتقدم لـ React',
      description: 'تعلم كيفية بناء تطبيقات React باستخدام Next.js',
      duration: 840,
      url: '/videos/nextjs-intro.mp4',
      thumbnail: '/thumbnails/nextjs-intro.jpg',
      instructor: 'سارة علي',
      category: 'برمجة',
      tags: ['Next.js', 'React', 'SSR', 'Static Generation'],
      isCompleted: false,
      progress: 20,
      lastWatched: '2024-03-12T09:15:00Z',
      totalWatchTime: 168,
      isBookmarked: false,
      rating: 4.6,
      views: 3200
    }
  ]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('studySessions');
    if (savedSessions) {
      setStudySessions(JSON.parse(savedSessions));
    }

    const savedTotalTime = localStorage.getItem('totalStudyTime');
    if (savedTotalTime) {
      setTotalStudyTime(parseInt(savedTotalTime));
    }

    const savedWeeklyProgress = localStorage.getItem('weeklyProgress');
    if (savedWeeklyProgress) {
      setWeeklyProgress(parseInt(savedWeeklyProgress));
    }

    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  useEffect(() => {
    if (studySessions.length > 0) {
      localStorage.setItem('studySessions', JSON.stringify(studySessions));
    }
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem('totalStudyTime', totalStudyTime.toString());
  }, [totalStudyTime]);

  useEffect(() => {
    localStorage.setItem('weeklyProgress', weeklyProgress.toString());
  }, [weeklyProgress]);

  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 60000); // Update every minute
    } else if (pomodoroTime === 0) {
      setIsPomodoroActive(false);
      setPomodoroBreak(!pomodoroBreak);
      setPomodoroTime(pomodoroBreak ? 25 : 5);
    }
    return () => clearInterval(interval);
  }, [isPomodoroActive, pomodoroTime, pomodoroBreak]);

  const startStudySession = (playlistId: string, playlistTitle: string) => {
    const newSession: StudySession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: 0,
      videosWatched: 0,
      playlistId,
      playlistTitle
    };
    setCurrentSession(newSession);
    setSessionStartTime(Date.now());
    setIsPlaying(true);
  };

  const endStudySession = () => {
    if (currentSession && sessionStartTime) {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000 / 60); // in minutes
      const completedSession = {
        ...currentSession,
        duration: sessionDuration
      };
      setStudySessions([...studySessions, completedSession]);
      setTotalStudyTime(totalStudyTime + sessionDuration);
      setWeeklyProgress(weeklyProgress + sessionDuration);
      
      // Update streak
      const today = new Date().toDateString();
      const lastStudyDate = localStorage.getItem('lastStudyDate');
      if (lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastStudyDate === yesterday.toDateString()) {
          setStreak(streak + 1);
        } else {
          setStreak(1);
        }
        localStorage.setItem('lastStudyDate', today);
      }
    }
    setCurrentSession(null);
    setSessionStartTime(null);
    setIsPlaying(false);
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  const calculateWeeklyStats = () => {
    const thisWeek = studySessions.filter(session => {
      const sessionDate = new Date(session.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate > weekAgo;
    });

    const totalMinutes = thisWeek.reduce((acc, session) => acc + session.duration, 0);
    const averagePerDay = totalMinutes / 7;
    const mostProductiveDay = thisWeek.reduce((max, session) => 
      session.duration > max.duration ? session : max, thisWeek[0] || { duration: 0 });

    return {
      totalMinutes,
      averagePerDay,
      mostProductiveDay,
      sessionsCount: thisWeek.length
    };
  };

  const weeklyStats = calculateWeeklyStats();

  useEffect(() => {
    const defaultPlaylist: Playlist = {
      id: 'playlist-default-react',
      name: 'مقدمة في React.js',
      description: 'جميع فيديوهات دورة React.js من البداية إلى الاحتراف',
      videos: videos,
      isPublic: true,
      created: '2024-03-01T08:00:00Z',
      updated: new Date().toISOString(),
      totalDuration: videos.reduce((sum, video) => sum + video.duration, 0),
      totalVideos: videos.length,
      category: 'برمجة',
      tags: ['React', 'Frontend', 'JavaScript', 'Web Development'],
      owner: {
        id: 'user-1',
        name: 'أحمد محمد',
        avatar: '/avatars/default-avatar.jpg'
      },
      followers: 2450
    };

    const secondPlaylist: Playlist = {
      id: 'playlist-web-dev',
      name: 'تطوير الويب المتكامل',
      description: 'دورة شاملة في تطوير الويب الحديث',
      videos: [videos[0], videos[3]],
      isPublic: true,
      created: '2024-02-15T10:00:00Z',
      updated: '2024-03-10T14:30:00Z',
      totalDuration: videos[0].duration + videos[3].duration,
      totalVideos: 2,
      category: 'برمجة',
      tags: ['Web Development', 'Full Stack', 'Frontend', 'Backend'],
      owner: {
        id: 'user-2',
        name: 'سارة علي',
        avatar: '/avatars/sara-avatar.jpg'
      },
      followers: 1890
    };

    setPlaylists([defaultPlaylist, secondPlaylist]);
    setCurrentPlaylist(defaultPlaylist);
  }, []);

  const handleVideoSelect = (video: Video) => {
    const videoIndex = videos.findIndex(v => v.id === video.id);
    if (videoIndex !== -1) {
      setCurrentVideoIndex(videoIndex);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(true);
    }
  };

  const handleBookmark = (video: Video) => {
    const updatedVideos = videos.map(v => 
      v.id === video.id ? { ...v, isBookmarked: !v.isBookmarked } : v
    );
    setVideos(updatedVideos);
  };

  const handleShuffle = () => {
    const shuffled = [...videos].sort(() => Math.random() - 0.5);
    setVideos(shuffled);
    setIsShuffled(true);
    setCurrentVideoIndex(0);
  };

  const handleCreatePlaylist = () => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: 'قائمة تشغيل جديدة',
      description: 'قائمة تشغيل مخصصة',
      videos: [],
      isPublic: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      totalDuration: 0,
      totalVideos: 0,
      category: 'عام',
      tags: ['مخصص'],
      owner: {
        id: 'user-1',
        name: 'أنت',
        avatar: '/avatars/default-avatar.jpg'
      },
      followers: 0
    };

    setPlaylists([newPlaylist, ...playlists]);
    setCurrentPlaylist(newPlaylist);
  };

  const handleShare = async (video: Video) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: `شاهد "${video.title}" - ${video.description}`,
          url: window.location.origin + video.url
        });
      } catch (error) {
        console.log('مشاركة ملغاة');
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + video.url);
      alert('تم نسخ رابط الفيديو إلى الحافظة!');
    }
  };

  const getVideoProgress = (videoId: string) => {
    return videos.find(v => v.id === videoId)?.progress || 0;
  };

  const getTotalWatchTime = () => {
    return videos.reduce((sum, video) => sum + video.totalWatchTime, 0);
  };

  const getCompletedVideos = () => {
    return videos.filter(v => v.isCompleted).length;
  };

  const getBookmarkedVideos = () => {
    return videos.filter(v => v.isBookmarked).length;
  };

  const filteredPlaylists = playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentVideo = currentPlaylist?.videos[currentVideoIndex] || videos[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              قائمة التشغيل
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            أنشئ وحفظ فيديوهاتك المفضلة في قوائم تشغيل مخصصة وادمج تجربة التعلم الخاصة بك
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <List className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{playlists.length}</div>
            <div className="text-sm text-gray-600 font-medium">قائمة تشغيل</div>
            <div className="mt-2 text-xs text-gray-400">+2 هذا الشهر</div>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{getCompletedVideos()}</div>
            <div className="text-sm text-gray-600 font-medium">فيديوهات مكتملة</div>
            <div className="mt-2 text-xs text-gray-400">%{Math.round((getCompletedVideos() / videos.length) * 100)} من الإجمالي</div>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-300">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Bookmark className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{getBookmarkedVideos()}</div>
            <div className="text-sm text-gray-600 font-medium">فيديوهات محفوظة</div>
            <div className="mt-2 text-xs text-gray-400">للرجوع إليها لاحقًا</div>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Clock className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{Math.round(getTotalWatchTime() / 3600)}</div>
            <div className="text-sm text-gray-600 font-medium">ساعات مشاهدة</div>
            <div className="mt-2 text-xs text-gray-400">إجمالي وقت التعلم</div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border border-gray-200 shadow-xl">
              {/* Video Player */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black">
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    {/* Video Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="relative z-10 text-center">
                      <button
                        onClick={handlePlayPause}
                        className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 group"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </button>
                      <div className="mt-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{currentVideo?.title}</h3>
                        <p className="text-gray-300 text-sm max-w-2xl mx-auto px-4">
                          {currentVideo?.description}
                        </p>
                      </div>
                    </div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
                          {formatTime(currentVideo?.duration || 0)}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
                          <Eye className="w-4 h-4" />
                          {currentVideo?.views.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {currentVideo?.rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>التقدم: {getVideoProgress(currentVideo?.id)}%</span>
                    <span>{formatTime(currentTime)} / {formatTime(currentVideo?.duration || 0)}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                      style={{ width: `${getVideoProgress(currentVideo?.id)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Video Controls and Info */}
              <div className="p-6">
                {/* Main Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      size="lg"
                      disabled={currentVideoIndex === 0}
                      className="gap-2"
                    >
                      <SkipBack className="w-5 h-5" />
                      السابق
                    </Button>

                    <Button
                      onClick={handlePlayPause}
                      variant="primary"
                      size="lg"
                      className="px-8 gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5" />
                          إيقاف
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          تشغيل
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={handleNext}
                      variant="outline"
                      size="lg"
                      disabled={currentVideoIndex === videos.length - 1}
                      className="gap-2"
                    >
                      التالي
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleShuffle}
                      variant={isShuffled ? "primary" : "outline"}
                      size="sm"
                      className="gap-2"
                    >
                      <Shuffle className="w-4 h-4" />
                      {isShuffled ? 'مرتب' : 'عشوائي'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Repeat className="w-4 h-4" />
                      تكرار
                    </Button>
                  </div>
                </div>

                {/* Secondary Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        سرعة التشغيل
                      </label>
                      <div className="flex items-center gap-3">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => setPlaybackRate(rate)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              playbackRate === rate
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مستوى الصوت
                    </label>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600"
                      />
                      <span className="text-sm text-gray-600 min-w-[40px]">
                        {Math.round(volume * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Details */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        تفاصيل الفيديو
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {currentVideo?.instructor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(currentVideo?.lastWatched || new Date().toISOString())}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          currentVideo?.isCompleted 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {currentVideo?.isCompleted ? 'مكتمل' : 'قيد التقدم'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleBookmark(currentVideo)}
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${currentVideo?.isBookmarked ? 'text-blue-600 border-blue-600' : ''}`}
                      >
                        <Bookmark className={`w-4 h-4 ${currentVideo?.isBookmarked ? 'text-blue-600 fill-current' : ''}`} />
                        {currentVideo?.isBookmarked ? 'محفوظ' : 'حفظ'}
                      </Button>
                      <Button
                        onClick={() => handleShare(currentVideo)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        مشاركة
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {currentVideo?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Category and Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">التصنيف</div>
                      <div className="font-medium text-gray-900">{currentVideo?.category}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">المشاهدات</div>
                      <div className="font-medium text-gray-900">
                        {currentVideo?.views?.toLocaleString() || 0}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">التقييم</div>
                      <div className="font-medium text-gray-900 flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {currentVideo?.rating?.toFixed(1) || '0.0'}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">المدة</div>
                      <div className="font-medium text-gray-900">
                        {formatTime(currentVideo?.duration || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            {/* Current Playlist */}
            <Card className="border border-gray-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <List className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {currentPlaylist?.name || 'قائمة التشغيل الحالية'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {currentPlaylist?.totalVideos || 0} فيديو
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleCreatePlaylist}
                    variant="primary"
                    size="sm"
                    className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                    جديد
                  </Button>
                </div>

                {/* Playlist Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <p className="text-gray-700 text-sm mb-3">
                    {currentPlaylist?.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-gray-600">
                        {currentPlaylist?.isPublic ? (
                          <>
                            <Globe className="w-4 h-4 text-green-600" />
                            عام
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-gray-500" />
                            خاص
                          </>
                        )}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        {currentPlaylist?.followers?.toLocaleString() || 0}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {formatDate(currentPlaylist?.created || '')}
                    </span>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="البحث في قوائم التشغيل..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                    >
                      <option value="recent">الأحدث مشاهدة</option>
                      <option value="oldest">الأقدم مشاهدة</option>
                      <option value="title">حسب العنوان</option>
                      <option value="duration">حسب المدة</option>
                      <option value="rating">حسب التقييم</option>
                    </select>
                  </div>
                </div>

                {/* Playlists List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {filteredPlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      onClick={() => {
                        setCurrentPlaylist(playlist);
                        setCurrentVideoIndex(0);
                      }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        currentPlaylist?.id === playlist.id
                          ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-blue-25 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          currentPlaylist?.id === playlist.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <List className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 truncate">
                              {playlist.name}
                            </h4>
                            <ChevronRight className={`w-4 h-4 transition-transform ${
                              currentPlaylist?.id === playlist.id ? 'text-blue-600 rotate-90' : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{playlist.videos.length} فيديو</span>
                            <span>•</span>
                            <span>{formatTime(playlist.totalDuration)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {playlist.followers}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600 line-clamp-2">
                        {playlist.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Videos List */}
            <Card className="border border-gray-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    الفيديوهات ({videos.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setViewMode('grid')}
                      variant={viewMode === 'grid' ? 'primary' : 'outline'}
                      size="sm"
                      className="gap-1"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setViewMode('list')}
                      variant={viewMode === 'list' ? 'primary' : 'outline'}
                      size="sm"
                      className="gap-1"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`group cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:shadow-lg ${
                        currentVideo?.id === video.id
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-25'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                            {formatTime(video.duration)}
                          </div>
                          {video.isCompleted && (
                            <div className="absolute top-1 right-1 bg-green-500 text-white p-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600">
                              {video.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(video);
                              }}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Bookmark className={`w-4 h-4 ${
                                video.isBookmarked ? 'text-blue-600 fill-current' : ''
                              }`} />
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {video.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{video.instructor}</span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                {video.rating.toFixed(1)}
                              </span>
                            </div>
                            
                            <div className="text-xs text-gray-500">
                              {Math.round(video.progress)}%
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                              style={{ width: `${video.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}