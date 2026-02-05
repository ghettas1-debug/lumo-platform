// Test setup file
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Set test environment variable
Object.defineProperty(process, 'NODE_ENV', {
  value: 'test',
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
});

// Mock fetch
global.fetch = vi.fn();

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    search: '?test=true',
    href: 'http://localhost:3000/?test=true',
    origin: 'http://localhost:3000',
    protocol: 'http:',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname: '/',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
  writable: true,
});

// Mock Notification API
Object.defineProperty(window, 'Notification', {
  value: {
    requestPermission: vi.fn().mockResolvedValue('granted'),
    permission: 'granted',
  },
  writable: true,
});

// Mock performance APIs
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
  },
  writable: true,
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
  return setTimeout(() => cb(performance.now()), 0) as unknown as number;
});
global.cancelAnimationFrame = vi.fn((id: number) => clearTimeout(id));

// Mock Worker
global.Worker = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  terminate: vi.fn(),
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

// Mock crypto
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'mock-uuid'),
    getRandomValues: vi.fn(() => new Uint32Array(1)),
  },
  writable: true,
});

// Mock React
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
  };
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    option: 'option',
    label: 'label',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    a: 'a',
    img: 'img',
    ul: 'ul',
    ol: 'ol',
    li: 'li',
    nav: 'nav',
    header: 'header',
    footer: 'footer',
    main: 'main',
    section: 'section',
    article: 'article',
    aside: 'aside',
    figure: 'figure',
    figcaption: 'figcaption',
    blockquote: 'blockquote',
    hr: 'hr',
    br: 'br',
    code: 'code',
    pre: 'pre',
  },
  AnimatePresence: 'div',
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
  }),
  useInView: () => false,
  useScroll: () => ({
    scrollY: { get: () => 0 },
    scrollX: { get: () => 0 },
  }),
  useTransform: (value: any, inputRange: any, outputRange: any) => outputRange[0],
  useMotionValue: (initial: any) => ({
    get: () => initial,
    set: vi.fn(),
  }),
  useSpring: () => ({}),
  useReducedMotion: () => false,
}));

// Mock Zustand stores
vi.mock('../../lib/state/store', () => ({
  useUIStore: () => ({
    user: {
      name: 'Test User',
      email: 'test@example.com',
      avatar: '/images/test-avatar.jpg',
    },
    notifications: [
      {
        id: '1',
        type: 'info',
        title: 'Welcome!',
        message: 'Welcome to Lumo Platform',
        timestamp: Date.now(),
        read: false,
      },
    ],
    unreadCount: 1,
    isLoading: false,
    error: null,
    addNotification: vi.fn(),
    removeNotification: vi.fn(),
    markAsRead: vi.fn(),
    clearNotifications: vi.fn(),
    setLoading: vi.fn(),
    setError: vi.fn(),
    theme: 'light',
    sidebarOpen: true,
    toggleSidebar: vi.fn(),
  }),
  useCourseStore: () => ({
    courses: [
      {
        id: '1',
        title: 'Advanced TypeScript',
        description: 'Master TypeScript with advanced patterns and best practices',
        instructor: 'John Smith',
        instructorAvatar: '/images/instructors/john.jpg',
        rating: 4.9,
        students: 8900,
        duration: '35 ساعة',
        level: 'متقدم',
        price: 69.99,
        originalPrice: 129.99,
        image: '/images/courses/typescript.jpg',
        category: 'تطوير الويب',
        tags: ['TypeScript', 'Advanced', 'Patterns', 'Best Practices'],
        isEnrolled: true,
        progress: 80,
        isNew: false,
        isBestseller: true,
      },
      {
        id: '2',
        title: 'Featured Courses',
        description: 'Explore our featured courses',
        instructor: 'Test Instructor',
        instructorAvatar: '/images/instructors/test.jpg',
        rating: 4.8,
        students: 5000,
        duration: '20 ساعة',
        level: 'مبتدئ',
        price: 49.99,
        originalPrice: 99.99,
        image: '/images/courses/featured.jpg',
        category: 'Featured',
        tags: ['Featured', 'Popular'],
        isEnrolled: false,
        progress: 0,
        isNew: true,
        isBestseller: true,
      },
    ],
    enrolledCourses: [
      {
        id: '1',
        title: 'Advanced TypeScript',
        progress: 80,
      },
    ],
    featuredCourses: [
      {
        id: '2',
        title: 'Featured Courses',
      },
    ],
    loading: false,
    error: null,
    fetchCourses: vi.fn(),
    searchCourses: vi.fn(),
    filterCourses: vi.fn(),
    enrollInCourse: vi.fn(),
    bookmarkCourse: vi.fn(),
    rateCourse: vi.fn(),
  }),
  useUserStore: () => ({
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
      avatar: '/images/test-avatar.jpg',
      role: 'student',
    },
    isAuthenticated: true,
    isLoading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
    updateProfile: vi.fn(),
  }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react');
  return {
    ...actual,
    // Override specific icons if needed
    ChevronDown: () => 'ChevronDown',
    ChevronUp: () => 'ChevronUp',
    ChevronLeft: () => 'ChevronLeft',
    ChevronRight: () => 'ChevronRight',
    X: () => 'X',
    Menu: () => 'Menu',
    Search: () => 'Search',
    Bell: () => 'Bell',
    User: () => 'User',
    Settings: () => 'Settings',
    Home: () => 'Home',
    Book: () => 'Book',
    Play: () => 'Play',
    Pause: () => 'Pause',
    Check: () => 'Check',
    AlertCircle: () => 'AlertCircle',
    Info: () => 'Info',
    Loader2: () => 'Loader2',
    Eye: () => 'Eye',
    EyeOff: () => 'EyeOff',
    Heart: () => 'Heart',
    Star: () => 'Star',
    Clock: () => 'Clock',
    Calendar: () => 'Calendar',
    Filter: () => 'Filter',
    Download: () => 'Download',
    Upload: () => 'Upload',
    Trash2: () => 'Trash2',
    Edit: () => 'Edit',
    Copy: () => 'Copy',
    Share: () => 'Share',
    Plus: () => 'Plus',
    Minus: () => 'Minus',
    ArrowRight: () => 'ArrowRight',
    ArrowLeft: () => 'ArrowLeft',
    ArrowUp: () => 'ArrowUp',
    ArrowDown: () => 'ArrowDown',
    ExternalLink: () => 'ExternalLink',
    Mail: () => 'Mail',
    Phone: () => 'Phone',
    MapPin: () => 'MapPin',
    Globe: () => 'Globe',
    Sun: () => 'Sun',
    Moon: () => 'Moon',
    LogOut: () => 'LogOut',
    LogIn: () => 'LogIn',
    // Activity will be available from the actual module
  };
});

// Global test cleanup
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// Prevent unhandled errors during tests
process.on('unhandledRejection', (reason, promise) => {
  console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.warn('Uncaught Exception:', error);
});

// Suppress console warnings in tests unless debugging
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

if (process.env.NODE_ENV === 'test' && !process.env.DEBUG_TESTS) {
  console.warn = (...args) => {
    // Filter out expected warnings during tests
    const message = args[0];
    if (typeof message === 'string' && 
        (message.includes('act') || 
         message.includes('Warning') ||
         message.includes('component'))) {
      return;
    }
    originalConsoleWarn(...args);
  };
  
  console.error = (...args) => {
    // Filter out expected errors during tests
    const message = args[0];
    if (typeof message === 'string' && 
        (message.includes('Error') ||
         message.includes('Failed'))) {
      return;
    }
    originalConsoleError(...args);
  };
}
