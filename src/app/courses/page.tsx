"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const categories = [
  'Ø§Ù„ÙƒÙ„', 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', 'Ø§Ù„ØªØµÙ…ÙŠÙ…', 'Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª', 'Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ', 
  'Ø§Ù„ØªØ³ÙˆÙŠÙ‚', 'Ø§Ù„ØªØ·ÙˆÙŠØ± Ø§Ù„Ø´Ø®ØµÙŠ', 'Ø§Ù„Ø±ÙŠØ§Ø¯Ø©'
];

const difficultyLevels = ['Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø³ØªÙˆÙŠØ§Øª', 'Ù…Ø¨ØªØ¯Ø¦', 'Ù…ØªÙˆØ³Ø·', 'Ù…ØªÙ‚Ø¯Ù…'];

const coursesData = [
  { id: 1, title: 'Ø§Ø­ØªØ±Ø§Ù Python 2026', category: 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', instructor: 'Ø£Ø­Ù…Ø¯ Ù…Ø­Ù…ÙˆØ¯', rating: 4.9, students: 12500, duration: '18 Ø³Ø§Ø¹Ø©', price: 0, featured: true },
  { id: 2, title: 'Next.js Ø§Ù„Ù…ØªÙ‚Ø¯Ù…', category: 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', instructor: 'Ø³Ø§Ø±Ø© Ø¹Ù„ÙŠ', rating: 4.8, students: 8900, duration: '24 Ø³Ø§Ø¹Ø©', price: 49.99, featured: true },
  { id: 3, title: 'ØªØµÙ…ÙŠÙ… UI/UX Ø§Ø­ØªØ±Ø§ÙÙŠ', category: 'Ø§Ù„ØªØµÙ…ÙŠÙ…', instructor: 'Ù…Ø­Ù…Ø¯ Ø³Ø§Ù„Ù…', rating: 4.7, students: 7600, duration: '30 Ø³Ø§Ø¹Ø©', price: 39.99, featured: false },
  { id: 4, title: 'React Ù…Ù† Ø§Ù„ØµÙØ± Ù„Ù„Ø¥Ø­ØªØ±Ø§Ù', category: 'Ø§Ù„Ø¨Ø±Ù…Ø¬Ø©', instructor: 'Ù„ÙŠÙ„Ù‰ Ø£Ø­Ù…Ø¯', rating: 4.9, students: 14200, duration: '36 Ø³Ø§Ø¹Ø©', price: 0, featured: true },
  { id: 5, title: 'ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø¹ Python', category: 'Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª', instructor: 'Ø®Ø§Ù„Ø¯ Ø­Ø³ÙŠÙ†', rating: 4.6, students: 5400, duration: '28 Ø³Ø§Ø¹Ø©', price: 59.99, featured: false },
  { id: 6, title: 'Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ÙŠ', category: 'Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ', instructor: 'Ù†ÙˆØ±Ø§ Ø¹Ø¨Ø¯Ø§Ù„Ù„Ù‡', rating: 4.8, students: 3200, duration: '40 Ø³Ø§Ø¹Ø©', price: 79.99, featured: true },
  { id: 7, title: 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø§Ù„Ø±Ù‚Ù…ÙŠ Ø§Ù„Ù…ØªÙ‚Ø¯Ù…', category: 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚', instructor: 'Ø¹Ù…Ø± Ø§Ù„Ù‚Ø§Ø³Ù…', rating: 4.5, students: 8900, duration: '22 Ø³Ø§Ø¹Ø©', price: 29.99, featured: false },
  { id: 8, title: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„Ø±Ø´ÙŠÙ‚Ø©', category: 'Ø§Ù„ØªØ·ÙˆÙŠØ± Ø§Ù„Ø´Ø®ØµÙŠ', instructor: 'Ø±ÙŠÙ… Ø§Ù„Ø®Ø§Ù„Ø¯', rating: 4.7, students: 4500, duration: '20 Ø³Ø§Ø¹Ø©', price: 44.99, featured: false },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Ø§Ù„ÙƒÙ„');
  const [selectedLevel, setSelectedLevel] = useState('Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø³ØªÙˆÙŠØ§Øª');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // ÙÙ„ØªØ±Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Øª
  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === 'Ø§Ù„ÙƒÙ„' || course.category === selectedCategory;
    const matchesSearch = course.title.includes(searchQuery) || course.instructor.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Ø¯Ø§Ù„Ø© Ù„ØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ù„Ù…Ù†Ø¹ Ø®Ø·Ø£ Hydration
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6">Ø§Ø³ØªÙƒØ´Ù Ø¹Ø§Ù„Ù… Ø§Ù„Ù…Ø¹Ø±ÙØ©</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            Ø§Ø®ØªØ± Ù…Ù† Ø¨ÙŠÙ† Ù…Ø¦Ø§Øª Ø§Ù„Ø¯ÙˆØ±Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø§Ù„Ù…ØµÙ…Ù…Ø© Ù…Ù† Ù‚Ø¨Ù„ Ø®Ø¨Ø±Ø§Ø¡ Ù„ØªÙ†Ù…ÙŠØ© Ù…Ù‡Ø§Ø±Ø§ØªÙƒ ÙˆØªØ­Ù‚ÙŠÙ‚ Ø£Ù‡Ø¯Ø§ÙÙƒ Ø§Ù„Ù…Ù‡Ù†ÙŠØ©
          </p>
          
          {/* Ø´Ø±ÙŠØ· Ø§Ù„Ø¨Ø­Ø« */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="p-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <input
                type="text"
                placeholder="Ø§Ø¨Ø­Ø« Ø¹Ù† Ø¯ÙˆØ±Ø©ØŒ Ù…Ø¯Ø±Ø¨ØŒ Ø£Ùˆ ØªØ®ØµØµ..."
                className="flex-1 p-4 text-gray-900 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" size="lg" className="rounded-xl">
                Ø¨Ø­Ø«
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ù…Ø­ØªÙˆÙ‰ Ø§Ù„ØµÙØ­Ø© */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Ø§Ù„Ø´Ø±ÙŠØ· Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ Ù„Ù„ØªØµÙÙŠØ© */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Filter size={24} />
                <h2 className="text-2xl font-bold">ØªØµÙÙŠØ© Ø§Ù„Ù†ØªØ§Ø¦Ø¬</h2>
              </div>

              {/* Ø§Ù„ØªØµÙ†ÙŠÙØ§Øª */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-4">Ø§Ù„ØªØµÙ†ÙŠÙØ§Øª</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-right p-3 rounded-lg transition-all ${
                        selectedCategory === cat 
                          ? 'bg-blue-50 text-blue-600 font-bold border-2 border-blue-200' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµØ¹ÙˆØ¨Ø© */}
              <div>
                <h3 className="font-bold text-gray-700 mb-4">Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµØ¹ÙˆØ¨Ø©</h3>
                <div className="space-y-2">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`block w-full text-right p-3 rounded-lg transition-all ${
                        selectedLevel === level 
                          ? 'bg-blue-50 text-blue-600 font-bold border-2 border-blue-200' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Øª */}
          <div className="lg:w-3/4">
            {/* Ø´Ø±ÙŠØ· Ø§Ù„ØªØ­ÙƒÙ… */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø¯ÙˆØ±Ø§Øª <span className="text-blue-600">({filteredCourses.length})</span>
                </h2>
                <p className="text-gray-500 mt-2">Ø¹Ø±Ø¶ {filteredCourses.length} Ø¯ÙˆØ±Ø© Ù…Ù† Ø£ØµÙ„ {coursesData.length}</p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                >
                  <Grid size={24} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                >
                  <List size={24} />
                </button>
              </div>
            </div>

            {/* Ø¹Ø±Ø¶ Ø§Ù„Ø¯ÙˆØ±Ø§Øª */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-xl transition-shadow duration-300">
                    {course.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Ù…Ù…ÙŠØ²
                      </div>
                    )}
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl mb-4"></div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-full">
                          {course.category}
                        </span>
                        <div>
                          {course.price === 0 ? (
                            <span className="text-lg font-black text-green-600">Ù…Ø¬Ø§Ù†ÙŠ</span>
                          ) : (
                            <span className="text-lg font-black text-gray-900">${course.price}</span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-gray-500 mb-3">Ø§Ù„Ù…Ø¯Ø±Ø¨: {course.instructor}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 font-bold">â˜…</span>
                          <span className="font-bold">{course.rating}</span>
                          <span className="text-gray-400">({formatNumber(course.students)})</span>
                        </div>
                        <span className="text-gray-500">{course.duration}</span>
                      </div>
                      <Button variant="primary" className="w-full mt-6">
                        Ø¹Ø±Ø¶ Ø§Ù„ØªÙØ§ØµÙŠÙ„
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl"></div>
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-2">{course.instructor} â€¢ {course.category}</p>
                          </div>
                          <div className="text-right">
                            {course.price === 0 ? (
                              <span className="text-2xl font-black text-green-600">Ù…Ø¬Ø§Ù†ÙŠ</span>
                            ) : (
                              <span className="text-2xl font-black text-gray-900">${course.price}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-gray-600 mb-6">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500 font-bold">â˜…</span>
                            <span className="font-bold">{course.rating}</span>
                            <span>({formatNumber(course.students)} Ø·Ø§Ù„Ø¨)</span>
                          </div>
                          <span>â±ï¸ {course.duration}</span>
                          {course.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
                              Ù…Ù…ÙŠØ²
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-6 line-clamp-2">
                          ØªØ¹Ù„Ù… Ø£Ø­Ø¯Ø« ØªÙ‚Ù†ÙŠØ§Øª Ø§Ù„Ø¨Ø±Ù…Ø¬Ø© ÙˆØ§Ù„ØªØ·ÙˆÙŠØ± Ù…Ù† Ø®Ù„Ø§Ù„ Ù‡Ø°Ù‡ Ø§Ù„Ø¯ÙˆØ±Ø© Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ø§Ù„ØªÙŠ ØªØºØ·ÙŠ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…ÙØ§Ù‡ÙŠÙ… Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© ÙˆØ§Ù„Ù…ØªÙ‚Ø¯Ù…Ø©.
                        </p>
                        <div className="flex gap-4">
                          <Button variant="primary">Ø¨Ø¯Ø¡ Ø§Ù„ØªØ¹Ù„Ù…</Button>
                          <Button variant="outline">Ø§Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„ØªÙØ§ØµÙŠÙ„</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Ø¥Ø°Ø§ Ù„Ù… ØªÙˆØ¬Ø¯ Ù†ØªØ§Ø¦Ø¬ */}
            {filteredCourses.length === 0 && (
              <Card className="text-center py-16">
                <div className="text-gray-400 mb-4 text-6xl">ðŸ”</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Ù„Ù… Ù†Ø¹Ø«Ø± Ø¹Ù„Ù‰ Ø¯ÙˆØ±Ø§Øª</h3>
                <p className="text-gray-500">Ø¬Ø±Ø¨ ØªØºÙŠÙŠØ± ÙƒÙ„Ù…Ø§Øª Ø§Ù„Ø¨Ø­Ø« Ø£Ùˆ Ø§Ù„ØªØµÙ†ÙŠÙØ§Øª Ø§Ù„Ù…Ø­Ø¯Ø¯Ø©</p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Ø§Ù„ÙƒÙ„');
                  }}
                >
                  Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† Ø§Ù„ÙÙ„Ø§ØªØ±
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
