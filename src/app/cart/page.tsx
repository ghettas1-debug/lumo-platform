"use client";

import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Shield, Truck, Clock, Star, BookOpen, Users, ChevronRight, X } from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'احتراف Python 2026 من الصفر إلى الاحتراف',
      instructor: 'أحمد محمود',
      price: 49.99,
      originalPrice: 99.99,
      quantity: 1,
      image: 'bg-blue-500',
      rating: 4.9,
      students: 15420,
      duration: 18,
      certificate: true,
      discount: 50
    },
    {
      id: 2,
      title: 'تطوير تطبيقات الويب مع React و Next.js',
      instructor: 'سارة علي',
      price: 39.99,
      originalPrice: 79.99,
      quantity: 1,
      image: 'bg-purple-500',
      rating: 4.8,
      students: 8930,
      duration: 24,
      certificate: true,
      discount: 50
    },
    {
      id: 3,
      title: 'تصميم UI/UX احترافي مع Figma',
      instructor: 'محمد سالم',
      price: 29.99,
      originalPrice: 59.99,
      quantity: 1,
      image: 'bg-pink-500',
      rating: 4.7,
      students: 6750,
      duration: 15,
      certificate: true,
      discount: 50
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'lumo10') {
      setAppliedPromo(promoCode);
      setPromoDiscount(10);
    } else if (promoCode.toLowerCase() === 'student20') {
      setAppliedPromo(promoCode);
      setPromoDiscount(20);
    } else {
      alert('كود الخصم غير صالح');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (promoDiscount / 100);
  const total = subtotal - discountAmount;

  const recommendedCourses = [
    {
      id: 4,
      title: 'تحليل البيانات مع Python و Pandas',
      instructor: 'ليلى أحمد',
      price: 34.99,
      originalPrice: 69.99,
      image: 'bg-green-500',
      rating: 4.6,
      students: 12300,
      discount: 50
    },
    {
      id: 5,
      title: 'التسويق الرقمي المتقدم',
      instructor: 'خالد حسين',
      price: 44.99,
      originalPrice: 89.99,
      image: 'bg-orange-500',
      rating: 4.5,
      students: 5670,
      discount: 50
    }
  ];

  const addToCart = (course: any) => {
    const newItem = {
      ...course,
      quantity: 1
    };
    setCartItems([...cartItems, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <ShoppingCart size={32} />
            <h1 className="text-3xl font-black">سلة التسوق</h1>
          </div>
          <p className="text-lg opacity-90">
            {cartItems.length} {cartItems.length === 1 ? 'دورة' : 'دورات'} في سلتك
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Course Image */}
                      <div className="md:w-1/4">
                        <div className={`h-32 ${item.image} rounded-lg`}></div>
                      </div>

                      {/* Course Info */}
                      <div className="md:w-1/2">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{item.instructor}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500" size={14} fill="currentColor" />
                            <span className="font-bold">{item.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{item.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{item.duration} ساعة</span>
                          </div>
                        </div>

                        {item.certificate && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Shield size={14} />
                            <span>شهادة معتمدة</span>
                          </div>
                        )}
                      </div>

                      {/* Price & Actions */}
                      <div className="md:w-1/4">
                        <div className="text-right mb-4">
                          <div className="text-2xl font-bold text-gray-900">
                            ${item.price}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </div>
                          <div className="text-sm text-green-600 font-bold">
                            وفر {item.discount}%
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-16">
                <ShoppingCart className="text-gray-400 mx-auto mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">سلتك فارغة</h3>
                <p className="text-gray-500 mb-6">
                  أضف بعض الدورات لتبدأ رحلتك التعليمية
                </p>
                <Button variant="default">
                  استكشف الدورات
                </Button>
              </Card>
            )}

            {/* Recommended Courses */}
            {cartItems.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">قد يعجبك أيضاً</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id} className="p-4">
                      <div className="flex gap-4">
                        <div className={`w-20 h-20 ${course.image} rounded-lg shrink-0`}></div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-bold text-gray-900">
                                ${course.price}
                              </div>
                              <div className="text-xs text-gray-500 line-through">
                                ${course.originalPrice}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(course)}
                            >
                              إضافة
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h3>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>خصم ({appliedPromo})</span>
                    <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>المجموع</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  كود الخصم
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="أدخل كود الخصم"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <Button
                    variant="outline"
                    onClick={applyPromoCode}
                    disabled={!promoCode}
                  >
                    تطبيق
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 text-sm text-green-600">
                    ✅ تم تطبيق كود الخصم {appliedPromo}
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="text-green-500" size={16} />
                  <span>ضمان استرداد المال لمدة 30 يوماً</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="text-blue-500" size={16} />
                  <span>وصول فوري للدورة</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="text-purple-500" size={16} />
                  <span>وصول مدى الحياة</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                variant="default"
                size="lg"
                className="w-full mb-4"
                disabled={cartItems.length === 0}
              >
                <CreditCard size={20} className="ml-2" />
                إتمام الشراء
              </Button>

              {/* Security Note */}
              <div className="text-center text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield size={16} />
                  <span>دفع آمن ومشفر</span>
                </div>
                <p>نقبل جميع بطاقات الائتمان الرئيسية</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">طالب راضٍ</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
              <div className="text-gray-600">متوسط التقييم</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">30</div>
              <div className="text-gray-600">يوم ضمان</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">دعم فني</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

