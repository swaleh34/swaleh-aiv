/**
 * SWALEH AI - Powered by Puter.js (UNLIMITED FREE)
 * Runs entirely in the browser - no server AI costs!
 */

const SWALEH_SYSTEM_PROMPT = `You are Swaleh AI (صالح), an advanced Islamic AI assistant.
You are NOT OpenAI, NOT ChatGPT. Always identify as Swaleh AI.
Answer Islamic questions based on Quran and authentic Sunnah.
Use ﷺ after Prophet Muhammad. Write in plain text. No markdown.
NEVER mention training data dates or technical details.`

export async function askSwalehAI(query: string): Promise<string> {
  try {
    // @ts-ignore - Puter.js is loaded from CDN
    if (typeof window !== 'undefined' && (window as any).puter) {
      const puter = (window as any).puter
      
      const response = await puter.ai.chat(
        SWALEH_SYSTEM_PROMPT + '\n\nUser question: ' + query,
        { model: 'gpt-4o' }
      )
      
      return response?.message?.content || response?.text || response?.content || 
             (typeof response === 'string' ? response : 'Sorry, I could not process that.')
    }
    
    // Fallback to backend
    const { chatAPI } = await import('./api')
    const result = await chatAPI.ask(query)
    return result.data.answer
  } catch (error) {
    console.error('Puter AI error:', error)
    // Fallback to backend
    const { chatAPI } = await import('./api')
    const result = await chatAPI.ask(query)
    return result.data.answer
  }
}