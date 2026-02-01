import { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'it',
    name: 'تكنولوجيا المعلومات',
    slug: 'it',
    description: 'دورات في البرمجة والشبكات والأمن السيبراني',
    icon: 'book-open',
    color: 'blue',
    courseCount: 1292,
    isActive: true,
    order: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'health',
    name: 'الصحة',
    slug: 'health',
    description: 'دورات في الطب والتمريض والصحة العامة',
    icon: 'heart',
    color: 'red',
    courseCount: 1102,
    isActive: true,
    order: 2,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'language',
    name: 'اللغات',
    slug: 'language',
    description: 'دورات في تعلم اللغات المختلفة',
    icon: 'languages',
    color: 'green',
    courseCount: 316,
    isActive: true,
    order: 3,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'business',
    name: 'الأعمال',
    slug: 'business',
    description: 'دورات في إدارة الأعمال والتمويل',
    icon: 'briefcase',
    color: 'purple',
    courseCount: 1777,
    isActive: true,
    order: 4,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'management',
    name: 'الإدارة',
    slug: 'management',
    description: 'دورات في الإدارة والقيادة',
    icon: 'users',
    color: 'indigo',
    courseCount: 1098,
    isActive: true,
    order: 5,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'personal-development',
    name: 'التطوير الشخصي',
    slug: 'personal-development',
    description: 'دورات في التطوير الذاتي والمهارات الشخصية',
    icon: 'trending-up',
    color: 'yellow',
    courseCount: 1350,
    isActive: true,
    order: 6,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find(category => category.slug === slug);
};

export const getActiveCategories = (): Category[] => {
  return CATEGORIES.filter(category => category.isActive);
};

export const getCategoriesByOrder = (): Category[] => {
  return CATEGORIES.sort((a, b) => a.order - b.order);
};
