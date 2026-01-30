"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List, ShoppingCart, Star, Clock, Users, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const categories = [
  '????', '???????', '???????', '????????', '?????? ?????????', 
  '???????', '??????? ??????', '???????'
];

const difficultyLevels = ['???? ?????????', '?????', '?????', '?????'];

const coursesData = [
  { id: 1, title: '?????? Python 2026', category: '???????', instructor: '???? ?????', rating: 4.9, students: 12500, duration: '18 ????', price: 0, featured: true },
  { id: 2, title: 'Next.js ???????', category: '???????', instructor: '???? ???', rating: 4.8, students: 8900, duration: '24 ????', price: 49.99, featured: true },
  { id: 3, title: '????? UI/UX ???????', category: '???????', instructor: '???? ????', rating: 4.7, students: 7600, duration: '30 ????', price: 39.99, featured: false },
  { id: 4, title: 'React ?? ????? ????????', category: '???????', instructor: '???? ????', rating: 4.9, students: 14200, duration: '36 ????', price: 0, featured: true },
  { id: 5, title: '????? ???????? ?? Python', category: '????????', instructor: '???? ????', rating: 4.6, students: 5400, duration: '28 ????', price: 59.99, featured: false },
  { id: 6, title: '?????? ????????? ????????', category: '?????? ?????????', instructor: '???? ???????', rating: 4.8, students: 3200, duration: '40 ????', price: 79.99, featured: true },
  { id: 7, title: '??????? ?????? ???????', category: '???????', instructor: '??? ??????', rating: 4.5, students: 8900, duration: '22 ????', price: 29.99, featured: false },
  { id: 8, title: '????? ???????? ???????', category: '??????? ??????', instructor: '??? ??????', rating: 4.7, students: 4500, duration: '20 ????', price: 44.99, featured: false },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('????');
  const [selectedLevel, setSelectedLevel] = useState('???? ?????????');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // ????? ???????
  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === '????' || course.category === selectedCategory;
    const matchesSearch = course.title.includes(searchQuery) || course.instructor.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // ???? ?????? ??????? ???? ??? Hydration
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6">????? ???? ???????</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
            ???? ?? ??? ???? ??????? ????????? ??????? ?? ??? ????? ?????? ??????? ?????? ?????? ???????
          </p>
          
          {/* ???? ????? */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center">
              <div className="p-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <input
                type="text"
                placeholder="???? ?? ????? ????? ?? ????..."
                className="flex-1 p-4 text-gray-900 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" size="lg" className="rounded-xl">
                ???
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ????? ?????? */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ?????? ??????? ??????? */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Filter size={24} />
                <h2 className="text-2xl font-bold">????? ???????</h2>
              </div>

              {/* ????????? */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-4">?????????</h3>
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

              {/* ????? ??????? */}
              <div>
                <h3 className="font-bold text-gray-700 mb-4">????? ???????</h3>
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

          {/* ????? ??????? */}
          <div className="lg:w-3/4">
            {/* ???? ?????? */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  ???? ??????? <span className="text-blue-600">({filteredCourses.length})</span>
                </h2>
                <p className="text-gray-500 mt-2">??? {filteredCourses.length} ???? ?? ??? {coursesData.length}</p>
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

            {/* ??? ??????? */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                      {course.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          ????
                        </div>
                      )}
                      <div className="h-48 bg-linear-to-r from-blue-400 to-purple-500 rounded-xl mb-4"></div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-full">
                            {course.category}
                          </span>
                          <div>
                            {course.price === 0 ? (
                              <span className="text-lg font-black text-green-600">?????</span>
                            ) : (
                              <span className="text-lg font-black text-gray-900">${course.price}</span>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-gray-500 mb-3">??????: {course.instructor}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-500" size={14} fill="currentColor" />
                              <span className="font-bold">{course.rating}</span>
                              <span className="text-gray-400">({formatNumber(course.students)})</span>
                            </div>
                            <span className="text-gray-500">{course.duration}</span>
                          </div>
                          <Button variant="primary" className="w-full mt-6">
                            ??? ????????
                          </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCourses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <div className="h-48 bg-linear-to-r from-blue-400 to-purple-500 rounded-xl"></div>
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-black text-gray-900 mb-2">{course.title}</h3>
                              <p className="text-gray-600 mb-2">{course.instructor} • {course.category}</p>
                            </div>
                            <div className="text-right">
                              {course.price === 0 ? (
                                <span className="text-2xl font-black text-green-600">?????</span>
                              ) : (
                                <span className="text-2xl font-black text-gray-900">${course.price}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                              <Star className="text-yellow-500" size={16} fill="currentColor" />
                              <span className="font-bold">{course.rating}</span>
                              <span>({formatNumber(course.students)} ????)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={16} />
                              <span>{formatNumber(course.students)} ????</span>
                            </div>
                            {course.featured && (
                              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
                                ????
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-6 line-clamp-2">
                            ???? ???? ?????? ??????? ?????? ????? ?? ???? ??????? ????????? ??????? ???? ???? ???? ????? ??????? ????????.
                          </p>
                          <div className="flex gap-4">
                            <Button variant="primary">??? ??????</Button>
                            <Button variant="outline">?????? ?? ????????</Button>
                            <Button variant="outline" size="sm">
                              <ShoppingCart size={16} className="ml-2" />
                              ????? ?????
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* ??? ?? ???? ????? */}
            {filteredCourses.length === 0 && (
              <Card className="text-center py-16">
                <div className="text-gray-400 mb-4 text-6xl">??</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">?? ???? ??? ?????</h3>
                <p className="text-gray-500 mb-6">??? ????? ??????? ?? ????? ?????</p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('????');
                  }}
                >
                  ????? ????? ???????
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
