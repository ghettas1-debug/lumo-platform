'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Crown, Star, TrendingUp, Users, Calendar, Clock, Target, Flame, Zap, BookOpen, CheckCircle, Filter, Search, ChevronDown, User, Shield, Gem } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  previousRank: number;
  points: number;
  level: number;
  studyTime: number;
  coursesCompleted: number;
  streak: number;
  badges: Badge[];
  achievements: Achievement[];
  joinDate: string;
  lastActive: string;
  role: 'student' | 'instructor' | 'admin';
  category: string;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  icon: string;
  rarity: string;
}

interface LeaderboardCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('overall');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year' | 'all-time'>('all-time');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  const categories: LeaderboardCategory[] = [
    {
      id: 'overall',
      name: 'التصنيف العام',
      description: 'أفضل المستخدمين بناءً على النقاط الإجمالية',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
    },
    {
      id: 'study-time',
      name: 'وقت الدراسة',
      description: 'أكثر المستخدمين وقتاً في الدراسة',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    },
    {
      id: 'courses',
      name: 'إتمام الدورات',
      description: 'أكثر المستخدمين إكمالاً للدورات',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      id: 'streak',
      name: 'سلسلة الحضور',
      description: 'أطول سلسلة حضور يومي',
      icon: <Flame className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    },
    {
      id: 'achievements',
      name: 'الإنجازات',
      description: 'أكثر المستخدمين إنجازات',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    }
  ];

  useEffect(() => {
    // Load leaderboard data from localStorage
    const savedUsers = localStorage.getItem('leaderboardUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with sample data
      const sampleUsers: LeaderboardUser[] = [
        {
          id: '1',
          name: 'أحمد محمد',
          avatar: '/avatars/user1.jpg',
          rank: 1,
          previousRank: 2,
          points: 15420,
          level: 45,
          studyTime: 2340, // 39 hours
          coursesCompleted: 12,
          streak: 28,
          badges: [
            { id: '1', name: 'نجم الأسبوع', icon: '⭐', color: 'bg-yellow-500' },
            { id: '2', name: 'خبير', icon: '💎', color: 'bg-purple-500' },
            { id: '3', name: 'مساعد', icon: '🤝', color: 'bg-blue-500' }
          ],
          achievements: [
            { id: '1', title: 'بداية قوية', icon: '🎯', rarity: 'common' },
            { id: '2', title: 'متعلم منتظم', icon: '🔥', rarity: 'rare' },
            { id: '3', title: 'خبير JavaScript', icon: '💎', rarity: 'epic' }
          ],
          joinDate: '2023-06-15T00:00:00Z',
          lastActive: '2024-03-15T14:30:00Z',
          role: 'student',
          category: 'برمجة'
        },
        {
          id: '2',
          name: 'سارة أحمد',
          avatar: '/avatars/user2.jpg',
          rank: 2,
          previousRank: 1,
          points: 14890,
          level: 42,
          studyTime: 2100, // 35 hours
          coursesCompleted: 11,
          streak: 21,
          badges: [
            { id: '1', name: 'متفوق', icon: '🏆', color: 'bg-yellow-500' },
            { id: '2', name: 'نشط', icon: '⚡', color: 'bg-green-500' }
          ],
          achievements: [
            { id: '1', title: 'أول دورة', icon: '🎓', rarity: 'common' },
            { id: '2', title: 'أسبوع ذهبي', icon: '🏅', rarity: 'rare' }
          ],
          joinDate: '2023-07-20T00:00:00Z',
          lastActive: '2024-03-15T16:45:00Z',
          role: 'instructor',
          category: 'تصميم'
        },
        {
          id: '3',
          name: 'محمد علي',
          avatar: '/avatars/user3.jpg',
          rank: 3,
          previousRank: 4,
          points: 13560,
          level: 38,
          studyTime: 1980, // 33 hours
          coursesCompleted: 10,
          streak: 18,
          badges: [
            { id: '1', name: 'مبتدئ', icon: '🌱', color: 'bg-green-500' },
            { id: '2', name: 'سريع', icon: '🚀', color: 'bg-red-500' }
          ],
          achievements: [
            { id: '1', title: 'سريع التعلم', icon: '⚡', rarity: 'rare' },
            { id: '2', title: 'مثابر', icon: '💪', rarity: 'common' }
          ],
          joinDate: '2023-08-10T00:00:00Z',
          lastActive: '2024-03-15T12:20:00Z',
          role: 'student',
          category: 'تطوير'
        },
        {
          id: '4',
          name: 'فاطمة سعيد',
          avatar: '/avatars/user4.jpg',
          rank: 4,
          previousRank: 6,
          points: 12890,
          level: 35,
          studyTime: 1860, // 31 hours
          coursesCompleted: 9,
          streak: 15,
          badges: [
            { id: '1', name: 'مبدعة', icon: '🎨', color: 'bg-purple-500' },
            { id: '2', name: 'مثابرة', icon: '🔥', color: 'bg-orange-500' }
          ],
          achievements: [
            { id: '1', title: 'فنان', icon: '🎨', rarity: 'epic' },
            { id: '2', title: 'دقيقة', icon: '⏰', rarity: 'common' }
          ],
          joinDate: '2023-09-05T00:00:00Z',
          lastActive: '2024-03-15T18:10:00Z',
          role: 'student',
          category: 'تصميم'
        },
        {
          id: '5',
          name: 'عمر خالد',
          avatar: '/avatars/user5.jpg',
          rank: 5,
          previousRank: 3,
          points: 12340,
          level: 33,
          studyTime: 1740, // 29 hours
          coursesCompleted: 8,
          streak: 12,
          badges: [
            { id: '1', name: 'محترف', icon: '💼', color: 'bg-blue-500' },
            { id: '2', name: 'سريع', icon: '⚡', color: 'bg-yellow-500' }
          ],
          achievements: [
            { id: '1', title: 'محترف', icon: '💼', rarity: 'rare' },
            { id: '2', title: 'منظم', icon: '📋', rarity: 'common' }
          ],
          joinDate: '2023-10-12T00:00:00Z',
          lastActive: '2024-03-15T11:30:00Z',
          role: 'student',
          category: 'برمجة'
        },
        {
          id: 'current-user',
          name: 'المستخدم الحالي',
          avatar: '/avatars/current.jpg',
          rank: 12,
          previousRank: 15,
          points: 8760,
          level: 25,
          studyTime: 1560, // 26 hours
          coursesCompleted: 5,
          streak: 8,
          badges: [
            { id: '1', name: 'جديد', icon: '🌟', color: 'bg-green-500' }
          ],
          achievements: [
            { id: '1', title: 'بداية جيدة', icon: '👍', rarity: 'common' }
          ],
          joinDate: '2024-01-15T00:00:00Z',
          lastActive: '2024-03-15T10:00:00Z',
          role: 'student',
          category: 'برمجة'
        }
      ];
      setUsers(sampleUsers);
      setCurrentUserRank(12);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('leaderboardUsers', JSON.stringify(users));
    }
  }, [users]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-400">{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getRankChange = (currentRank: number, previousRank: number) => {
    if (currentRank < previousRank) {
      return { icon: <TrendingUp className="w-4 h-4 text-green-500" />, text: `+${previousRank - currentRank}`, color: 'text-green-500' };
    } else if (currentRank > previousRank) {
      return { icon: <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />, text: `-${currentRank - previousRank}`, color: 'text-red-500' };
    }
    return { icon: <div className="w-4 h-4" />, text: '-', color: 'text-gray-500' };
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'الآن';
    if (diffInMins < 60) return `منذ ${diffInMins} دقيقة`;
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
    return formatDate(dateString);
  };

  const getSortedUsers = () => {
    let sortedUsers = [...users];
    
    // Apply category sorting
    switch (selectedCategory) {
      case 'study-time':
        sortedUsers.sort((a, b) => b.studyTime - a.studyTime);
        break;
      case 'courses':
        sortedUsers.sort((a, b) => b.coursesCompleted - a.coursesCompleted);
        break;
      case 'streak':
        sortedUsers.sort((a, b) => b.streak - a.streak);
        break;
      case 'achievements':
        sortedUsers.sort((a, b) => b.achievements.length - a.achievements.length);
        break;
      default:
        sortedUsers.sort((a, b) => b.points - a.points);
    }
    
    // Apply search filter
    if (searchQuery) {
      sortedUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return sortedUsers;
  };

  const sortedUsers = getSortedUsers();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <Trophy className="w-6 h-6" />
                <span>لوحة المتصدرين</span>
              </h1>
              {currentUserRank && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ترتيبك: #{currentUserRank}
                </span>
              )}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث في المتصدرين..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذه السنة</option>
                <option value="all-time">كل الوقت</option>
              </select>
            </div>
          </div>
        )}

        {/* Top 3 Winners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sortedUsers.slice(0, 3).map((user, index) => (
            <div key={user.id} className={`relative ${index === 1 ? 'md:scale-105' : ''}`}>
              <div className={`bg-gradient-to-br ${
                index === 0 ? 'from-yellow-400 to-yellow-600' :
                index === 1 ? 'from-gray-300 to-gray-500' :
                'from-orange-400 to-orange-600'
              } rounded-lg p-1`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800"
                      />
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(index + 1)}`}>
                        {getRankIcon(index + 1)}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{user.category}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 space-x-reverse">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">نقطة</span>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                        <span>المستوى {user.level}</span>
                        <span>•</span>
                        <span>{user.coursesCompleted} دورة</span>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-1 space-x-reverse">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">{user.streak} يوم</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4 space-x-1 space-x-reverse">
                      {user.badges.slice(0, 3).map((badge) => (
                        <div key={badge.id} className={`w-6 h-6 rounded-full ${badge.color} flex items-center justify-center text-xs`}>
                          {badge.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    الترتيب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    النقاط
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    المستوى
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    وقت الدراسة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    الدورات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    السلسلة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    آخر نشاط
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedUsers.map((user) => {
                  const rankChange = getRankChange(user.rank, user.previousRank);
                  const isCurrentUser = user.id === 'current-user';
                  
                  return (
                    <tr key={user.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getRankIcon(user.rank)}
                          {rankChange.icon && (
                            <div className={`flex items-center space-x-1 space-x-reverse ${rankChange.color}`}>
                              {rankChange.icon}
                              <span className="text-xs">{rankChange.text}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <h4 className="font-medium">{user.name}</h4>
                              {isCurrentUser && (
                                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                                  أنت
                                </span>
                              )}
                              {user.role === 'instructor' && (
                                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{user.points.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {user.level}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(user.studyTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {user.coursesCompleted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">{user.streak}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {getRelativeTime(user.lastActive)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">متوسط النقاط</p>
                <p className="text-2xl font-bold">
                  {Math.round(users.reduce((acc, user) => acc + user.points, 0) / users.length).toLocaleString()}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي وقت الدراسة</p>
                <p className="text-2xl font-bold">
                  {formatTime(users.reduce((acc, user) => acc + user.studyTime, 0))}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">الدورات المكتملة</p>
                <p className="text-2xl font-bold">
                  {users.reduce((acc, user) => acc + user.coursesCompleted, 0)}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
