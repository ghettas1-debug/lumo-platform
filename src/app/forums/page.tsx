'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Filter, Plus, ThumbsUp, ThumbsDown, Reply, Bookmark, Share2, Flag, Clock, Eye, User, Hash, TrendingUp, Pin, Lock, CheckCircle, AlertCircle, Calendar, Users, BarChart3, Star, Award, ChevronDown, X, Edit, Trash2, Send, Paperclip, Image, Smile, MoreVertical } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'instructor' | 'admin';
    reputation: number;
    badges: string[];
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  replies: number;
  likes: number;
  isPinned: boolean;
  isLocked: boolean;
  isSolved: boolean;
  lastReply?: {
    author: string;
    timestamp: string;
  };
  attachments: string[];
}

interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'instructor' | 'admin';
    reputation: number;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  isAnswer: boolean;
  parentId?: string;
  attachments: string[];
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  postCount: number;
  lastActivity: string;
}

export default function ForumsPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered' | 'pinned'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [] as string[]
  });

  useEffect(() => {
    // Load data from localStorage
    const savedPosts = localStorage.getItem('forumPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with sample posts
      const samplePosts: ForumPost[] = [
        {
          id: '1',
          title: 'كيف أبدأ تعلم React.js من الصفر؟',
          content: 'أنا جديد في عالم البرمجة وأريد تعلم React.js. ما هي أفضل الموارد والخطوات التي يجب أن أتبعها؟',
          author: {
            id: 'user-1',
            name: 'أحمد محمد',
            avatar: '/avatars/user1.jpg',
            role: 'student',
            reputation: 150,
            badges: ['مبتدئ', 'نشط']
          },
          category: 'general',
          tags: ['React', 'JavaScript', 'مبتدئ'],
          createdAt: '2024-03-15T10:30:00Z',
          updatedAt: '2024-03-15T10:30:00Z',
          views: 245,
          replies: 12,
          likes: 18,
          isPinned: true,
          isLocked: false,
          isSolved: true,
          lastReply: {
            author: 'سارة أحمد',
            timestamp: '2024-03-15T14:20:00Z'
          },
          attachments: []
        },
        {
          id: '2',
          title: 'مشكلة في useState Hook',
          content: 'أواجه مشكلة في استخدام useState Hook في مشروعي. عندما أحاول تحديث الحالة، لا يتم إعادة تصيير المكون بشكل صحيح.',
          author: {
            id: 'user-2',
            name: 'محمد علي',
            avatar: '/avatars/user2.jpg',
            role: 'student',
            reputation: 320,
            badges: ['مساعد', 'خبير']
          },
          category: 'technical',
          tags: ['React', 'Hooks', 'useState', 'مشاكل'],
          createdAt: '2024-03-14T16:45:00Z',
          updatedAt: '2024-03-14T16:45:00Z',
          views: 189,
          replies: 8,
          likes: 12,
          isPinned: false,
          isLocked: false,
          isSolved: false,
          lastReply: {
            author: 'خالد سعيد',
            timestamp: '2024-03-15T09:15:00Z'
          },
          attachments: ['/images/code-screenshot.png']
        },
        {
          id: '3',
          title: 'أفضل الممارسات في تطوير الويب',
          content: 'أشارككم بعض أفضل الممارسات التي تعلمتها خلال مسيرتي في تطوير الويب. هذه النصائح ساعدتني كثيراً في تحسين جودة الكود.',
          author: {
            id: 'instructor-1',
            name: 'سارة أحمد',
            avatar: '/avatars/instructor1.jpg',
            role: 'instructor',
            reputation: 1250,
            badges: ['مدرب', 'خبير', 'مساهم']
          },
          category: 'best-practices',
          tags: ['أفضل الممارسات', 'ويب', 'نصائح'],
          createdAt: '2024-03-13T11:20:00Z',
          updatedAt: '2024-03-13T11:20:00Z',
          views: 567,
          replies: 24,
          likes: 45,
          isPinned: false,
          isLocked: false,
          isSolved: false,
          lastReply: {
            author: 'نور الدين',
            timestamp: '2024-03-15T12:30:00Z'
          },
          attachments: []
        }
      ];
      setPosts(samplePosts);
    }

    const savedReplies = localStorage.getItem('forumReplies');
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    } else {
      const sampleReplies: ForumReply[] = [
        {
          id: '1',
          postId: '1',
          content: 'أوصي بالبدء بـ JavaScript الأساسي أولاً، ثم الانتقال إلى React. دورة React.js على المنصة ممتازة للمبتدئين!',
          author: {
            id: 'instructor-1',
            name: 'سارة أحمد',
            avatar: '/avatars/instructor1.jpg',
            role: 'instructor',
            reputation: 1250
          },
          createdAt: '2024-03-15T11:45:00Z',
          updatedAt: '2024-03-15T11:45:00Z',
          likes: 15,
          isAnswer: true,
          attachments: []
        }
      ];
      setReplies(sampleReplies);
    }

    const sampleCategories: ForumCategory[] = [
      {
        id: 'general',
        name: 'مناقشات عامة',
        description: 'مواضيع عامة ومتنوعة في عالم البرمجة',
        icon: <MessageSquare className="w-6 h-6" />,
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
        postCount: 156,
        lastActivity: 'منذ 10 دقائق'
      },
      {
        id: 'technical',
        name: 'أسئلة تقنية',
        description: 'المساعدة في حل المشاكل التقنية والأخطاء',
        icon: <AlertCircle className="w-6 h-6" />,
        color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
        postCount: 89,
        lastActivity: 'منذ 5 دقائق'
      },
      {
        id: 'best-practices',
        name: 'أفضل الممارسات',
        description: 'نصائح وحيل لتحسين مهارات البرمجة',
        icon: <Star className="w-6 h-6" />,
        color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
        postCount: 67,
        lastActivity: 'منذ ساعة'
      },
      {
        id: 'projects',
        name: 'المشاريع',
        description: 'عرض ومناقشة المشاريع البرمجية',
        icon: <Award className="w-6 h-6" />,
        color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
        postCount: 34,
        lastActivity: 'منذ يومين'
      }
    ];
    setCategories(sampleCategories);
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('forumPosts', JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    if (replies.length > 0) {
      localStorage.setItem('forumReplies', JSON.stringify(replies));
    }
  }, [replies]);

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleLikeReply = (replyId: string) => {
    setReplies(replies.map(reply => 
      reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        id: 'current-user',
        name: 'المستخدم الحالي',
        avatar: '/avatars/current.jpg',
        role: 'student',
        reputation: 50,
        badges: ['جديد']
      },
      category: newPost.category,
      tags: newPost.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      replies: 0,
      likes: 0,
      isPinned: false,
      isLocked: false,
      isSolved: false,
      attachments: []
    };

    setPosts([post, ...posts]);
    setShowNewPost(false);
    setNewPost({
      title: '',
      content: '',
      category: 'general',
      tags: []
    });
  };

  const handleReply = () => {
    if (!replyContent || !selectedPost) return;

    const reply: ForumReply = {
      id: Date.now().toString(),
      postId: selectedPost.id,
      content: replyContent,
      author: {
        id: 'current-user',
        name: 'المستخدم الحالي',
        avatar: '/avatars/current.jpg',
        role: 'student',
        reputation: 50
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      isAnswer: false,
      attachments: []
    };

    setReplies([...replies, reply]);
    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { 
            ...post, 
            replies: post.replies + 1,
            lastReply: {
              author: 'المستخدم الحالي',
              timestamp: new Date().toISOString()
            }
          } 
        : post
    ));
    setReplyContent('');
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'unanswered':
        return a.replies - b.replies;
      case 'pinned':
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      default:
        return 0;
    }
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'instructor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'instructor':
        return 'مدرب';
      case 'admin':
        return 'مدير';
      default:
        return 'طالب';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'الآن';
    if (diffInMins < 60) return `منذ ${diffInMins} دقيقة`;
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <MessageSquare className="w-6 h-6" />
                <span>منتديات النقاش</span>
              </h1>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {posts.length} مناقشة
              </span>
            </div>
            
            <button
              onClick={() => setShowNewPost(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <Plus className="w-4 h-4" />
              <span>مناقشة جديدة</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    {category.postCount} مناقشة
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                آخر نشاط: {category.lastActivity}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث في المنتديات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الفئات</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">الأحدث</option>
                <option value="popular">الأكثر شعبية</option>
                <option value="unanswered">بدون إجابة</option>
                <option value="pinned">المثبتة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">لا توجد مناقشات مطابقة</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          {post.isPinned && <Pin className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                          {post.isLocked && <Lock className="w-4 h-4 text-red-600 dark:text-red-400" />}
                          {post.isSolved && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
                          <h3 
                            className="font-semibold text-lg hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                            onClick={() => setSelectedPost(post)}
                          >
                            {post.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span>{post.author.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(post.author.role)}`}>
                            {getRoleText(post.author.role)}
                          </span>
                          <span>•</span>
                          <span>{formatTimestamp(post.createdAt)}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1 space-x-reverse">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <span className="flex items-center space-x-1 space-x-reverse">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.replies}</span>
                            </span>
                            <button className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {post.lastReply && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              آخر رد: {post.lastReply.author} • {formatTimestamp(post.lastReply.timestamp)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">مناقشة جديدة</h2>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">العنوان</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اكتب عنواناً واضحاً..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">المحتوى</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                    placeholder="اكتب محتوى مناقشتك بالتفصيل..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">الوسوم (افصل بينها بفاصلة)</label>
                  <input
                    type="text"
                    value={newPost.tags.join(', ')}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, JavaScript, مساعدة"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  نشر المناقشة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{selectedPost.title}</h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Post Content */}
                <div className="flex items-start space-x-4 space-x-reverse">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <h3 className="font-semibold">{selectedPost.author.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(selectedPost.author.role)}`}>
                        {getRoleText(selectedPost.author.role)}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTimestamp(selectedPost.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {selectedPost.content}
                    </p>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                      <button className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{selectedPost.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Replies */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-semibold mb-4">الردود ({selectedPost.replies})</h3>
                  
                  <div className="space-y-4">
                    {replies
                      .filter(reply => reply.postId === selectedPost.id)
                      .map(reply => (
                        <div key={reply.id} className="flex items-start space-x-4 space-x-reverse">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 space-x-reverse mb-2">
                              <h4 className="font-medium">{reply.author.name}</h4>
                              {reply.isAnswer && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                                  إجابة معتمدة
                                </span>
                              )}
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatTimestamp(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              {reply.content}
                            </p>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                              <button
                                onClick={() => handleLikeReply(reply.id)}
                                className="flex items-center space-x-1 space-x-reverse hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{reply.likes}</span>
                              </button>
                              <button className="hover:text-blue-600 dark:hover:text-blue-400">
                                رد
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Reply Form */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-semibold mb-4">أضف رداً</h3>
                  <div className="space-y-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                      placeholder="اكتب ردك هنا..."
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleReply}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
                      >
                        <Send className="w-4 h-4" />
                        <span>إرسال الرد</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
