import Link from 'next/link'
import { Scale, MessageCircle } from 'lucide-react'

export default function FiqhPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-2xl border border-blue-100">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Scale className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Fiqh Rulings</h1>
        <p className="text-gray-500 mb-6">Insha'Allah, Islamic jurisprudence from 4 madhabs coming soon!</p>
        
        <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all">
          <MessageCircle className="w-5 h-5" /> Ask Swaleh AI
        </Link>
      </div>
    </div>
  )
}