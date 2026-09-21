import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import Link from 'next/link'
import Script from 'next/script'


export const metadata: Metadata = {
  title: 'Swaleh AI - Islamic Assistant',
  description: 'Advanced Islamic AI powered by authentic sources',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 font-sans antialiased">
        <Toaster position="top-center" richColors />
        
        {/* Top Nav */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow">
                <span className="text-white text-sm font-bold">س</span>
              </div>
              Swaleh AI
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all">Home</Link>
              <Link href="/chat" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all">Chat</Link>
              <Link href="/quran" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all">Quran</Link>
            </nav>
          </div>
        </header>
<Script 
  src="https://js.puter.com/v2/" async
  strategy="afterInteractive"
/>
        {/* Main */}
        <main className="pb-20 md:pb-0">{children}</main>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-2 py-1.5">
          <div className="flex justify-around max-w-lg mx-auto">
            {[
              { icon: '🏠', label: 'Home', href: '/' },
              { icon: '💬', label: 'Chat', href: '/chat' },
              { icon: '📖', label: 'Quran', href: '/quran' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl text-gray-500 hover:text-emerald-600 transition-colors">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </body>
    </html>
  )
}
