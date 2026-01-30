"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Users, 
  Globe, 
  Award, 
  Target, 
  Heart, 
  Lightbulb, 
  Rocket, 
  Shield,
  BookOpen,
  Star,
  TrendingUp,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: "125,430+", label: "طالب نشط", icon: Users },
    { number: "1,250+", label: "دورة تعليمية", icon: BookOpen },
    { number: "50+", label: "دولة", icon: Globe },
    { number: "98%", label: "رضا العملاء", icon: Heart },
    { number: "15+", label: "لغة مدعومة", icon: Award },
    { number: "24/7", label: "دعم فني", icon: Shield }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "الابتكار",
      description: "نحن نؤمن بالتعليم المبتكر الذي يستخدم أحدث التقنيات والأساليب التعليمية"
    },
    {
      icon: Heart,
      title: "الجودة",
      description: "نلتزم بتقديم محتوى تعليمي عالي الجودة من قبل أفضل الخبراء والمتخصصين"
    },
    {
      icon: Target,
      title: "التميز",
      description: "نسعى لتحقيق التميز في كل جانب من جوانب تجربة التعلم لدينا"
    },
    {
      icon: Users,
      title: "الشمولية",
      description: "نؤمن بأن التعليم الجيد يجب أن يكون متاحاً للجميع بغض النظر عن خلفياتهم"
    }
  ];

  const team = [
    {
      name: "أحمد محمد",
      position: "المؤسس والرئيس التنفيذي",
      image: "bg-blue-500",
      bio: "خبير في التعليم الرقمي مع أكثر من 15 عاماً من الخبرة"
    },
    {
      name: "سارة علي",
      position: "مديرة المنتجات",
      image: "bg-purple-500",
      bio: "متخصصة في تصميم تجارب التعلم التفاعلية"
    },
    {
      name: "محمد سالم",
      position: "مدير التقنية",
      image: "bg-green-500",
      bio: "خبير في تطوير المنصات التعليمية والتقنيات التعليمية"
    },
    {
      name: "ليلى أحمد",
      position: "مديرة المحتوى",
      image: "bg-orange-500",
      bio: "متخصصة في تطوير المناهج التعليمية والمحتوى التربوي"
    }
  ];

  const milestones = [
    { year: "2020", title: "تأسيس Lumo", description: "بدأنا رحلتنا بتوفير حلول تعليمية مبتكرة" },
    { year: "2021", title: "إطلاق المنصة", description: "أطلقنا منصتنا التعليمية الأولى" },
    { year: "2022", title: "التوسع العالمي", description: "وصلنا إلى 20 دولة حول العالم" },
    { year: "2023", title: "مليون طالب", description: "تجاوزنا حاجز المليون طالب" },
    { year: "2024", title: "الابتكار التكنولوجي", description: "أضفنا AI والتعلم التكيفي" },
    { year: "2026", title: "الريادة العالمية", description: "أصبحنا منصة عالمية رائدة" }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              نحن Lumo، منصة تعليمية عالمية تهدف إلى جعل التعلم عالي الجودة متاحاً للجميع
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                ابدأ رحلتك
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">رؤيتنا ورسالتنا</h2>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">رؤيتنا</h3>
                  <p className="text-gray-700">
                    أن نكون المنصة التعليمية الرائدة عالمياً التي تمكّن Millions من المتعلمين من تحقيق أهدافهم التعليمية والمهنية من خلال تعليم مبتكر وعالي الجودة.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">رسالتنا</h3>
                  <p className="text-gray-700">
                    توفير تعليم عالي الجودة ومتاح للجميع من خلال تقنيات مبتكرة ومحتوى مصمم بعناية لضمان أفضل تجربة تعلم ممكنة.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="p-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
                <Rocket className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-4">انضم إلى ثورة التعلم</h3>
                <p className="mb-6">
                  كن جزءاً من مجتمع المتعلمين الذين يغيرون مستقبلهم من خلال التعليم المبتكر.
                </p>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  ابدأ الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قيمنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              القيم التي توجه كل ما نقوم به في Lumo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">فريقنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نلتقي فريقاً من الخبراء الشغوفين بالتعليم والتكنولوجيا
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-24 h-24 ${member.image} rounded-full mx-auto mb-4`}></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">رحلتنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              من فكرة بسيطة إلى منصة عالمية
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <div className="text-blue-600 font-bold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white"></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن هنا لمساعدتك في أي وقت
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">العنوان</h3>
              <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600">info@lumo.com</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">الهاتف</h3>
              <p className="text-gray-600">+966 50 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">انضم إلى مجتمع Lumo</h2>
          <p className="text-xl mb-8">
            ابدأ رحلتك التعليمية اليوم وانضم إلى آلاف المتعلمين حول العالم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                استكشف الدورات
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                سجل مجاناً
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
