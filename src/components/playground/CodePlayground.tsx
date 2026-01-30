'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Download,
  Upload,
  Share2,
  Copy,
  Check,
  X,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Code,
  Terminal,
  FileCode,
  FolderOpen,
  Save,
  RefreshCw,
  Zap,
  Bug,
  Lightbulb,
  BookOpen,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Lock,
  Unlock,
  Clock,
  TrendingUp,
  BarChart3,
  Users,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  Heart,
  Bookmark,
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Grid3x3,
  List,
  Layers,
  Package,
  GitBranch,
  GitCommit,
  GitMerge,
  Database,
  Server,
  Cloud,
  Shield,
  Key,
  Fingerprint,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Contrast
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimatedWrapper, AnimatedProgress } from '@/components/ui/Animations';

// Code Editor interfaces
interface File {
  id: string;
  name: string;
  content: string;
  language: string;
  path: string;
  isFolder: boolean;
  children?: File[];
  isOpen?: boolean;
  isActive?: boolean;
}

interface Tab {
  id: string;
  file: File;
  isDirty: boolean;
  position?: { line: number; column: number };
}

interface ConsoleMessage {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
  source?: string;
}

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration: number;
  error?: string;
  output?: string;
}

interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  language: string;
  code: string;
  dependencies?: string[];
  tags: string[];
}

// Supported languages
const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: <Code className="w-4 h-4" />, color: '#f7df1e' },
  { id: 'typescript', name: 'TypeScript', icon: <Code className="w-4 h-4" />, color: '#3178c6' },
  { id: 'python', name: 'Python', icon: <Terminal className="w-4 h-4" />, color: '#3776ab' },
  { id: 'java', name: 'Java', icon: <FileCode className="w-4 h-4" />, color: '#f89820' },
  { id: 'cpp', name: 'C++', icon: <FileCode className="w-4 h-4" />, color: '#00599c' },
  { id: 'html', name: 'HTML', icon: <Globe className="w-4 h-4" />, color: '#e34f26' },
  { id: 'css', name: 'CSS', icon: <Layers className="w-4 h-4" />, color: '#1572b6' },
  { id: 'json', name: 'JSON', icon: <Database className="w-4 h-4" />, color: '#000000' },
];

// Code templates
const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'react-component',
    name: 'React Component',
    description: 'Basic React functional component',
    language: 'javascript',
    code: `import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello World!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default MyComponent;`,
    tags: ['react', 'component', 'javascript'],
  },
  {
    id: 'python-function',
    name: 'Python Function',
    description: 'Basic Python function with documentation',
    language: 'python',
    code: `def calculate_area(length: float, width: float) -> float:
    """
    Calculate the area of a rectangle.
    
    Args:
        length (float): The length of the rectangle
        width (float): The width of the rectangle
    
    Returns:
        float: The area of the rectangle
    """
    return length * width

# Example usage
area = calculate_area(10.0, 5.0)
print(f"The area is: {area}")`,
    tags: ['python', 'function', 'basic'],
  },
  {
    id: 'typescript-interface',
    name: 'TypeScript Interface',
    description: 'TypeScript interface and type definitions',
    language: 'typescript',
    code: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`,
    tags: ['typescript', 'interface', 'class'],
  },
];

// Code Playground Component
export function CodePlayground({
  initialCode = '',
  language = 'javascript',
  theme = 'dark',
  onCodeChange,
  onRun,
  onSave,
}: {
  initialCode?: string;
  language?: string;
  theme?: 'dark' | 'light';
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  onSave?: (code: string) => void;
}) {
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'main.js',
      content: initialCode || '// Welcome to Code Playground\\nconsole.log("Hello, World!");',
      language,
      path: '/main.js',
      isFolder: false,
      isActive: true,
    },
  ]);
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      file: files[0],
      isDirty: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [code, setCode] = useState(initialCode || '');
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-save effect
  useEffect(() => {
    if (autoSave && activeTab?.isDirty) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [code, autoSave, activeTab?.isDirty]);

  // Update code when active tab changes
  useEffect(() => {
    if (activeTab) {
      setCode(activeTab.file.content);
    }
  }, [activeTab]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // Update file content
    const updatedFiles = files.map(file => 
      file.id === activeTab?.id 
        ? { ...file, content: newCode }
        : file
    );
    setFiles(updatedFiles);
    
    // Update tab dirty state
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTab?.id 
        ? { ...tab, isDirty: true }
        : tab
    );
    setTabs(updatedTabs);
    
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setError('');
    setOutput('');
    
    // Add console message
    const runMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type: 'info',
      message: 'Running code...',
      timestamp: new Date(),
    };
    setConsoleMessages(prev => [...prev, runMessage]);
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple evaluation for demo (in real app, this would use a sandbox)
      if (language === 'javascript') {
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.join(' '));
        };
        
        try {
          // eslint-disable-next-line no-eval
          eval(code);
          setOutput(logs.join('\\n'));
          
          const successMessage: ConsoleMessage = {
            id: (Date.now() + 1).toString(),
            type: 'log',
            message: logs.join(' ') || 'Code executed successfully',
            timestamp: new Date(),
          };
          setConsoleMessages(prev => [...prev, successMessage]);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(errorMessage);
          
          const errorConsoleMessage: ConsoleMessage = {
            id: (Date.now() + 1).toString(),
            type: 'error',
            message: errorMessage,
            timestamp: new Date(),
          };
          setConsoleMessages(prev => [...prev, errorConsoleMessage]);
        } finally {
          console.log = originalLog;
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Execution failed';
      setError(errorMessage);
    } finally {
      setIsRunning(false);
    }
    
    if (onRun) {
      onRun(code);
    }
  };

  const handleSave = () => {
    if (activeTab) {
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTab.id 
          ? { ...tab, isDirty: false }
          : tab
      );
      setTabs(updatedTabs);
      
      if (onSave) {
        onSave(code);
      }
    }
  };

  const handleCreateFile = () => {
    const newFile: File = {
      id: Date.now().toString(),
      name: 'new-file.js',
      content: '',
      language: 'javascript',
      path: '/new-file.js',
      isFolder: false,
      isActive: true,
    };
    
    setFiles([...files, newFile]);
    
    const newTab: Tab = {
      id: newFile.id,
      file: newFile,
      isDirty: false,
    };
    
    setTabs([...tabs, newTab]);
    setActiveTab(newTab);
  };

  const handleCreateFolder = () => {
    const newFolder: File = {
      id: Date.now().toString(),
      name: 'new-folder',
      content: '',
      language: '',
      path: '/new-folder',
      isFolder: true,
      children: [],
      isOpen: true,
    };
    
    setFiles([...files, newFolder]);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
    setTabs(tabs.filter(t => t.id !== fileId));
    
    if (activeTab?.id === fileId && tabs.length > 1) {
      const remainingTabs = tabs.filter(t => t.id !== fileId);
      setActiveTab(remainingTabs[0]);
    }
  };

  const handleTabClose = (tabId: string) => {
    const updatedTabs = tabs.filter(t => t.id !== tabId);
    setTabs(updatedTabs);
    
    if (activeTab?.id === tabId && updatedTabs.length > 0) {
      setActiveTab(updatedTabs[0]);
    }
  };

  const handleTabSwitch = (tab: Tab) => {
    setActiveTab(tab);
  };

  const getLanguageIcon = (lang: string) => {
    const language = SUPPORTED_LANGUAGES.find(l => l.id === lang);
    return language?.icon || <Code className="w-4 h-4" />;
  };

  const getLanguageColor = (lang: string) => {
    const language = SUPPORTED_LANGUAGES.find(l => l.id === lang);
    return language?.color || '#666';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const getConsoleIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warn': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${selectedTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        selectedTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-500" />
            <span className={`font-semibold ${selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Code Playground
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={activeTab?.file.language || 'javascript'}
              className={`px-2 py-1 rounded text-sm ${
                selectedTheme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowFileExplorer(!showFileExplorer)}>
            <FolderOpen className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowConsole(!showConsole)}>
            <Terminal className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        {showFileExplorer && (
          <div className={`w-64 border-l flex flex-col ${
            selectedTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Files
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCreateFile}>
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCreateFolder}>
                    <FolderOpen className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {files.map(file => (
                <div
                  key={file.id}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                    activeTab?.id === file.id
                      ? selectedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      : selectedTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    const tab = tabs.find(t => t.id === file.id);
                    if (tab) handleTabSwitch(tab);
                  }}
                >
                  {file.isFolder ? (
                    <FolderOpen className="w-4 h-4 text-yellow-500" />
                  ) : (
                    getLanguageIcon(file.language)
                  )}
                  <span className={`text-sm ${selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className={`flex items-center border-b overflow-x-auto ${
            selectedTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-3 py-2 border-r cursor-pointer ${
                  activeTab?.id === tab.id
                    ? selectedTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                    : selectedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={() => handleTabSwitch(tab)}
              >
                {getLanguageIcon(tab.file.language)}
                <span className={`text-sm ${selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {tab.file.name}
                </span>
                {tab.isDirty && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClose(tab.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          {/* Editor Toolbar */}
          <div className={`flex items-center justify-between px-4 py-2 border-b ${
            selectedTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <Button
                variant={isRunning ? 'outline' : 'primary'}
                size="sm"
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Run
                  </>
                )}
              </Button>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <RotateCcw className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className={`text-xs ${selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {fontSize}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              <Button
                variant={wordWrap ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setWordWrap(!wordWrap)}
              >
                Wrap
              </Button>
              
              <Button
                variant={showLineNumbers ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setShowLineNumbers(!showLineNumbers)}
              >
                Lines
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative">
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className={`w-full h-full p-4 font-mono text-sm resize-none focus:outline-none ${
                selectedTheme === 'dark'
                  ? 'bg-gray-900 text-gray-100'
                  : 'bg-white text-gray-900'
              }`}
              style={{
                fontSize: `${fontSize}px`,
                whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
                direction: 'ltr',
              }}
              placeholder="Start coding..."
              spellCheck={false}
            />
            
            {showLineNumbers && (
              <div className={`absolute left-0 top-0 bottom-0 w-12 p-4 text-right font-mono text-sm pointer-events-none ${
                selectedTheme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
              }`}>
                {code.split('\\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
            )}
          </div>

          {/* Console */}
          {showConsole && (
            <div className={`h-48 border-t flex flex-col ${
              selectedTheme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span className={`text-sm font-medium ${selectedTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Console
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setConsoleMessages([])}
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </div>
              
              <div ref={consoleRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                {consoleMessages.length === 0 ? (
                  <div className={`text-center ${selectedTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    No output yet. Run your code to see results.
                  </div>
                ) : (
                  consoleMessages.map(message => (
                    <div key={message.id} className="flex items-start gap-2 mb-1">
                      {getConsoleIcon(message.type)}
                      <span className={selectedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {message.message}
                      </span>
                      <span className={`text-xs ${selectedTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Code Templates Component
export function CodeTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const filteredTemplates = CODE_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || template.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Templates</h1>
        <p className="text-gray-600">Start with pre-built code templates for various languages and frameworks</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Languages</option>
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.id} value={lang.id}>{lang.name}</option>
          ))}
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getLanguageIcon(template.language)}
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(template.language) }}
              />
            </div>
            
            <p className="text-gray-600 mb-4">{template.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTemplate(template)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-1" />
                Use
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getLanguageIcon(selectedTemplate.language)}
                    <h2 className="text-xl font-semibold">{selectedTemplate.name}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-gray-600 mt-2">{selectedTemplate.description}</p>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{selectedTemplate.code}</code>
                </pre>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper functions
function getLanguageIcon(lang: string) {
  const language = SUPPORTED_LANGUAGES.find(l => l.id === lang);
  return language?.icon || <Code className="w-4 h-4" />;
}

function getLanguageColor(lang: string) {
  const language = SUPPORTED_LANGUAGES.find(l => l.id === lang);
  return language?.color || '#666';
}
