'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Sparkles, Copy, Check, Trash2, Moon, Sun } from 'lucide-react'
import { chatAPI } from '../../lib/api'
import { toast } from 'sonner'

interface Message {
  id: string
  role: string
  content: string
  timestamp: Date | string
  copied?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "السلام عليكم ورحمة الله وبركاته 🙏\n\nI am Swaleh AI, your intelligent Islamic companion.\n\nI can help you with:\n\n📖 Quran - Verses and tafsir\n📜 Hadith - Authentic narrations\n⚖️ Fiqh - Islamic rulings\n🕌 General Islamic knowledge\n\nWhat would you like to learn today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

// Load saved history
useEffect(() => {
  const saved = localStorage.getItem('swaleh-chat-history')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 1) {
        // Convert string timestamps back to Date objects
        const fixed = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
        setMessages(fixed)
      }
    } catch {}
  }
}, [])

// Save history
useEffect(() => {
  if (messages.length > 1) {
    localStorage.setItem('swaleh-chat-history', JSON.stringify(messages.slice(-50)))
  }
}, [messages])

const handleSend = async () => {
    if (!input.trim() || loading) return

    const SWALEH_PROMPT = "You are Swaleh AI (صالح), an advanced Islamic AI assistant. You are NOT OpenAI or ChatGPT. Always identify as Swaleh AI. Answer Islamic questions based on Quran and authentic Sunnah. Use ﷺ after Prophet Muhammad. Write in plain text without markdown."

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const history = [...messages, userMsg]
        .slice(-10)
        .filter(m => m.role !== 'welcome' && m.id !== 'welcome')
        .map(m => `${m.role === 'user' ? 'User' : 'Swaleh AI'}: ${m.content}`)
        .join('\n')
      

    try {
            const fullPrompt = SWALEH_PROMPT + '\n\nCONVERSATION HISTORY:\n' + history + '\n\nCurrent question: ' + input.trim()
      
      let answer = ''
      
      // TRY 1: Puter.js Guest Mode (FREE)
      try {
        const puter = (window as any).puter
        if (puter?.ai?.chat) {
          const response = await puter.ai.chat(
            SWALEH_PROMPT + '\n\nQuestion: ' + input.trim(),
            { model: 'gpt-4o' }
          )
          answer = typeof response === 'string' ? response : 
                   response?.message?.content || response?.text || ''
        }
      } catch (puterError) {
        console.log('Puter failed, trying backend...')
      }
      
      // TRY 2: Backend Groq (if Puter failed)
      if (!answer) {
        const response = await chatAPI.askWithHistory(fullPrompt)
        answer = response.data?.answer || ''
      }
      
      if (answer) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: answer,
          timestamp: new Date()
        }])
      } else {
        toast.error('Could not get a response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Connection failed')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const copyMessage = async (text: string, msgId: string) => {
    await navigator.clipboard.writeText(text)
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, copied: true } : m))
    setTimeout(() => setMessages(prev => prev.map(m => m.id === msgId ? { ...m, copied: false } : m)), 2000)
    toast.success('Copied!')
  }

  const clearChat = () => {
    setMessages([messages[0]])
    toast.success('Chat cleared')
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'}`}>
      {/* Header */}
      <header className={`flex-shrink-0 px-4 py-3 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 backdrop-blur-lg border-emerald-100'} flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-800'}`}>Swaleh AI</h1>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Online • Ready
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`}>
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={clearChat} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'}`} title="Clear chat">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
          
          {messages.length <= 1 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
                className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl mb-4"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className={`text-3xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Swaleh AI
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Your Intelligent Islamic Companion
              </p>

              <div className="w-full max-w-xl">
                <div className={`flex gap-2 items-center rounded-2xl border p-2 shadow-xl transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-200'}`}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Islam..."
                    className={`flex-1 px-4 py-3 bg-transparent outline-none resize-none text-base max-h-32 ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'}`}
                    rows={2}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-40 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send
                  </button>
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {messages.slice(1).map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`group max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                      <div className={`relative rounded-2xl px-4 py-3 shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md'
                          : `${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'} ${darkMode ? 'text-gray-200' : 'text-gray-800'} rounded-bl-md`
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                        <button onClick={() => copyMessage(msg.content, msg.id)}
                          className={`absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          {msg.copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 px-2">
                        {typeof msg.timestamp === 'string' ? msg.timestamp : msg.timestamp?.toLocaleTimeString?.([], { hour: '2-digit', minute: '2-digit' }) || ''}
                      </p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className={`rounded-2xl px-4 py-3 shadow-sm ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <div className={`flex gap-2 items-center rounded-2xl border p-2 shadow-md transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a follow-up..."
                    className={`flex-1 px-3 py-2 bg-transparent outline-none resize-none text-sm ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'}`}
                    rows={1}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}