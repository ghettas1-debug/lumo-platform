// Test setup file
import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

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
    isLoading: false,
    setLoading: vi.fn(),
    theme: 'light',
    sidebarOpen: true,
    toggleSidebar: vi.fn(),
  }),
  useCourseStore: () => ({
    courses: [],
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
    user: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
    updateProfile: vi.fn(),
  }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
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
}));

// Global test cleanup
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});
