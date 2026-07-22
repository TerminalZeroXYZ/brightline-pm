import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Suggestions
export const submitSuggestion = (data) => api.post('/api/suggestions', data)
export const getSuggestions = () => api.get('/api/suggestions')

// Markets
export const getMarkets = () => api.get('/api/markets')
export const getMarket = (id) => api.get(`/api/markets/${id}`)

export default api
