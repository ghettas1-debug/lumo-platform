// AI Chatbot Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Minimize2, 
  Maximize2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AIChatbot({ isOpen: externalIsOpen, onToggle }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = externalIsOpen !== undefined;
  const currentIsOpen = isControlled ? externalIsOpen : isOpen;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (currentIsOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [currentIsOpen, isMinimized]);

  // Welcome message
  useEffect(() => {
    if (currentIsOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'مرحباً! أنا مساعدك الذكي في منصة لومو. كيف يمكنني مساعدتك اليوم؟',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          'ما هي الدورات المتاحة؟',
          'كيف أتابع تقدمي؟',
          'ما هي طريقة الدراسة الأفضل؟',
          'احتاج مساعدة في دورة معينة'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [currentIsOpen, messages.length]);

  // AI Response simulation
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
      'بناءً على سؤالك، أوصي بالبدء بالدورات الأساسية أولاً ثم التقدم للمستويات المتقدمة.',
      'يمكنك تتبع تقدمك عبر لوحة التحكم الشخصية التي تعرض جميع إحصائياتك وإنجازاتك.',
      'أفضل طريقة للدراسة هي تخصيص وقت يومي منتظم والممارسة المستمرة.',
      'هذه الدورة تغطي المفاهيم الأساسية وتتضمن تمارين عملية لتطبيق ما تعلمته.',
      'بناءً على تقدمك الحالي، أنصحك بالتركيز على المواضيع التي تحتاج إلى تحسين.',
      'يمكنك الانضمام إلى مجموعات الدراسة للتعلم مع زملائك ومشاركة المعرفة.',
      'لا تتردد في طرح المزيد من الأسئلة، أنا هنا لمساعدتك في رحلتك التعليمية.'
    ];

    // Simple keyword-based responses
    if (userMessage.includes('دورات') || userMessage.includes('courses')) {
      return 'لدينا مجموعة واسعة من الدورات في مختلف المجالات. يمكنك تصفح جميع الدورات من قسم الدورات الرئيسي. كل دورة تتضمن فيديوهات، تمارين، واختبارات تقييمية.';
    } else if (userMessage.includes('تقدم') || userMessage.includes('progress')) {
      return 'يمكنك تتبع تقدمك من خلال لوحة التحكم التي تعرض نسبة الإنجاز في كل دورة، النقاط المكتسبة، الشارات، والتحليلات الشخصية لأدائك.';
    } else if (userMessage.includes('دراسة') || userMessage.includes('learn')) {
      return 'أفضل استراتيجية للدراسة هي: 1) تحديد أهداف يومية 2) الدراسة في وقت مناسب 3) التطبيق العملي 4) المراجعة المنتظمة 5) طلب المساعدة عند الحاجة.';
    } else if (userMessage.includes('مساعدة') || userMessage.includes('help')) {
      return 'أنا هنا لمساعدتك! يمكنني الإجابة على أسئلتك حول الدورات، تقدمك، طرق الدراسة، وتقديم توصيات مخصصة بناءً على أدائك.';
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await generateAIResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          'هل لديك المزيد من الأسئلة؟',
          'أريد معرفة المزيد',
          'شكراً للمساعدة',
          'ما هي الخطوة التالية؟'
        ]
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    // Store feedback for improving AI responses
    console.log(`Feedback for message ${messageId}: ${feedback}`);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setIsOpen(!currentIsOpen);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Button */}
      {!currentIsOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {currentIsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot size={24} />
                  <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold">مساعد لومو الذكي</h3>
                  <p className="text-xs opacity-90">متواجد للمساعدة</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={handleToggle}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-[440px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}>
                        {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                        <div className={`rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{message.timestamp.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}</span>
                          {message.sender === 'bot' && (
                            <>
                              <button
                                onClick={() => copyMessage(message.text)}
                                className="hover:text-gray-700"
                              >
                                <Copy size={12} />
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id, 'positive')}
                                className="hover:text-green-600"
                              >
                                <ThumbsUp size={12} />
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id, 'negative')}
                                className="hover:text-red-600"
                              >
                                <ThumbsDown size={12} />
                              </button>
                            </>
                          )}
                        </div>
                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-3">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="اكتب سؤالك هنا..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Hook for AI recommendations
export function useAIRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const generateRecommendations = (userProgress: any, userInterests: string[]) => {
    // Simulate AI-based recommendations
    const recs = [
      'بناءً على تقدمك، أوصي بمتابعة دورة JavaScript المتقدمة',
      'لاحظت أنك متفوق في الرياضيات، جرب دورة البرمجة الحسابية',
      'يمكنك تحسين مهاراتك من خلال التمارين العملية في قسم المختبرات',
      'انضم إلى مجموعة الدراسة النشطة في مجالك'
    ];
    
    setRecommendations(recs.slice(0, 3));
  };

  return { recommendations, generateRecommendations };
}
