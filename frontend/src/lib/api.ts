import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export const chatAPI = {
  ask: (query: string) => axios.post(`${API_URL}/api/v1/chat/ask`, {
    query,
    language: 'en',
    include_sources: true,
    authenticate_only: true
  }),
  
  askWithHistory: (fullPrompt: string) => axios.post(`${API_URL}/api/v1/chat/ask`, {
    query: fullPrompt,
    language: 'en',
    include_sources: false,
    authenticate_only: false
  })
}