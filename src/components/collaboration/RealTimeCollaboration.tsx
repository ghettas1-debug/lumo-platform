// Real-time Collaboration Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  ScreenShare, 
  Hand,
  Share2,
  Settings,
  UserPlus,
  LogOut,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Clock,
  Circle,
  CheckCircle,
  AlertCircle,
  FileText,
  Image,
  Download,
  Upload,
  Edit3,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Crown,
  Shield,
  Zap
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'host' | 'moderator' | 'participant';
  isOnline: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  handRaised: boolean;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  file?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

interface StudyRoom {
  id: string;
  name: string;
  description: string;
  subject: string;
  maxParticipants: number;
  currentParticipants: number;
  isPrivate: boolean;
  password?: string;
  hostId: string;
  createdAt: Date;
  isActive: boolean;
}

interface RealTimeCollaborationProps {
  room?: StudyRoom;
  currentUser?: User;
}

export function RealTimeCollaboration({ room, currentUser }: RealTimeCollaborationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<User[]>([]);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Default current user if not provided
  const defaultCurrentUser: User = {
    id: 'current-user',
    name: 'أحمد محمد',
    avatar: '/avatars/user1.jpg',
    role: 'participant',
    isOnline: true,
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    handRaised: false
  };

  const current = currentUser || defaultCurrentUser;

  // Mock participants
  useEffect(() => {
    const mockParticipants: User[] = [
      {
        id: '1',
        name: 'د. فاطمة أحمد',
        avatar: '/avatars/user2.jpg',
        role: 'host',
        isOnline: true,
        isSpeaking: false,
        isMuted: false,
        isVideoOn: true,
        handRaised: false
      },
      {
        id: '2',
        name: 'محمد علي',
        avatar: '/avatars/user3.jpg',
        role: 'participant',
        isOnline: true,
        isSpeaking: false,
        isMuted: true,
        isVideoOn: false,
        handRaised: false
      },
      {
        id: '3',
        name: 'سارة حسن',
        avatar: '/avatars/user4.jpg',
        role: 'moderator',
        isOnline: true,
        isSpeaking: false,
        isMuted: false,
        isVideoOn: true,
        handRaised: true
      },
      current
    ];
    setParticipants(mockParticipants);
  }, [current]);

  // Mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        userId: '1',
        userName: 'د. فاطمة أحمد',
        content: 'مرحباً بالجميع! كيف يمكنني مساعدتكم اليوم؟',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      {
        id: '2',
        userId: '2',
        userName: 'محمد علي',
        content: 'أود مناقشة الفصل الثالث من مادة الرياضيات',
        timestamp: new Date(Date.now() - 3000000),
        type: 'text'
      },
      {
        id: '3',
        userId: '3',
        userName: 'سارة حسن',
        content: 'لدي سؤال حول التمارين في نهاية الفصل',
        timestamp: new Date(Date.now() - 2400000),
        type: 'text'
      }
    ];
    setMessages(mockMessages);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: current.id,
      userName: current.name,
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // In real implementation, upload file to server
      const fileMessage: Message = {
        id: Date.now().toString(),
        userId: current.id,
        userName: current.name,
        content: `تم مشاركة الملف: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        }
      };
      setMessages([...messages, fileMessage]);
      setSelectedFile(null);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'host': return <Crown size={14} className="text-yellow-500" />;
      case 'moderator': return <Shield size={14} className="text-blue-500" />;
      default: return <Users size={14} className="text-gray-500" />;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'host': return 'المضيف';
      case 'moderator': return 'مشرف';
      default: return 'مشارك';
    }
  };

  const emojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '💯', '🙏', '💪', '🎓'];

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-blue-400" />
                <span className="font-medium">{room?.name || 'غرفة الدراسة'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Circle size={8} className={isConnected ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'} />
                <span>{isConnected ? 'متصل' : 'غير متصل'}</span>
              </div>
              {isRecording && (
                <div className="flex items-center gap-2 bg-red-900/50 px-3 py-1 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-400">تسجيل {formatTime(recordingTime)}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Video size={18} />
              </button>
              <button
                onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isWhiteboardOpen ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Edit3 size={18} />
              </button>
              <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                <Settings size={18} />
              </button>
              <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`relative bg-gray-800 rounded-lg overflow-hidden ${
                  participant.id === current.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Video Placeholder */}
                <div className="aspect-video flex items-center justify-center bg-linear-to-br from-gray-700 to-gray-800">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl font-bold">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">كاميرا {participant.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{participant.name}</p>
                    </div>
                  )}
                </div>

                {/* Status Indicators */}
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  {participant.isMuted && (
                    <div className="p-1 bg-red-600 rounded-full">
                      <MicOff size={12} />
                    </div>
                  )}
                  {participant.isSpeaking && (
                    <div className="p-1 bg-green-600 rounded-full">
                      <Zap size={12} />
                    </div>
                  )}
                  {participant.handRaised && (
                    <div className="p-1 bg-yellow-600 rounded-full">
                      <Hand size={12} />
                    </div>
                  )}
                </div>

                {/* Role Badge */}
                <div className="absolute top-2 right-2">
                  {getRoleIcon(participant.role)}
                </div>

                {/* Name */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/50 rounded px-2 py-1">
                  <p className="text-xs font-medium truncate">{participant.name}</p>
                  <p className="text-xs text-gray-400">{getRoleName(participant.role)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-3 rounded-full transition-colors ${
                isAudioOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full transition-colors ${
                isVideoOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3 rounded-full transition-colors ${
                isScreenSharing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ScreenShare size={20} />
            </button>
            
            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`p-3 rounded-full transition-colors ${
                isHandRaised ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <Hand size={20} />
            </button>
            
            <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setShowChat(true)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              showChat ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare size={16} className="inline ml-2" />
            الدردشة
          </button>
          <button
            onClick={() => setShowChat(false)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              !showChat ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users size={16} className="inline ml-2" />
            المشاركون ({participants.length})
          </button>
        </div>

        {/* Chat */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.userId === current.id ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                      {message.userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={`max-w-[70%] ${
                      message.userId === current.id ? 'text-right' : ''
                    }`}>
                      <div className="text-xs text-gray-400 mb-1">
                        {message.userName} • {message.timestamp.toLocaleTimeString('ar', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className={`p-2 rounded-lg ${
                        message.userId === current.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-white'
                      }`}>
                        {message.type === 'file' ? (
                          <div className="flex items-center gap-2">
                            <FileText size={16} />
                            <div>
                              <p className="text-sm">{message.content}</p>
                              {message.file && (
                                <p className="text-xs opacity-75">
                                  {(message.file.size / 1024).toFixed(1)} KB
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Emoji Picker */}
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="border-t border-gray-700 p-2"
                  >
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setNewMessage(newMessage + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input */}
              <div className="border-t border-gray-700 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="اكتب رسالتك..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Smile size={18} />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Paperclip size={18} />
                  </button>
                  <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Participants */}
        <AnimatePresence>
          {!showChat && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 overflow-y-auto p-4"
            >
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      participant.id === current.id ? 'bg-gray-700' : 'bg-gray-800'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center font-medium">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                        participant.isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{participant.name}</p>
                        {getRoleIcon(participant.role)}
                      </div>
                      <p className="text-xs text-gray-400">{getRoleName(participant.role)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {participant.isMuted && <MicOff size={14} className="text-red-500" />}
                      {participant.handRaised && <Hand size={14} className="text-yellow-500" />}
                      {!participant.isVideoOn && <VideoOff size={14} className="text-gray-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Study Rooms List Component
export function StudyRoomsList() {
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const mockRooms: StudyRoom[] = [
    {
      id: '1',
      name: 'مجموعة الرياضيات المتقدمة',
      description: 'ندرة في حل المسائل الرياضية المعقدة',
      subject: 'الرياضيات',
      maxParticipants: 10,
      currentParticipants: 7,
      isPrivate: false,
      hostId: '1',
      createdAt: new Date(),
      isActive: true
    },
    {
      id: '2',
      name: 'ورقة البرمجة JavaScript',
      description: 'ممارسة البرمجة معاً وحل المشاكل',
      subject: 'البرمجة',
      maxParticipants: 15,
      currentParticipants: 12,
      isPrivate: true,
      password: '123456',
      hostId: '2',
      createdAt: new Date(),
      isActive: true
    },
    {
      id: '3',
      name: 'مجموعة دراسة الفيزياء',
      description: 'مناقشة مفاهيم الفيزياء والتجارب العملية',
      subject: 'الفيزياء',
      maxParticipants: 8,
      currentParticipants: 5,
      isPrivate: false,
      hostId: '3',
      createdAt: new Date(),
      isActive: false
    }
  ];

  useEffect(() => {
    setRooms(mockRooms);
  }, []);

  const categories = ['all', 'الرياضيات', 'البرمجة', 'الفيزياء', 'الكيمياء', 'الأحياء'];

  const filteredRooms = rooms.filter(room => {
    const matchesCategory = selectedCategory === 'all' || room.subject === selectedCategory;
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Users className="text-blue-400" />
              غرف الدراسة الجماعية
            </h1>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <UserPlus size={18} />
              إنشاء غرفة
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="البحث عن غرف دراسية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
            />
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'الكل' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      room.isActive ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <h3 className="font-bold text-lg">{room.name}</h3>
                  </div>
                  {room.isPrivate && <Lock size={16} className="text-gray-400" />}
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{room.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{room.subject}</span>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{room.currentParticipants}/{room.maxParticipants}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    انضمام
                  </button>
                  <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
