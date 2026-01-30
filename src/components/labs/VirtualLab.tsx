// Virtual Labs Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Beaker, 
  FlaskConical, 
  Microscope, 
  TestTube,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Eye,
  Hand,
  Timer,
  Thermometer,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  BookOpen,
  Download,
  Upload,
  Save,
  Share2,
  Users,
  MessageSquare,
  Video,
  Award
} from 'lucide-react';

interface LabStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  materials: string[];
  safety: string[];
  duration: number;
  completed: boolean;
}

interface LabExperiment {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  steps: LabStep[];
  objectives: string[];
  prerequisites: string[];
  equipment: string[];
}

interface VirtualLabProps {
  experiment?: LabExperiment;
  onProgress?: (progress: number) => void;
}

export function VirtualLab({ experiment, onProgress }: VirtualLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [labState, setLabState] = useState<any>({});
  const [observations, setObservations] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSafety, setShowSafety] = useState(true);
  const [showMaterials, setShowMaterials] = useState(true);
  const [temperature, setTemperature] = useState(25);
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState('');
  const [currentExperimentState, setCurrentExperimentState] = useState<LabExperiment | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Default experiment if none provided
  const defaultExperiment: LabExperiment = {
    id: 'exp1',
    title: 'تجربة تفاعل الحمض والقاعدة',
    category: 'الكيمياء',
    difficulty: 'intermediate',
    duration: 45,
    steps: [
      {
        id: 'step1',
        title: 'التحضير للتجربة',
        description: 'تجهيز المواد والمعدات اللازمة',
        instructions: [
          'ارتدِ ملابس الحماية والنظارات الواقية',
          'جهز كأس بيري ومحلول حمض الهيدروكلوريك',
          'جهز محلول هيدروكسيد الصوديوم',
          'جهز ورقة عباد الشمس للكشف عن الحموضة'
        ],
        materials: ['كأس بيري', 'حمض الهيدروكلوريك', 'هيدروكسيد الصوديوم', 'ورقة عباد الشمس', 'قطارة'],
        safety: ['ارتدِ نظارات واقية', 'عمل في مكان جيد التهوية', 'لا تشرب المواد الكيميائية'],
        duration: 10,
        completed: false
      },
      {
        id: 'step2',
        title: 'تنفيذ التجربة',
        description: 'إجراء تفاعل التعادل',
        instructions: [
          'أضف 50 مل من حمض الهيدروكلوريك إلى كأس بيري',
          'أضف بضع قطرات من ورقة عباد الشمس',
          'أضف هيدروكسيد الصوديوم قطرة قطرة مع التحريك',
          'لاحظ تغير اللون عند نقطة التعادل'
        ],
        materials: [],
        safety: ['أضف القاعدة ببطء', 'راقب التفاعل بعناية'],
        duration: 20,
        completed: false
      },
      {
        id: 'step3',
        title: 'الملاحظات والنتائج',
        description: 'تسجيل الملاحظات وتحليل النتائج',
        instructions: [
          'سجل لون المحلول عند كل إضافة',
          'لاحظ درجة الحرارة',
          'سجل حجم القاعدة المستخدم',
          'اكتب الاستنتاجات'
        ],
        materials: ['دفتر ملاحظات', 'قلم'],
        safety: [],
        duration: 15,
        completed: false
      }
    ],
    objectives: [
      'فهم تفاعل التعادل بين الحمض والقاعدة',
      'تعلم استخدام الدلائل اللونية',
      'حساب تركيز المحلول'
    ],
    prerequisites: ['أساسيات الكيمياء', 'معرفة بالحموضة والقاعدية'],
    equipment: ['كأس بيري', 'قطارة', 'ميزان', 'مقياس حرارة']
  };

  const currentExperiment = currentExperimentState || experiment || defaultExperiment;

  // Initialize experiment state
  useEffect(() => {
    if (!currentExperimentState && !experiment) {
      setCurrentExperimentState(defaultExperiment);
    }
  }, [experiment, currentExperimentState]);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Calculate progress
  useEffect(() => {
    const completedSteps = currentExperiment.steps.filter(step => step.completed).length;
    const progress = (completedSteps / currentExperiment.steps.length) * 100;
    onProgress?.(progress);
  }, [currentExperiment.steps, onProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStepComplete = () => {
    const updatedSteps = [...currentExperiment.steps];
    updatedSteps[currentStep].completed = true;
    const updatedExperiment = { ...currentExperiment, steps: updatedSteps };
    setCurrentExperimentState(updatedExperiment);
    
    if (currentStep < currentExperiment.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setTimer(0);
    setIsTimerRunning(false);
    setObservations([]);
    setNotes('');
    const resetSteps = currentExperiment.steps.map(step => ({ ...step, completed: false }));
    const resetExperiment = { ...currentExperiment, steps: resetSteps };
    setCurrentExperimentState(resetExperiment);
  };

  const addObservation = (observation: string) => {
    setObservations([...observations, observation]);
  };

  const handleTemperatureChange = (newTemp: number) => {
    setTemperature(newTemp);
    // Simulate temperature effect on reaction
    if (newTemp > 30) {
      setLabState({ ...labState, reactionSpeed: 'fast' });
    } else if (newTemp < 20) {
      setLabState({ ...labState, reactionSpeed: 'slow' });
    } else {
      setLabState({ ...labState, reactionSpeed: 'normal' });
    }
  };

  const currentStepData = currentExperiment.steps[currentStep];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Beaker className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentExperiment.title}</h1>
                <p className="text-gray-600">{currentExperiment.category} • {currentExperiment.duration} دقيقة</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <Timer size={16} className="text-gray-600" />
                <span className="font-mono font-medium">{formatTime(timer)}</span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
              <button
                onClick={handleReset}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / currentExperiment.steps.length) * 100}%` }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>الخطوة {currentStep + 1} من {currentExperiment.steps.length}</span>
            <span>{Math.round(((currentStep + 1) / currentExperiment.steps.length) * 100)}% مكتمل</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Lab Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Virtual Lab Workspace */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Microscope size={20} className="text-blue-600" />
                  مساحة العمل الافتراضية
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-lg transition-colors ${
                      isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Video size={18} />
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
              </div>

              {/* Lab Simulation Area */}
              <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-96 relative overflow-hidden">
                {/* Virtual Equipment */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Beaker */}
                    <div className="w-32 h-40 bg-blue-200/30 border-2 border-blue-300 rounded-b-2xl relative">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-400/40 transition-all duration-1000"
                        style={{ height: `${labState.liquidLevel || 40}%` }}
                      />
                      <div className="absolute top-2 left-2 text-xs text-gray-600">
                        {labState.liquidLevel || 40}%
                      </div>
                    </div>
                    
                    {/* Test Tubes */}
                    <div className="absolute -right-16 top-8 space-y-2">
                      <div className="w-8 h-24 bg-red-200/30 border border-red-300 rounded-b-lg">
                        <div className="absolute bottom-0 left-0 right-0 bg-red-400/40 h-1/2" />
                      </div>
                      <div className="w-8 h-24 bg-green-200/30 border border-green-300 rounded-b-lg">
                        <div className="absolute bottom-0 left-0 right-0 bg-green-400/40 h-1/3" />
                      </div>
                    </div>

                    {/* Thermometer */}
                    <div className="absolute -left-12 top-4">
                      <div className="w-4 h-32 bg-gray-200 rounded-full relative">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-red-500 rounded-full transition-all"
                          style={{ height: `${(temperature / 100) * 100}%` }}
                        />
                        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-sm font-medium">
                          {temperature}°C
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTemperatureChange(temperature - 5)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                      <Thermometer size={16} className="text-gray-600" />
                      <span className="text-sm font-medium">{temperature}°C</span>
                    </div>
                    <button
                      onClick={() => handleTemperatureChange(temperature + 5)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLabState({ ...labState, liquidLevel: 60 })}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      إضافة سائل
                    </button>
                    <button
                      onClick={() => setLabState({ ...labState, stirring: !labState.stirring })}
                      className={`p-2 rounded-lg transition-colors ${
                        labState.stirring ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Hand size={16} />
                    </button>
                  </div>
                </div>

                {/* Recording Indicator */}
                {isRecording && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-100 text-red-600 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">جاري التسجيل</span>
                  </div>
                )}
              </div>

              {/* Step Instructions */}
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-3">{currentStepData.title}</h3>
                <p className="text-gray-600 mb-4">{currentStepData.description}</p>
                
                <div className="space-y-3">
                  {currentStepData.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{instruction}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={handleStepComplete}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    إكمال الخطوة
                  </button>
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      السابق
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Observations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Eye size={20} className="text-green-600" />
                الملاحظات
              </h3>
              
              <div className="space-y-3 mb-4">
                {observations.map((obs, index) => (
                  <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">{obs}</p>
                    <p className="text-xs text-green-600 mt-1">
                      {new Date().toLocaleTimeString('ar')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="سجل ملاحظاتك هنا..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (notes.trim()) {
                      addObservation(notes);
                      setNotes('');
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  إضافة
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Information */}
            <AnimatePresence>
              {showSafety && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-red-800 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      معلومات الأمان
                    </h3>
                    <button
                      onClick={() => setShowSafety(false)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {currentStepData.safety.map((safety, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-red-700">{safety}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Materials */}
            <AnimatePresence>
              {showMaterials && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-blue-800 flex items-center gap-2">
                      <FlaskConical size={18} />
                      المواد المطلوبة
                    </h3>
                    <button
                      onClick={() => setShowMaterials(false)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {[...currentExperiment.equipment, ...currentStepData.materials].map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <TestTube size={16} className="text-blue-600" />
                        <p className="text-sm text-blue-700">{material}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Objectives */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={18} className="text-yellow-600" />
                أهداف التجربة
              </h3>
              
              <div className="space-y-2">
                {currentExperiment.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs mt-0.5">
                      ✓
                    </div>
                    <p className="text-sm text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-right">
                  <Save size={16} className="text-gray-600" />
                  <span className="text-sm">حفظ التقدم</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-right">
                  <Download size={16} className="text-gray-600" />
                  <span className="text-sm">تحميل التقرير</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-right">
                  <Share2 size={16} className="text-gray-600" />
                  <span className="text-sm">مشاركة النتائج</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-right">
                  <Users size={16} className="text-gray-600" />
                  <span className="text-sm">دعوة زملاء</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lab Experiments Library Component
export function LabExperimentsLibrary() {
  const [experiments, setExperiments] = useState<LabExperiment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockExperiments: LabExperiment[] = [
    {
      id: 'exp1',
      title: 'تجربة تفاعل الحمض والقاعدة',
      category: 'الكيمياء',
      difficulty: 'intermediate',
      duration: 45,
      steps: [],
      objectives: [],
      prerequisites: [],
      equipment: []
    },
    {
      id: 'exp2',
      title: 'قوانين نيوتن للحركة',
      category: 'الفيزياء',
      difficulty: 'beginner',
      duration: 30,
      steps: [],
      objectives: [],
      prerequisites: [],
      equipment: []
    },
    {
      id: 'exp3',
      title: 'تكاثر الخلايا النباتية',
      category: 'الأحياء',
      difficulty: 'advanced',
      duration: 60,
      steps: [],
      objectives: [],
      prerequisites: [],
      equipment: []
    }
  ];

  useEffect(() => {
    setExperiments(mockExperiments);
  }, []);

  const categories = ['all', 'الكيمياء', 'الفيزياء', 'الأحياء', 'الرياضيات'];

  const filteredExperiments = experiments.filter(exp => {
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6">مختبرات لومو الافتراضية</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="البحث عن تجارب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'الكل' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiments.map((experiment) => (
              <div key={experiment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Beaker size={20} className="text-blue-600" />
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    experiment.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    experiment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {experiment.difficulty === 'beginner' ? 'مبتدئ' :
                     experiment.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{experiment.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{experiment.category}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Timer size={14} />
                    <span>{experiment.duration} دقيقة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TestTube size={14} />
                    <span>{experiment.steps.length} خطوات</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  بدء التجربة
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
