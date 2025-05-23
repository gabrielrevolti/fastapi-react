import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false // ou true se for usar cookies
})

// Intercepta erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.detail || 'Erro inesperado'
      toast.error(message)
    } else if (error.request) {
      toast.error("Servidor não respondeu")
    } else {
      toast.error("Erro ao configurar requisição")
    }

    return Promise.reject(error)
  }
)

export default api;
