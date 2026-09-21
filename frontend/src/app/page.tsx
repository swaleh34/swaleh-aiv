import Link from 'next/link'
import { MessageCircle, BookOpen, Scroll, Scale, Sparkles, Send, ArrowRight, Zap, Globe, Shield, Star } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative pt-20 md:pt-32 pb-20 px-4 text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="animate-fadeUp">
            <span className="text-5xl md:text-7xl arabic block mb-4 text-emerald-700">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <p className="text-emerald-600 text-base md:text-lg mb-8 font-medium">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          <div className="animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your Intelligent <span className="gradient-text">Islamic</span> Companion
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto">
              Islamic knowledge. Quran, Hadith, Fiqh — all in one place.
            </p>
          </div>

          <div className="animate-fadeUp flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
            <Link href="/chat" className="group inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-glow">
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Chatting Now
            </Link>
            <Link href="/quran" className="inline-flex items-center gap-3 px-8 py-5 bg-white border-2 border-emerald-200 text-emerald-700 rounded-2xl font-bold text-lg hover:bg-emerald-50 hover:shadow-xl transition-all">
              <BookOpen className="w-6 h-6" />
              Explore Quran
            </Link>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Explore Islamic Knowledge
        </h2>
        <p className="text-gray-500 text-center mb-12">Comprehensive resources</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: 'Quran & Tafsir', desc: 'Search any verse with authentic explanations from classical scholars', href: '/quran', bg: 'bg-emerald-50', color: 'text-emerald-600', ring: 'hover:ring-emerald-300' },
            { icon: Scroll, title: 'Hadith Collections', desc: 'Browse authentic hadith from Bukhari, Muslim & more', href: '/hadith', bg: 'bg-amber-50', color: 'text-amber-600', ring: 'hover:ring-amber-300' },
            { icon: Scale, title: 'Fiqh Rulings', desc: 'Islamic jurisprudence from all four madhabs', href: '/fiqh', bg: 'bg-blue-50', color: 'text-blue-600', ring: 'hover:ring-blue-300' },
            { icon: MessageCircle, title: 'AI Chat', desc: 'Ask any Islamic question - unlimited, free, instant', href: '/chat', bg: 'bg-purple-50', color: 'text-purple-600', ring: 'hover:ring-purple-300' },
          ].map((f, i) => (
            <Link key={i} href={f.href}
              className={`group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ring-2 ring-transparent ${f.ring}`}>
              <div className={`w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                <f.icon className={`w-7 h-7 ${f.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
          <Sparkles className="w-12 h-12 mx-auto mb-4 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Learn?</h2>
          <p className="text-emerald-100 text-lg mb-8">Ask Swaleh AI anything. Unlimited, free, and always available.</p>
          <Link href="/chat" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-emerald-700 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all">
            <MessageCircle className="w-6 h-6" /> Start Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">س</span>
            </div>
            <span className="text-xl font-bold text-white">Swaleh AI</span>
          </div>
          <p className="text-gray-400 mb-2">Your Intelligent Islamic Companion</p>
          <p className="text-gray-500 text-sm">📚 Based on Quran & authentic Sunnah • والله أعلم</p>
        </div>
      </footer>
    </div>
  )
}