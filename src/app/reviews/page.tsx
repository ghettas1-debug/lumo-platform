'use client';

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Filter, Search, Calendar, TrendingUp, Award, BookOpen, Clock, CheckCircle, AlertCircle, BarChart3, Users, ChevronDown, Edit, Trash2, Flag, Share2, Bookmark, Eye, X } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  courseId: string;
  courseTitle: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  completedDate: string;
  studyHours: number;
  helpful: number;
  notHelpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  responses: ReviewResponse[];
  tags: string[];
  images: string[];
}

interface ReviewResponse {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  helpful: number;
  isInstructor?: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: string;
  duration: number;
  enrolledCount: number;
  averageRating: number;
  totalReviews: number;
  price: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating' | 'oldest'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [userReview, setUserReview] = useState<Partial<Review>>({
    rating: 5,
    title: '',
    content: '',
    pros: [],
    cons: [],
    wouldRecommend: true,
    difficulty: 'medium',
    studyHours: 0,
    tags: []
  });

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Initialize with sample reviews
      const sampleReviews: Review[] = [
        {
          id: '1',
          userId: 'user-1',
          userName: 'أحمد محمد',
          userAvatar: '/avatars/user1.jpg',
          courseId: 'course-1',
          courseTitle: 'React.js الشامل',
          rating: 5,
          title: 'أفضل دورة تعلمتها!',
          content: 'دورة ممتازة تغطي جميع جوانب React.js بطريقة سهلة ومفهومة. المدرب ممتاز ويشرح بأسلوب رائع.',
          pros: ['شرح واضح ومفصل', 'مشاريع عملية', 'دعم فني ممتاز', 'محتوى محدث'],
          cons: ['بعض الأقسام تحتاج تحديث', 'التمارين قليلة'],
          wouldRecommend: true,
          difficulty: 'medium',
          completedDate: '2024-03-10',
          studyHours: 45,
          helpful: 23,
          notHelpful: 2,
          verified: true,
          createdAt: '2024-03-12T10:30:00Z',
          updatedAt: '2024-03-12T10:30:00Z',
          responses: [],
          tags: ['React', 'Frontend', 'JavaScript'],
          images: []
        },
        {
          id: '2',
          userId: 'user-2',
          userName: 'سارة أحمد',
          userAvatar: '/avatars/user2.jpg',
          courseId: 'course-2',
          courseTitle: 'JavaScript المتقدم',
          rating: 4,
          title: 'محتوى قوي ولكن يتطلب المزيد من الأمثلة',
          content: 'الدورة جيدة بشكل عام وتغطي مفاهيم متقدمة في JavaScript. لكن تحتاج إلى المزيد من الأمثلة العملية.',
          pros: ['مفاهيم متقدمة', 'شرح عميق', 'تحديات ممتعة'],
          cons: ['أمثلة قليلة', 'سرعة الشرح سريعة أحياناً'],
          wouldRecommend: true,
          difficulty: 'hard',
          completedDate: '2024-03-08',
          studyHours: 60,
          helpful: 15,
          notHelpful: 3,
          verified: true,
          createdAt: '2024-03-09T14:20:00Z',
          updatedAt: '2024-03-09T14:20:00Z',
          responses: [],
          tags: ['JavaScript', 'Programming', 'Advanced'],
          images: []
        },
        {
          id: '3',
          userId: 'user-3',
          userName: 'محمد علي',
          userAvatar: '/avatars/user3.jpg',
          courseId: 'course-1',
          courseTitle: 'React.js الشامل',
          rating: 3,
          title: 'جيدة للمبتدئين',
          content: 'الدورة مناسبة للمبتدئين لكن إذا كان لديك خبرة سابقة قد تجدها بطيئة بعض الشيء.',
          pros: ['مناسبة للمبتدئين', 'أساسيات قوية'],
          cons: ['بطيئة للمستوى المتقدم', 'محتوى أساسي أكثر'],
          wouldRecommend: true,
          difficulty: 'easy',
          completedDate: '2024-03-05',
          studyHours: 30,
          helpful: 8,
          notHelpful: 5,
          verified: false,
          createdAt: '2024-03-06T09:15:00Z',
          updatedAt: '2024-03-06T09:15:00Z',
          responses: [],
          tags: ['React', 'Beginner', 'Basics'],
          images: []
        }
      ];
      setReviews(sampleReviews);
    }

    // Load courses from localStorage
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Initialize with sample courses
      const sampleCourses: Course[] = [
        {
          id: 'course-1',
          title: 'React.js الشامل',
          instructor: 'أحمد محمد',
          thumbnail: '/courses/react.jpg',
          category: 'برمجة',
          level: 'متوسط',
          duration: 1200,
          enrolledCount: 2500,
          averageRating: 4.5,
          totalReviews: 156,
          price: 299
        },
        {
          id: 'course-2',
          title: 'JavaScript المتقدم',
          instructor: 'سارة أحمد',
          thumbnail: '/courses/javascript.jpg',
          category: 'برمجة',
          level: 'متقدم',
          duration: 1800,
          enrolledCount: 1800,
          averageRating: 4.2,
          totalReviews: 98,
          price: 399
        },
        {
          id: 'course-3',
          title: 'تطوير الويب بالـ Python',
          instructor: 'محمد علي',
          thumbnail: '/courses/python.jpg',
          category: 'برمجة',
          level: 'مبتدئ',
          duration: 900,
          enrolledCount: 3200,
          averageRating: 4.7,
          totalReviews: 203,
          price: 249
        }
      ];
      setCourses(sampleCourses);
    }
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const handleHelpful = (reviewId: string, helpful: boolean) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: helpful ? review.helpful + 1 : review.helpful,
          notHelpful: !helpful ? review.notHelpful + 1 : review.notHelpful
        };
      }
      return review;
    }));
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const handleReportReview = (reviewId: string) => {
    // In a real app, this would send a report to moderators
    alert('تم الإبلاغ عن التقييم. شكراً لمساعدتنا في الحفاظ على جودة المحتوى.');
  };

  const handleSubmitReview = () => {
    if (!userReview.title || !userReview.content) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'المستخدم الحالي',
      userAvatar: '/avatars/current.jpg',
      courseId: 'course-1',
      courseTitle: 'React.js الشامل',
      rating: userReview.rating || 5,
      title: userReview.title,
      content: userReview.content,
      pros: userReview.pros || [],
      cons: userReview.cons || [],
      wouldRecommend: userReview.wouldRecommend || true,
      difficulty: userReview.difficulty || 'medium',
      completedDate: new Date().toISOString().split('T')[0],
      studyHours: userReview.studyHours || 0,
      helpful: 0,
      notHelpful: 0,
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      tags: userReview.tags || [],
      images: []
    };

    setReviews([newReview, ...reviews]);
    setShowWriteReview(false);
    setUserReview({
      rating: 5,
      title: '',
      content: '',
      pros: [],
      cons: [],
      wouldRecommend: true,
      difficulty: 'medium',
      studyHours: 0,
      tags: []
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    const matchesCourse = selectedCourse === 'all' || review.courseId === selectedCourse;
    const matchesRating = selectedRating === 0 || review.rating === selectedRating;
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCourse && matchesRating && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'سهل';
      case 'medium':
        return 'متوسط';
      case 'hard':
        return 'صعب';
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-bold flex items-center space-x-2 space-x-reverse">
                <Star className="w-6 h-6" />
                <span>التقييمات والمراجعات</span>
              </h1>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {reviews.length} تقييم
              </span>
            </div>
            
            <button
              onClick={() => setShowWriteReview(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <Edit className="w-4 h-4" />
              <span>كتابة تقييم</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">متوسط التقييم</p>
                <p className="text-2xl font-bold">4.3</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التقييمات</p>
                <p className="text-2xl font-bold">{reviews.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">التقييمات المفيدة</p>
                <p className="text-2xl font-bold">
                  {reviews.reduce((acc, review) => acc + review.helpful, 0)}
                </p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">معدل التوصية</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث في التقييمات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الدورات</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="0">جميع التقييمات</option>
                <option value="5">5 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="2">نجمتان</option>
                <option value="1">نجمة واحدة</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">الأحدث أولاً</option>
                <option value="oldest">الأقدم أولاً</option>
                <option value="helpful">الأكثر فائدة</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">لا توجد تقييمات مطابقة</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <h3 className="font-semibold">{review.userName}</h3>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" title="مؤكد" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleReportReview(review.id)}
                          className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                          title="إبلاغ"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center space-x-3 space-x-reverse mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {review.courseTitle}
                        </span>
                      </div>
                      
                      <h4 className="font-medium text-lg mb-2">{review.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{review.content}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {review.pros.length > 0 && (
                          <div>
                            <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">الإيجابيات:</h5>
                            <ul className="space-y-1">
                              {review.pros.map((pro, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1 space-x-reverse">
                                  <span className="text-green-500">+</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {review.cons.length > 0 && (
                          <div>
                            <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">السلبيات:</h5>
                            <ul className="space-y-1">
                              {review.cons.map((con, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1 space-x-reverse">
                                  <span className="text-red-500">-</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(review.difficulty)}`}>
                          الصعوبة: {getDifficultyText(review.difficulty)}
                        </span>
                        <span className="flex items-center space-x-1 space-x-reverse">
                          <Clock className="w-4 h-4" />
                          <span>{review.studyHours} ساعة دراسة</span>
                        </span>
                        <span className="flex items-center space-x-1 space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>أكمل في {review.completedDate}</span>
                        </span>
                        {review.wouldRecommend && (
                          <span className="flex items-center space-x-1 space-x-reverse text-green-600 dark:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>يوصي بالدورة</span>
                          </span>
                        )}
                      </div>
                      
                      {review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {review.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 space-x-reverse mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => handleHelpful(review.id, true)}
                          className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>مفيد ({review.helpful})</span>
                        </button>
                        <button
                          onClick={() => handleHelpful(review.id, false)}
                          className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>غير مفيد ({review.notHelpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          <MessageSquare className="w-4 h-4" />
                          <span>رد</span>
                        </button>
                        <button className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          <Share2 className="w-4 h-4" />
                          <span>مشاركة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">كتابة تقييم</h2>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">التقييم</label>
                  {renderStars(userReview.rating || 5, true, (rating) => 
                    setUserReview({...userReview, rating})
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان التقييم</label>
                  <input
                    type="text"
                    value={userReview.title || ''}
                    onChange={(e) => setUserReview({...userReview, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اكتب عنواناً موجزاً..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">التقييم المفصل</label>
                  <textarea
                    value={userReview.content || ''}
                    onChange={(e) => setUserReview({...userReview, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                    placeholder="شارك تجربتك بالتفصيل..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">مستوى الصعوبة</label>
                    <select
                      value={userReview.difficulty || 'medium'}
                      onChange={(e) => setUserReview({...userReview, difficulty: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="easy">سهل</option>
                      <option value="medium">متوسط</option>
                      <option value="hard">صعب</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">ساعات الدراسة</label>
                    <input
                      type="number"
                      value={userReview.studyHours || ''}
                      onChange={(e) => setUserReview({...userReview, studyHours: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="عدد الساعات"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={userReview.wouldRecommend || false}
                      onChange={(e) => setUserReview({...userReview, wouldRecommend: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">أوصي بهذه الدورة</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  نشر التقييم
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
