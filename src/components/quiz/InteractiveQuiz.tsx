"use client";

import { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, Clock, Award, BarChart3, 
  Play, Pause, RotateCcw, ArrowRight, ArrowLeft,
  AlertCircle, Lightbulb, BookOpen, Target, Trophy
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in seconds
  hint?: string;
}

interface QuizResult {
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  answers: Array<{
    questionId: number;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
  }>;
}

interface InteractiveQuizProps {
  quizId: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // total time in seconds
  allowReview?: boolean;
  showHints?: boolean;
  onComplete?: (result: QuizResult) => void;
}

export default function InteractiveQuiz({
  quizId,
  title,
  description,
  questions,
  passingScore,
  timeLimit,
  allowReview = true,
  showHints = true,
  onComplete
}: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string | number>>(new Map());
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit || 0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | number>('');
  const [showHint, setShowHint] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  useEffect(() => {
    if (isStarted && !isCompleted && !isPaused) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted, isCompleted, isPaused]);

  useEffect(() => {
    if (isStarted && !isCompleted && !isPaused && currentQuestion?.timeLimit) {
      const timer = setInterval(() => {
        setQuestionTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted, isCompleted, isPaused, currentQuestionIndex, currentQuestion?.timeLimit]);

  useEffect(() => {
    if (currentQuestion) {
      setQuestionTimeLeft(currentQuestion.timeLimit || 0);
      setQuestionStartTime(Date.now());
      setSelectedOption(answers.get(currentQuestion.id) || '');
      setShowHint(false);
    }
  }, [currentQuestionIndex]);

  const handleStart = () => {
    setIsStarted(true);
    setTimeLeft(timeLimit || 0);
    setQuestionStartTime(Date.now());
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleSelectOption = (option: string | number) => {
    setSelectedOption(option);
    setAnswers(prev => new Map(prev.set(currentQuestion.id, option)));
  };

  const handleNextQuestion = () => {
    const timeSpent = (Date.now() - questionStartTime) / 1000;
    setTotalTimeSpent(prev => prev + timeSpent);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const timeSpent = (Date.now() - questionStartTime) / 1000;
    setTotalTimeSpent(prev => prev + timeSpent);
    
    const result = calculateResults();
    setIsCompleted(true);
    setShowResults(true);
    onComplete?.(result);
  };

  const calculateResults = (): QuizResult => {
    let score = 0;
    let correctAnswers = 0;
    const answersArray: QuizResult['answers'] = [];

    questions.forEach((question, index) => {
      const userAnswer = answers.get(question.id);
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        score += question.points;
        correctAnswers++;
      }

      answersArray.push({
        questionId: question.id,
        userAnswer: userAnswer || '',
        isCorrect,
        timeSpent: 0 // Would need to track per question
      });
    });

    return {
      score,
      totalPoints,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent: totalTimeSpent,
      answers: answersArray
    };
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setIsStarted(false);
    setIsCompleted(false);
    setShowResults(false);
    setTimeLeft(timeLimit || 0);
    setQuestionTimeLeft(0);
    setSelectedOption('');
    setShowHint(false);
    setTotalTimeSpent(0);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{questions.length}</div>
                <div className="text-sm text-gray-600">أسئلة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{totalPoints}</div>
                <div className="text-sm text-gray-600">نقطة إجمالية</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{passingScore}%</div>
                <div className="text-sm text-gray-600">درجة النجاح</div>
              </div>
            </div>

            {timeLimit && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" size={20} />
                  <div>
                    <div className="font-medium text-blue-900">الوقت المتاح</div>
                    <div className="text-sm text-blue-700">{formatTime(timeLimit)}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-gray-900">معلومات الاختبار:</h3>
              <div className="space-y-2">
                {questions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">السؤال {index + 1}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(q.difficulty)}`}>
                        {q.difficulty === 'easy' ? 'سهل' : q.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </span>
                      <span className="text-xs text-gray-500">{q.points} نقطة</span>
                    </div>
                    {q.timeLimit && (
                      <span className="text-xs text-gray-500">{formatTime(q.timeLimit)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleStart} variant="primary" size="lg">
                <Play size={20} className="ml-2" />
                بدء الاختبار
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const result = calculateResults();
    const percentage = (result.score / result.totalPoints) * 100;
    const passed = percentage >= passingScore;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {passed ? <Trophy size={40} /> : <XCircle size={40} />}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {passed ? 'تهانينا! لقد نجحت' : 'لم تنجح هذه المرة'}
              </h1>
              <p className="text-gray-600">
                {passed ? 'أداء ممتاز! لقد حققت الدرجة المطلوبة.' : 'لا تيأس، حاول مرة أخرى.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.score, result.totalPoints)}`}>
                  {result.score}/{result.totalPoints}
                </div>
                <div className="text-sm text-gray-600">النقطة</div>
                <div className="text-lg font-medium mt-1">{percentage.toFixed(1)}%</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">إجابات صحيحة</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatTime(Math.round(result.timeSpent))}
                </div>
                <div className="text-sm text-gray-600">الوقت المستغرق</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-3xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {passed ? 'ناجح' : 'راسب'}
                </div>
                <div className="text-sm text-gray-600">النتيجة</div>
              </div>
            </div>

            {allowReview && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">مراجعة الإجابات:</h3>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const userAnswer = answers.get(question.id);
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={index} className={`border rounded-lg p-4 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-2">
                              السؤال {index + 1}: {question.question}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              <div>إجابتك: {userAnswer || 'لم يجبب'}</div>
                              <div>الإجابة الصحيحة: {question.correctAnswer}</div>
                            </div>
                            <div className="text-sm text-gray-700 bg-white rounded p-2">
                              <strong>شرح:</strong> {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} variant="outline" size="lg">
                <RotateCcw size={20} className="ml-2" />
                إعادة الاختبار
              </Button>
              <Button onClick={() => window.history.back()} variant="primary" size="lg">
                <ArrowRight size={20} className="ml-2" />
                العودة
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>السؤال {currentQuestionIndex + 1} من {questions.length}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty === 'easy' ? 'سهل' : currentQuestion.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                </span>
                <span>{currentQuestion.points} نقطة</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {timeLimit && timeLimit > 0 && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                  timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Clock size={16} />
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>
              )}
              
              {currentQuestion.timeLimit && currentQuestion.timeLimit > 0 && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                  questionTimeLeft < 30 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Clock size={16} />
                  <span className="font-medium">{formatTime(questionTimeLeft)}</span>
                </div>
              )}
              
              <Button
                onClick={() => setIsPaused(!isPaused)}
                variant="outline"
                size="sm"
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>التقدم</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h2>

            {showHints && currentQuestion.hint && (
              <div className="mb-4">
                <Button
                  onClick={() => setShowHint(!showHint)}
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600"
                >
                  <Lightbulb size={16} className="ml-2" />
                  {showHint ? 'إخفاء تلميح' : 'عرض تلميح'}
                </Button>
                {showHint && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="text-blue-600 mt-0.5" size={16} />
                      <p className="text-sm text-blue-700">{currentQuestion.hint}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Multiple Choice */}
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full text-right p-4 rounded-lg border-2 transition-all ${
                      selectedOption === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === option && (
                          <div className="w-full h-full rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* True/False */}
            {currentQuestion.type === 'true-false' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectOption('true')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedOption === 'true'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-bold text-green-600">صحيح</div>
                </button>
                <button
                  onClick={() => handleSelectOption('false')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedOption === 'false'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-bold text-red-600">خطأ</div>
                </button>
              </div>
            )}

            {/* Fill in the Blank */}
            {currentQuestion.type === 'fill-blank' && (
              <input
                type="text"
                value={selectedOption as string}
                onChange={(e) => handleSelectOption(e.target.value)}
                placeholder="أدخل إجابتك هنا..."
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePreviousQuestion}
              variant="outline"
              disabled={currentQuestionIndex === 0}
            >
              <ArrowRight size={20} className="ml-2" />
              السابق
            </Button>

            <div className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {questions.length}
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} variant="primary">
                <Target size={20} className="ml-2" />
                إنهاء الاختبار
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} variant="primary">
                التالي
                <ArrowLeft size={20} className="mr-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
