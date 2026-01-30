// Voice Navigation Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  Globe,
  Headphones,
  MessageSquare,
  Command,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Home,
  BookOpen,
  User,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  HelpCircle,
  Accessibility,
  Eye,
  EyeOff,
  Keyboard,
  MousePointer
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  category: 'navigation' | 'control' | 'search' | 'accessibility';
  description: string;
  examples: string[];
}

interface VoiceSettings {
  language: string;
  speed: number;
  pitch: number;
  volume: number;
  autoListen: boolean;
  wakeWord: string;
  confirmActions: boolean;
  visualFeedback: boolean;
}

export function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [settings, setSettings] = useState<VoiceSettings>({
    language: 'ar-SA',
    speed: 1,
    pitch: 1,
    volume: 1,
    autoListen: false,
    wakeWord: 'لومو',
    confirmActions: true,
    visualFeedback: true
  });

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Voice commands
  const voiceCommands: VoiceCommand[] = [
    {
      id: 'nav-home',
      command: 'اذهب للرئيسية',
      action: '/home',
      category: 'navigation',
      description: 'الانتقال إلى الصفحة الرئيسية',
      examples: ['اذهب للرئيسية', 'الصفحة الرئيسية', 'الرئيسية']
    },
    {
      id: 'nav-courses',
      command: 'اذهب للدورات',
      action: '/courses',
      category: 'navigation',
      description: 'الانتقال إلى صفحة الدورات',
      examples: ['اذهب للدورات', 'الدورات', 'عرض الدورات']
    },
    {
      id: 'nav-profile',
      command: 'اذهب للملف الشخصي',
      action: '/profile',
      category: 'navigation',
      description: 'الانتقال إلى الملف الشخصي',
      examples: ['اذهب للملف الشخصي', 'الملف الشخصي', 'حسابي']
    },
    {
      id: 'search',
      command: 'ابحث عن',
      action: 'search',
      category: 'search',
      description: 'البحث عن محتوى',
      examples: ['ابحث عن الرياضيات', 'بحث دورات البرمجة', 'ابحث']
    },
    {
      id: 'play-video',
      command: 'شغل الفيديو',
      action: 'play',
      category: 'control',
      description: 'تشغيل الفيديو الحالي',
      examples: ['شغل الفيديو', 'ابدأ التشغيل', 'تشغيل']
    },
    {
      id: 'pause-video',
      command: 'أوقف الفيديو',
      action: 'pause',
      category: 'control',
      description: 'إيقاف الفيديو الحالي',
      examples: ['أوقف الفيديو', 'إيقاف مؤقت', 'توقف']
    },
    {
      id: 'next-video',
      command: 'الفيديو التالي',
      action: 'next',
      category: 'control',
      description: 'الانتقال للفيديو التالي',
      examples: ['الفيديو التالي', 'التالي', 'التالي من فضلك']
    },
    {
      id: 'previous-video',
      command: 'الفيديو السابق',
      action: 'previous',
      category: 'control',
      description: 'الانتقال للفيديو السابق',
      examples: ['الفيديو السابق', 'السابق', 'الرجوع للخلف']
    },
    {
      id: 'increase-volume',
      command: 'ارفع الصوت',
      action: 'volume-up',
      category: 'control',
      description: 'زيادة مستوى الصوت',
      examples: ['ارفع الصوت', 'صوت أعلى', 'زد الصوت']
    },
    {
      id: 'decrease-volume',
      command: 'اخفض الصوت',
      action: 'volume-down',
      category: 'control',
      description: 'خفض مستوى الصوت',
      examples: ['اخفض الصوت', 'صوت أخفض', 'قلل الصوت']
    },
    {
      id: 'help',
      command: 'المساعدة',
      action: 'help',
      category: 'accessibility',
      description: 'فتح صفحة المساعدة',
      examples: ['المساعدة', 'مساعدة', 'كيف أستخدم']
    },
    {
      id: 'read-page',
      command: 'اقرأ الصفحة',
      action: 'read-page',
      category: 'accessibility',
      description: 'قراءة محتوى الصفحة',
      examples: ['اقرأ الصفحة', 'اقرأ لي', 'تلاوة']
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = settings.language;

        recognitionInstance.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          const confidence = event.results[current][0].confidence;

          setTranscript(transcript);
          setConfidence(confidence);

          if (event.results[current].isFinal) {
            processCommand(transcript);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
        recognitionRef.current = recognitionInstance;
      } else {
        setIsSupported(false);
      }

      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update recognition language
  useEffect(() => {
    if (recognition) {
      recognition.lang = settings.language;
    }
  }, [settings.language, recognition]);

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Find matching command
    const matchedCommand = voiceCommands.find(cmd => 
      cmd.examples.some(example => 
        lowerCommand.includes(example.toLowerCase())
      )
    );

    if (matchedCommand) {
      executeCommand(matchedCommand);
      setLastCommand(matchedCommand.command);
      
      if (settings.visualFeedback) {
        showVisualFeedback(matchedCommand);
      }
    } else {
      speak('لم أفهم الأمر. حاول مرة أخرى.');
    }
  };

  const executeCommand = (command: VoiceCommand) => {
    switch (command.action) {
      case '/home':
        window.location.href = '/home';
        break;
      case '/courses':
        window.location.href = '/courses';
        break;
      case '/profile':
        window.location.href = '/profile';
        break;
      case 'search':
        const searchQuery = transcript.replace(/ابحث عن|بحث/gi, '').trim();
        if (searchQuery) {
          window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
        break;
      case 'play':
        // Trigger play action
        document.dispatchEvent(new CustomEvent('voice-play'));
        speak('تم تشغيل الفيديو');
        break;
      case 'pause':
        // Trigger pause action
        document.dispatchEvent(new CustomEvent('voice-pause'));
        speak('تم إيقاف الفيديو');
        break;
      case 'next':
        // Trigger next action
        document.dispatchEvent(new CustomEvent('voice-next'));
        speak('الانتقال للفيديو التالي');
        break;
      case 'previous':
        // Trigger previous action
        document.dispatchEvent(new CustomEvent('voice-previous'));
        speak('الانتقال للفيديو السابق');
        break;
      case 'volume-up':
        // Trigger volume up action
        document.dispatchEvent(new CustomEvent('voice-volume-up'));
        speak('تم رفع الصوت');
        break;
      case 'volume-down':
        // Trigger volume down action
        document.dispatchEvent(new CustomEvent('voice-volume-down'));
        speak('تم خفض الصوت');
        break;
      case 'help':
        setShowCommands(true);
        speak('فتح قائمة الأوامر الصوتية');
        break;
      case 'read-page':
        readPageContent();
        break;
      default:
        speak('تم تنفيذ الأمر');
    }
  };

  const speak = (text: string) => {
    if (!synthesis) return;

    // Cancel any ongoing speech
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.language;
    utterance.rate = settings.speed;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synthesis.speak(utterance);
  };

  const readPageContent = () => {
    const mainContent = document.querySelector('main, .main-content, #main') || document.body;
    const text = (mainContent as HTMLElement).innerText || mainContent.textContent || '';
    
    if (text.length > 0) {
      speak('سأقرأ محتوى الصفحة لك');
      setTimeout(() => speak(text.substring(0, 200)), 1000);
    } else {
      speak('لا يوجد محتوى لقراءته');
    }
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const showVisualFeedback = (command: VoiceCommand) => {
    // Create visual feedback element
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    feedback.innerHTML = `
      <div class="flex items-center gap-2">
        <CheckCircle size={16} />
        <span>${command.command}</span>
      </div>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  };

  const getCommandIcon = (category: string) => {
    switch (category) {
      case 'navigation': return <Home size={16} />;
      case 'control': return <Play size={16} />;
      case 'search': return <Search size={16} />;
      case 'accessibility': return <Accessibility size={16} />;
      default: return <Command size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'bg-blue-100 text-blue-700';
      case 'control': return 'bg-green-100 text-green-700';
      case 'search': return 'bg-purple-100 text-purple-700';
      case 'accessibility': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                isListening ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {isListening ? (
                  <Mic className="text-red-600 animate-pulse" size={24} />
                ) : (
                  <MicOff className="text-blue-600" size={24} />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">التحكم الصوتي</h1>
                <p className="text-gray-600">
                  {isListening ? 'جاري الاستماع...' : 'اضغط على الميكروفون للبدء'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCommands(!showCommands)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Command size={18} />
                الأوامر
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Voice Control Panel */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={toggleListening}
                disabled={!isSupported}
                className={`w-24 h-24 rounded-full transition-all transform hover:scale-105 ${
                  isListening 
                    ? 'bg-red-600 text-white animate-pulse' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isListening ? <Mic size={32} /> : <MicOff size={32} />}
              </button>
            </div>

            {/* Transcript */}
            {transcript && (
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">ما قلته:</span>
                  <span className="text-sm text-gray-500">
                    الثقة: {Math.round(confidence * 100)}%
                  </span>
                </div>
                <p className="text-gray-900">{transcript}</p>
              </div>
            )}

            {/* Last Command */}
            {lastCommand && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">آخر أمر تم تنفيذه:</span>
                </div>
                <p className="text-green-800">{lastCommand}</p>
              </div>
            )}

            {/* Status Indicators */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isSupported ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {isSupported ? 'مدعوم' : 'غير مدعوم'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
                }`} />
                <span className="text-sm text-gray-600">
                  {isListening ? 'يستمع' : 'غير نشط'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                }`} />
                <span className="text-sm text-gray-600">
                  {isSpeaking ? 'يتحدث' : 'صامت'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-4">إعدادات التحكم الصوتي</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اللغة
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ar-SA">العربية</option>
                    <option value="en-US">English</option>
                    <option value="fr-FR">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سرعة الكلام
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.speed}
                    onChange={(e) => setSettings({...settings, speed: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1">{settings.speed}x</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    درجة الصوت
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.pitch}
                    onChange={(e) => setSettings({...settings, pitch: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1">{settings.pitch}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مستوى الصوت
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.volume}
                    onChange={(e) => setSettings({...settings, volume: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 mt-1">{Math.round(settings.volume * 100)}%</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الاستماع التلقائي</p>
                    <p className="text-sm text-gray-600">الاستماع المستمر للأوامر</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, autoListen: !settings.autoListen})}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.autoListen ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoListen ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">تأكيد الإجراءات</p>
                    <p className="text-sm text-gray-600">طلب تأكيد قبل تنفيذ الأوامر</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, confirmActions: !settings.confirmActions})}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.confirmActions ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.confirmActions ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الملاحظات البصرية</p>
                    <p className="text-sm text-gray-600">عرض تأثيرات بصرية للأوامر</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, visualFeedback: !settings.visualFeedback})}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.visualFeedback ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.visualFeedback ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Commands List */}
        <AnimatePresence>
          {showCommands && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">الأوامر الصوتية المتاحة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {voiceCommands.map((command) => (
                  <div
                    key={command.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(command.category)}`}>
                        {getCommandIcon(command.category)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{command.command}</h3>
                        <p className="text-sm text-gray-600">{command.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 font-medium">أمثلة:</p>
                      {command.examples.map((example, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessibility Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Accessibility size={24} className="text-blue-600" />
            ميزات إضافية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => speak('اختبار التحكم الصوتي')}
              className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-right"
            >
              <Volume2 size={20} className="text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">اختبار الصوت</p>
              <p className="text-sm text-blue-700">استماع لاختبار النطق</p>
            </button>

            <button
              onClick={() => setShowCommands(true)}
              className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-right"
            >
              <Command size={20} className="text-purple-600 mb-2" />
              <p className="font-medium text-purple-900">عرض الأوامر</p>
              <p className="text-sm text-purple-700">قائمة الأوامر المتاحة</p>
            </button>

            <button
              onClick={() => readPageContent()}
              className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-right"
            >
              <MessageSquare size={20} className="text-green-600 mb-2" />
              <p className="font-medium text-green-900">قراءة الصفحة</p>
              <p className="text-sm text-green-700">تلاوة المحتوى الحالي</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Voice Assistant Hook
export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ar-SA';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  return { isListening, transcript, isSupported, startListening, stopListening };
}
