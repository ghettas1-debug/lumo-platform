"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit3, Trash2, Save, X, Search, Filter, 
  Clock, Calendar, Tag, Star, Share2, Download,
  Bold, Italic, Underline, List, Quote, Code,
  Image, Link, Paperclip, Mic, Video, FileText,
  ChevronDown, ChevronUp, MoreVertical, Eye,
  Heart, MessageSquare, Bookmark, Hash, Grid
} from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';

interface Note {
  id: string;
  title: string;
  content: string;
  courseId: string;
  courseTitle: string;
  lessonId?: string;
  lessonTitle?: string;
  timestamp: number;
  videoTime?: number;
  tags: string[];
  isPublic: boolean;
  isBookmarked: boolean;
  likes: number;
  comments: number;
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  size: number;
}

interface NotesManagerProps {
  userId?: string;
  courseId?: string;
  lessonId?: string;
  videoTime?: number;
  onNoteCreate?: (note: Note) => void;
  onNoteUpdate?: (note: Note) => void;
  onNoteDelete?: (noteId: string) => void;
}

export default function NotesManager({
  userId,
  courseId,
  lessonId,
  videoTime,
  onNoteCreate,
  onNoteUpdate,
  onNoteDelete
}: NotesManagerProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title' | 'likes'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  
  // Editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load notes from API
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'ملاحظات حول React Hooks',
        content: 'React Hooks هي طريقة جديدة لاستخدام state وغيرها من ميزات React دون كتابة class. أهم الـ hooks هي useState و useEffect و useContext.',
        courseId: 'react-course',
        courseTitle: 'دورة React.js المتقدمة',
        lessonId: 'lesson-1',
        lessonTitle: 'مقدمة في React Hooks',
        timestamp: 1650,
        videoTime: 1650,
        tags: ['React', 'Hooks', 'JavaScript'],
        isPublic: true,
        isBookmarked: true,
        likes: 24,
        comments: 5,
        attachments: [],
        createdAt: '2024-03-15T10:30:00Z',
        updatedAt: '2024-03-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'مفاهيم مهمة في Redux',
        content: 'Redux هو حاوية حالة يمكن التنبؤ بها لتطبيقات JavaScript. يعتمد على مبادئ Flux ويساعد في إدارة حالة التطبيق بشكل مركزي.',
        courseId: 'react-course',
        courseTitle: 'دورة React.js المتقدمة',
        lessonId: 'lesson-2',
        lessonTitle: 'مقدمة في Redux',
        timestamp: 3200,
        videoTime: 3200,
        tags: ['Redux', 'State Management', 'JavaScript'],
        isPublic: false,
        isBookmarked: false,
        likes: 15,
        comments: 3,
        attachments: [],
        createdAt: '2024-03-14T14:45:00Z',
        updatedAt: '2024-03-14T14:45:00Z'
      },
      {
        id: '3',
        title: 'أفضل الممارسات في React',
        content: '1. استخدام functional components مع hooks\n2. تجنب استخدام state غير ضروري\n3. استخدام memo و useMemo للتحسين\n4. تقسيم المكونات الكبيرة إلى مكونات أصغر',
        courseId: 'react-course',
        courseTitle: 'دورة React.js المتقدمة',
        lessonId: 'lesson-3',
        lessonTitle: 'أفضل الممارسات',
        timestamp: 4500,
        videoTime: 4500,
        tags: ['React', 'Best Practices', 'Performance'],
        isPublic: true,
        isBookmarked: true,
        likes: 42,
        comments: 8,
        attachments: [],
        createdAt: '2024-03-13T12:20:00Z',
        updatedAt: '2024-03-13T12:20:00Z'
      }
    ];

    setNotes(mockNotes);
  }, []);

  const handleCreateNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      courseId: courseId || 'default',
      courseTitle: 'دورة افتراضية',
      lessonId: lessonId,
      lessonTitle: 'درس افتراضي',
      timestamp: videoTime || 0,
      videoTime: videoTime || 0,
      tags: tags,
      isPublic: isPublic,
      isBookmarked: false,
      likes: 0,
      comments: 0,
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setIsCreating(false);
    setShowEditor(false);
    setTitle('');
    setContent('');
    setTags([]);
    setIsPublic(false);
    onNoteCreate?.(newNote);
  };

  const handleUpdateNote = () => {
    if (!currentNote || !title.trim() || !content.trim()) return;

    const updatedNote = {
      ...currentNote,
      title: title.trim(),
      content: content.trim(),
      tags: tags,
      isPublic: isPublic,
      updatedAt: new Date().toISOString()
    };

    setNotes(notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    ));
    setCurrentNote(updatedNote);
    setIsEditing(false);
    setShowEditor(false);
    onNoteUpdate?.(updatedNote);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
    }
    onNoteDelete?.(noteId);
  };

  const handleBookmark = (note: Note) => {
    const updatedNotes = notes.map(n => 
      n.id === note.id ? { ...n, isBookmarked: !n.isBookmarked } : n
    );
    setNotes(updatedNotes);
    if (currentNote?.id === note.id) {
      setCurrentNote({ ...currentNote, isBookmarked: !currentNote.isBookmarked });
    }
  };

  const handleLike = (note: Note) => {
    const updatedNotes = notes.map(n => 
      n.id === note.id ? { ...n, likes: n.likes + (n.likes > 0 ? -1 : 1) } : n
    );
    setNotes(updatedNotes);
    if (currentNote?.id === note.id) {
      setCurrentNote({ ...currentNote, likes: currentNote.likes + (currentNote.likes > 0 ? -1 : 1) });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'oldest':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">الملاحظات</h1>
            <p className="text-gray-600">
              سجل ملاحظاتك وأفكارك أثناء الدراسة
            </p>
          </div>
          <Button
            onClick={() => {
              setIsCreating(true);
              setIsEditing(false);
              setShowEditor(true);
              setTitle('');
              setContent('');
              setTags([]);
              setIsPublic(false);
            }}
            variant="primary"
          >
            <Plus size={20} className="ml-2" />
            ملاحظة جديدة
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="البحث في الملاحظات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
              >
                <Filter size={20} className="ml-2" />
                الفلاتر
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                >
                  <Grid size={20} className="ml-2" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                >
                  <List size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">التصنيف:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="recent">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                    <option value="title">العنوان</option>
                    <option value="likes">الأكثر إعجاباً</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">الوسوم:</span>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">الكل</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Editor Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {isEditing ? 'تعديل ملاحظة' : 'ملاحظة جديدة'}
                  </h2>
                  <Button
                    onClick={() => {
                      setShowEditor(false);
                      setIsCreating(false);
                      setIsEditing(false);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="أدخل عنوان الملاحظة..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المحتوى
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      {/* Editor Toolbar */}
                      <div className="bg-gray-50 border-b border-gray-200 p-2">
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" className="p-2">
                            <Bold size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Italic size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Underline size={16} />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1"></div>
                          <Button variant="outline" size="sm" className="p-2">
                            <List size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Quote size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Code size={16} />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1"></div>
                          <Button variant="outline" size="sm" className="p-2">
                            <Image size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Link size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Paperclip size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Editor Content */}
                      <div
                        ref={editorRef}
                        contentEditable
                        className="min-h-50 p-4 focus:outline-none"
                        onInput={(e) => setContent(e.currentTarget.textContent || '')}
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوسوم
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="أضف وسماً..."
                      />
                      <Button onClick={handleAddTag} variant="outline" size="sm">
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">مشاركة مع الآخرين</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        setShowEditor(false);
                        setIsCreating(false);
                        setIsEditing(false);
                      }}
                      variant="outline"
                    >
                      إلغاء
                    </Button>
                    <Button
                      onClick={isEditing ? handleUpdateNote : handleCreateNote}
                      variant="primary"
                    >
                      {isEditing ? (
                        <>
                          <Save size={16} className="ml-2" />
                          حفظ التغييرات
                        </>
                      ) : (
                        <>
                          <Plus size={16} className="ml-2" />
                          إنشاء ملاحظة
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Notes Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedNotes.map((note) => (
            <Card key={note.id} className="group hover:shadow-lg transition-all duration-300">
              {viewMode === 'grid' ? (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => handleBookmark(note)}
                        variant="outline"
                        size="sm"
                        className={`p-2 ${note.isBookmarked ? 'text-blue-600 border-blue-600' : 'text-gray-400'}`}
                      >
                        <Bookmark size={16} className={note.isBookmarked ? 'fill-current' : ''} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 text-gray-400"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {note.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{formatDate(note.createdAt)}</span>
                    {note.videoTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatTime(note.videoTime)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => handleLike(note)}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-1 ${note.likes > 0 ? 'text-red-600 border-red-600' : 'text-gray-400'}`}
                      >
                        <Heart size={14} className={note.likes > 0 ? 'fill-current' : ''} />
                        <span className="text-xs">{note.likes}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-gray-400"
                      >
                        <MessageSquare size={14} />
                        <span className="text-xs">{note.comments}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-400"
                      >
                        <Share2 size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setCurrentNote(note);
                          setIsEditing(true);
                          setShowEditor(true);
                          setTitle(note.title);
                          setContent(note.content);
                          setTags(note.tags);
                          setIsPublic(note.isPublic);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Edit3 size={14} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteNote(note.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {note.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            note.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {note.isPublic ? 'عام' : 'خاص'}
                          </span>
                          {note.videoTime && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock size={12} />
                              {formatTime(note.videoTime)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {note.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(note.createdAt)}</span>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Heart size={14} className={note.likes > 0 ? 'fill-current text-red-500' : 'text-gray-400'} />
                            {note.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare size={14} className="text-gray-400" />
                            {note.comments}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleBookmark(note)}
                        variant="outline"
                        size="sm"
                        className={`p-2 ${note.isBookmarked ? 'text-blue-600 border-blue-600' : 'text-gray-400'}`}
                      >
                        <Bookmark size={16} className={note.isBookmarked ? 'fill-current' : ''} />
                      </Button>
                      <Button
                        onClick={() => {
                          setCurrentNote(note);
                          setIsEditing(true);
                          setShowEditor(true);
                          setTitle(note.title);
                          setContent(note.content);
                          setTags(note.tags);
                          setIsPublic(note.isPublic);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Edit3 size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteNote(note.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedNotes.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد ملاحظات بعد</h3>
            <p className="text-gray-600 mb-6">
              ابدأ بتسجيل ملاحظاتك أثناء الدراسة لتسهيل المراجعة لاحقاً
            </p>
            <Button
              onClick={() => {
                setIsCreating(true);
                setIsEditing(false);
                setShowEditor(true);
                setTitle('');
                setContent('');
                setTags([]);
                setIsPublic(false);
              }}
              variant="primary"
            >
              <Plus size={20} className="ml-2" />
              أول ملاحظة
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
