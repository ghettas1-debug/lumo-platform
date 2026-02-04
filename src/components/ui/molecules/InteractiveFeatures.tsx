'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, Share2, Bookmark, Play, Pause, Volume2, VolumeX, Maximize, Settings, ChevronLeft, ChevronRight, X, ThumbsUp, MessageCircle, Eye, Clock, TrendingUp, Filter, Grid, List, Users, BookOpen, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/atoms/Badge';
import { Card, CardContent } from '@/components/ui/atoms/Card';
import { cn } from '@/lib/utils';

// Interactive Video Player Component
export const VideoPlayer = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        onTimeUpdate={handleProgress}
        onMouseMove={() => setShowControls(true)}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Controls Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
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
          <div className="flex items-center gap-4 text-white">
            {/* Progress Bar */}
            <div className="flex-1">
              <div className="w-full bg-white/30 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>
              
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Course Card with Actions
export const InteractiveCourseCard = ({ course }: { course: any }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = async (platform: string) => {
    try {
      // Share functionality
      const shareData = {
        title: 'منصة Lumo التعليمية',
        text: 'اكتشف أفضل الدورات التعليمية على منصة Lumo',
        url: window.location.href
      };

      if (navigator.share && platform === 'native') {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard for other platforms
        const { copyToClipboard } = await import('@/lib/utils');
        await copyToClipboard(window.location.href);
      }
      
      setShowShareMenu(false);
    } catch (error) {
      console.warn('Share failed:', error);
      // Still close the menu even if sharing fails
      setShowShareMenu(false);
    }
  };

  return (
    <Card className="group hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-4">
        {/* Course Image with Overlay */}
        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                'p-2 rounded-lg backdrop-blur-sm transition-all duration-300',
                isLiked ? 'bg-red-500/80 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-500/80 hover:text-white'
              )}
            >
              <Heart className={cn('w-4 h-4', isLiked ? 'fill-current' : '')} />
            </button>
            
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                'p-2 rounded-lg backdrop-blur-sm transition-all duration-300',
                isBookmarked ? 'bg-blue-500/80 text-white' : 'bg-white/80 text-gray-700 hover:bg-blue-500/80 hover:text-white'
              )}
            >
              <Bookmark className={cn('w-4 h-4', isBookmarked ? 'fill-current' : '')} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-lg bg-white/80 text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => handleShare(platform)}
                      className="w-full text-right px-4 py-2 hover:bg-gray-50 text-sm first:rounded-t-lg last:rounded-b-lg"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-blue-600 ml-1" />
            </button>
          </div>
        </div>

        {/* Course Info */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{course.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{course.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{course.comments}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            ابدأ الدورة
          </Button>
          <Button variant="outline" size="sm">
            معاينة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Interactive Search with Live Results
export const InteractiveSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    rating: number;
    students: number;
    price: number;
    image: string;
    instructor: string;
    duration: string;
  }>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults([
        { 
          id: '1', 
          title: 'تطوير الويب الكامل', 
          description: 'تعلم تطوير الويب من الصفر',
          category: 'برمجة', 
          level: 'مبتدئ',
          rating: 4.5,
          students: 1200,
          price: 99,
          image: '/course1.jpg',
          instructor: 'أحمد محمد',
          duration: '40 ساعة'
        },
        { 
          id: '2', 
          title: 'إدارة الأعمال', 
          description: 'أساسيات إدارة الأعمال الحديثة',
          category: 'إدارة', 
          level: 'متوسط',
          rating: 4.7,
          students: 800,
          price: 149,
          image: '/course2.jpg',
          instructor: 'سارة أحمد',
          duration: '30 ساعة'
        },
        { 
          id: '3', 
          title: 'الذكاء الاصطناعي', 
          description: 'مقدمة في الذكاء الاصطناعي وتطبيقاته',
          category: 'تقنية', 
          level: 'متقدم',
          rating: 4.9,
          students: 2000,
          price: 199,
          image: '/course3.jpg',
          instructor: 'محمد علي',
          duration: '50 ساعة'
        },
      ]);
      setIsSearching(false);
      setShowResults(true);
    }, 500);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="ابحث عن دورات، مدربين، أو مواضيع..."
          className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          onFocus={() => setShowResults(true)}
        />
        {isSearching && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 font-medium mb-2 px-2">نتائج البحث</div>
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="text-right">
                  <div className="font-medium text-gray-900">{result.title}</div>
                  <div className="text-sm text-gray-600">{result.category} • {result.level}</div>
                </div>
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Interactive Filter Tabs
export const InteractiveFilterTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tabs = [
    { id: 'all', label: 'الكل', count: 1247 },
    { id: 'programming', label: 'البرمجة', count: 423 },
    { id: 'business', label: 'الأعمال', count: 312 },
    { id: 'design', label: 'التصميم', count: 289 },
    { id: 'marketing', label: 'التسويق', count: 156 },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300',
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
            <span className="mr-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setViewMode('grid')}
          className={cn(
            'p-2 rounded transition-all duration-300',
            viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          )}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={cn(
            'p-2 rounded transition-all duration-300',
            viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
          )}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Interactive Stats Counter
export const InteractiveStats = () => {
  const [stats, setStats] = useState([
    { label: 'متعلم', value: 0, target: 50000000, suffix: '+', icon: Users },
    { label: 'دورة', value: 0, target: 6000, suffix: '+', icon: BookOpen },
    { label: 'خريج', value: 0, target: 15000000, suffix: '+', icon: Award },
    { label: 'دولة', value: 0, target: 193, suffix: '', icon: Globe },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: Math.min(stat.target, stat.value + Math.ceil(stat.target / 50))
        }))
      );
    }, 50);

    return () => clearTimeout(timer);
  }, [stats]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <stat.icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(stat.value)}{stat.suffix}
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
