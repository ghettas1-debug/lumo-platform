import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-600 mb-4 block">
              LUMO
            </Link>
            <p className="text-gray-500 max-w-sm">
              منصة تعليمية رائدة تهدف لتمكين المبرمجين والمبدعين في العالم العربي من خلال محتوى عالي الجودة.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">المنصة</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/courses" className="hover:text-blue-600">الدورات</Link></li>
              <li><Link href="/instructors" className="hover:text-blue-600">المدربون</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600">الأسعار</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">الدعم</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/faq" className="hover:text-blue-600">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">اتصل بنا</Link></li>
              <li><Link href="/help" className="hover:text-blue-600">المساعدة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">قانوني</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/terms" className="hover:text-blue-600">الشروط والأحكام</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">سياسة الخصوصية</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-50 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} LUMO Platform. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
