"use client";

import { useState, useEffect } from 'react';
import { 
  Play, Pause, Plus, Clock, Bookmark, 
  Share2, Eye, Search, List, Grid, CheckCircle, Star,
  SkipForward, SkipBack, Shuffle, Volume2, Repeat
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
}

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'newest' | 'title' | 'duration' | 'rating'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock data
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'مقدمة في React.js - المقدمة 1: المفاهيم الأساسية',
      description: 'مقدمة في المفاهيم الأساسية لـ React.js بما في المكونات والحالة والخصائص',
      duration: 720,
      url: '/videos/react-basics-1.mp4',
      thumbnail: '/thumbnails/react-basics-1.jpg',
      instructor: 'أحمد محمد',
      category: 'برمجة',
      tags: ['React', 'JavaScript', 'Frontend'],
      isCompleted: true,
      progress: 100,
      lastWatched: '2024-03-15T10:30:00Z',
      totalWatchTime: 720,
      isBookmarked: true,
      rating: 4.8
    },
    {
      id: '2',
      title: 'مقدمة في React.js - المقدمة 2: المكونات المتقدمة',
      description: 'تعمق في المكونات المتقدمة مثل Hooks وContext و Redux',
      duration: 900,
      url: '/videos/react-basics-2.mp4',
      thumbnail: '/thumbnails/react-basics-2.jpg',
      instructor: 'أحمد محمد',
      category: 'برمجة',
      tags: ['React', 'Hooks', 'State Management'],
      isCompleted: false,
      progress: 75,
      lastWatched: '2024-03-14T14:45:00Z',
      totalWatchTime: 675,
      isBookmarked: false,
      rating: 4.9
    },
    {
      id: '3',
      title: 'مقدمة في React.js - المقدمة 3: التطبيقات المتقدمة',
      description: 'تطبيق التطبيقات المتقدمة مثل التوجيه عالي المستخدم والتعامل مع Forms',
      duration: 600,
      url: '/videos/react-basics-3.mp4',
      thumbnail: '/thumbnails/react-basics-3.jpg',
      instructor: 'أحمد محمد',
      category: 'برمجة',
      tags: ['React', 'Forms', 'Events'],
      isCompleted: false,
      progress: 45,
      lastWatched: '2024-03-13T12:20:00Z',
      totalWatchTime: 270,
      isBookmarked: true,
      rating: 4.7
    }
  ]);

  useEffect(() => {
    const defaultPlaylist: Playlist = {
      id: 'playlist-default-react',
      name: 'مقدمة في React.js',
      description: 'جميع فيديوهات دورة React.js من البداية إلى الاحتراف',
      videos: videos,
      isPublic: true,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      totalDuration: videos.reduce((sum, video) => sum + video.duration, 0),
      totalVideos: videos.length,
      category: 'برمجة',
      tags: ['React', 'Frontend', 'JavaScript'],
      owner: {
        id: 'user-1',
        name: 'المستخدم الافتراضي',
        avatar: '/avatars/default-avatar.jpg'
      }
    };

    setPlaylists([defaultPlaylist]);
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
      category: 'general',
      tags: [],
      owner: {
        id: 'user-1',
        name: 'المستخدم الافتراضي',
        avatar: '/avatars/default-avatar.jpg'
      }
    };

    setPlaylists([...playlists, newPlaylist]);
    setCurrentPlaylist(newPlaylist);
  };

  const handleShare = (video: Video) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `شاهد "${video.title}" - ${video.description}`,
        url: video.url
      });
    } else {
      navigator.clipboard.writeText(video.url);
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
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentVideo = currentPlaylist?.videos[currentVideoIndex] || null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">قائمة التشغيل</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            أنشئ وحفظ فيديوهاتك المفضلة في قوائم تشغيل مخصصة
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <List size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{playlists.length}</div>
            <div className="text-sm text-gray-600">قائمة تشغيل</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{getCompletedVideos()}</div>
            <div className="text-sm text-gray-600">فيديوهات مكتملة</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bookmark size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{getBookmarkedVideos()}</div>
            <div className="text-sm text-gray-600">فيديوهات محفوظة</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{Math.round(getTotalWatchTime() / 60)} دقيقة</div>
            <div className="text-sm text-gray-600">إجمالي مشاهدة</div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <Play size={48} className="text-white opacity-50" />
                  <p className="text-white text-center">مشغل الفيديو</p>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {currentVideo?.title || 'اختر فيديو للعرض'}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{currentVideo?.duration ? formatTime(currentVideo.duration) : '--:--'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{currentVideo?.totalWatchTime ? formatTime(currentVideo.totalWatchTime) : '--:--'}</span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getVideoProgress(currentVideo?.id || '')}%` }}
                  ></div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    size="sm"
                    disabled={currentVideoIndex === 0}
                  >
                    <SkipBack size={20} />
                  </Button>

                  <Button
                    onClick={handlePlayPause}
                    variant="primary"
                    size="lg"
                    className="px-8"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </Button>

                  <Button
                    onClick={handleNext}
                    variant="outline"
                    size="sm"
                    disabled={currentVideoIndex === videos.length - 1}
                  >
                    <SkipForward size={20} />
                  </Button>
                </div>

                {/* Additional Controls */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Button
                    onClick={() => handleShuffle()}
                    variant="outline"
                    size="sm"
                    className={isShuffled ? 'bg-blue-600 text-white' : ''}
                  >
                    <Shuffle size={16} className="mr-2" />
                    {isShuffled ? 'إلغاء الترتيب' : 'ترتيب عشوائي'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Repeat size={16} className="mr-2" />
                    إعادة التشغيل
                  </Button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">السرعة التشغيل:</span>
                    <select
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">الصوت:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>

                {/* Video Description */}
                <div className="text-gray-600 text-sm mb-4">
                  {currentVideo?.description}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentVideo?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills and Rating */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {currentVideo?.rating?.toFixed(1) || '0.0'} / 5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleBookmark(currentVideo!)}
                      variant="outline"
                      size="sm"
                      className={currentVideo?.isBookmarked ? 'text-blue-600 border-blue-600' : ''}
                    >
                      <Bookmark className={`w-4 h-4 ${currentVideo?.isBookmarked ? 'text-blue-600' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      onClick={() => handleShare(currentVideo!)}
                      variant="outline"
                      size="sm"
                    >
                      <Share2 size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Card>
          </div>

          {/* Playlist Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {currentPlaylist?.name || 'اختر قائمة تشغيل'}
                </h3>
                <Button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  variant="outline"
                  size="sm"
                >
                  <List size={16} className="ml-2" />
                  {showPlaylist ? 'إخفاء القائمة' : 'عرض القائمة'}
                </Button>
              </div>

              {showPlaylist && (
                <div className="space-y-4">
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="البحث في القائمة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="recent">الأحدث مشاهدة</option>
                      <option value="oldest">الأقدم مشاهدة</option>
                      <option value="newest">الأحدث أولاً</option>
                      <option value="title">العنوان</option>
                      <option value="duration">المدة</option>
                      <option value="rating">التقييم</option>
                    </select>

                    <Button
                      onClick={handleCreatePlaylist}
                      variant="primary"
                      size="sm"
                    >
                      <Plus size={16} className="ml-2" />
                      إنشاء قائمة جديدة
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {filteredPlaylists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          currentPlaylist?.id === playlist.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => {
                          setCurrentPlaylist(playlist);
                          setCurrentVideoIndex(0);
                          setIsPlaying(true);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <List size={20} className="text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900">{playlist.name}</h4>
                            <p className="text-sm text-gray-600">{playlist.videos.length} فيديو</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {playlist.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Video List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {currentPlaylist?.name || 'كل الفيديوهات'}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                  >
                    <Grid size={16} className="ml-2" />
                    عرض شبكي
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                  >
                    <List size={16} className="ml-2" />
                    عرض قائمة
                  </Button>
                </div>
              </div>

              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 ${
                      currentVideo?.id === video.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                      <div className="w-full h-32 bg-gray-300 flex items-center justify-center">
                        <Play size={24} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {video.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatTime(video.duration)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        video.isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {video.isCompleted ? 'مكتمل' : 'لم يكتمل بعد'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleBookmark(video)}
                        variant="outline"
                        size="sm"
                        className={`w-8 h-8 ${video.isBookmarked ? 'text-blue-600' : 'text-gray-400'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${video.isBookmarked ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        onClick={() => handleShare(video)}
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 text-gray-400"
                      >
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
