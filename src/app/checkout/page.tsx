"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Shield, Lock, Check, AlertCircle, ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, CreditCard as CardIcon, Calendar, Smartphone, Wallet, Banknote } from 'lucide-react';
import { Button } from '@\/components\/ui\/Button';
import { Card } from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Form states
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'المملكة العربية السعودية',
    postalCode: ''
  });

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    saveCard: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Plan data (would come from URL params or state)
  const plan = {
    name: 'الخطة الاحترافية',
    price: 59.99,
    duration: 'شهري',
    features: [
      'الوصول إلى جميع الدورات',
      'شهادات معتمدة',
      'دعم فني 24/7',
      'تحميل الدروس',
      'دورات حصرية'
    ],
    originalPrice: 99.99,
    discount: 40
  };

  const steps = [
    { id: 1, name: 'معلومات الدفع', icon: CreditCard },
    { id: 2, name: 'تفاصيل الفاتورة', icon: User },
    { id: 3, name: 'التأكيد', icon: Check }
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'بطاقة ائتمان',
      icon: CreditCard,
      description: 'فيزا، ماستر كارد، أمريكان إكسبريس'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'الدفع عبر Apple Pay'
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: Smartphone,
      description: 'الدفع عبر Google Pay'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'الدفع الآمن عبر PayPal'
    },
    {
      id: 'bank',
      name: 'تحويل بنكي',
      icon: Banknote,
      description: 'تحويل مباشر من حسابك البنكي'
    }
  ];

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (paymentMethod === 'card') {
        if (!cardInfo.number) newErrors.cardNumber = 'رقم البطاقة مطلوب';
        else if (!/^\d{16}$/.test(cardInfo.number.replace(/\s/g, ''))) {
          newErrors.cardNumber = 'رقم البطاقة غير صالح';
        }

        if (!cardInfo.name) newErrors.cardName = 'الاسم على البطاقة مطلوب';
        
        if (!cardInfo.expiry) newErrors.expiry = 'تاريخ الانتهاء مطلوب';
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiry)) {
          newErrors.expiry = 'صيغة التاريخ غير صحيحة (MM/YY)';
        }

        if (!cardInfo.cvv) newErrors.cvv = 'CVV مطلوب';
        else if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
          newErrors.cvv = 'CVV غير صالح';
        }
      }
    }

    if (currentStep === 2) {
      if (!billingInfo.firstName) newErrors.firstName = 'الاسم الأول مطلوب';
      if (!billingInfo.lastName) newErrors.lastName = 'الاسم الأخير مطلوب';
      if (!billingInfo.email) newErrors.email = 'البريد الإلكتروني مطلوب';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingInfo.email)) {
        newErrors.email = 'البريد الإلكتروني غير صالح';
      }
      if (!billingInfo.phone) newErrors.phone = 'رقم الهاتف مطلوب';
      if (!billingInfo.address) newErrors.address = 'العنوان مطلوب';
      if (!billingInfo.city) newErrors.city = 'المدينة مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsComplete(true);
    } catch (error) {
      setErrors({ general: 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">تمت عملية الدفع بنجاح!</h1>
            <p className="text-gray-600 mb-8">
              شكراً لاشتراكك في {plan.name}. ستصلك رسالة تأكيد على بريدك الإلكتروني قريباً.
            </p>
            <div className="space-y-4">
              <Button variant="default" size="lg" className="w-full">
                الانتقال إلى لوحة التحكم
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                عرض الفاتورة
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowRight size={20} />
            العودة إلى الأسعار
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الاشتراك</h1>
          <p className="text-gray-600">اختر طريقة الدفع وأكمل معلوماتك للحصول على {plan.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon size={20} />
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-full h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">اختر طريقة الدفع</h2>
                  
                  {/* Payment Methods */}
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full p-4 border rounded-lg text-right transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <method.icon size={24} className="text-gray-600" />
                            <div>
                              <h3 className="font-medium text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === method.id
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {paymentMethod === method.id && (
                              <div className="w-full h-full rounded-full bg-white"></div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <h3 className="font-medium text-gray-900">معلومات البطاقة</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رقم البطاقة
                        </label>
                        <Input
                          type="text"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          error={errors.cardNumber}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الاسم على البطاقة
                        </label>
                        <Input
                          type="text"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="أحمد محمد"
                          error={errors.cardName}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            تاريخ الانتهاء
                          </label>
                          <Input
                            type="text"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                            placeholder="MM/YY"
                            maxLength={5}
                            error={errors.expiry}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <Input
                            type="text"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                            placeholder="123"
                            maxLength={4}
                            error={errors.cvv}
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={cardInfo.saveCard}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, saveCard: e.target.checked }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">حفظ معلومات البطاقة للدفع المستقبلي</span>
                      </label>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                    <Shield className="text-blue-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium text-blue-900">دفع آمن 100%</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        جميع معلوماتك مشفرة ومحمية بأعلى معايير الأمان
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">معلومات الفاتورة</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الأول
                      </label>
                      <Input
                        type="text"
                        value={billingInfo.firstName}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="أحمد"
                        error={errors.firstName}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الأخير
                      </label>
                      <Input
                        type="text"
                        value={billingInfo.lastName}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="محمد"
                        error={errors.lastName}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني
                      </label>
                      <Input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="ahmed@example.com"
                        error={errors.email}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <Input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+966 50 123 4567"
                        error={errors.phone}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        العنوان
                      </label>
                      <Input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="شارع الملك فهد، حي النخيل"
                        error={errors.address}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المدينة
                      </label>
                      <Input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="الرياض"
                        error={errors.city}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الرمز البريدي
                      </label>
                      <Input
                        type="text"
                        value={billingInfo.postalCode}
                        onChange={(e) => setBillingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">تأكيد الطلب</h2>
                  
                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-4">ملخص الطلب</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{plan.name}</span>
                          <span className="font-medium">${plan.price}/{plan.duration}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>خصم ({plan.discount}%)</span>
                          <span>-${(plan.originalPrice - plan.price).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-bold text-lg">
                            <span>المجموع</span>
                            <span>${plan.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-4">طريقة الدفع</h3>
                      <div className="flex items-center gap-3">
                        {(() => {
                          const method = paymentMethods.find(m => m.id === paymentMethod);
                          return method ? (
                            <>
                              <method.icon size={24} className="text-gray-600" />
                              <span>{method.name}</span>
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    {/* Billing Info */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-4">معلومات الفاتورة</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">الاسم:</span> {billingInfo.firstName} {billingInfo.lastName}</p>
                        <p><span className="text-gray-600">البريد:</span> {billingInfo.email}</p>
                        <p><span className="text-gray-600">الهاتف:</span> {billingInfo.phone}</p>
                        <p><span className="text-gray-600">العنوان:</span> {billingInfo.address}, {billingInfo.city}</p>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        بالضغط على "إتمام الدفع"، أنت توافق على 
                        <Link href="/terms" className="text-blue-600 hover:text-blue-700"> الشروط والأحكام</Link> و
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-700"> سياسة الخصوصية</Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="default"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  السابق
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    التالي
                    <ArrowLeft size={18} className="mr-2" />
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري المعالجة...
                      </span>
                    ) : (
                      'إتمام الدفع'
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص الاشتراك</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.duration}</span>
                </div>
                
                {plan.discount > 0 && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-500 line-through">${plan.originalPrice}</span>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      وفر {plan.discount}%
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="text-green-500" size={16} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">المجموع</span>
                  <span className="font-bold text-xl">${plan.price}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  سيتم التجديد تلقائياً كل {plan.duration}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <Shield size={24} />
                  <Lock size={24} />
                  <CreditCard size={24} />
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  دفع آمن ومشفر بالكامل
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

