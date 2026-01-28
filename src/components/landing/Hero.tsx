export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
          تعلم بلا حدود مع <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LUMO</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          انضم إلى مستقبل التعليم الرقمي. دورات احترافية مصممة لتنقلك من الصفر إلى الاحتراف بأحدث التقنيات.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            ابدأ رحلتك مجاناً
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all">
            تصفح الدورات
          </button>
        </div>
      </div>
    </section>
  );
}
