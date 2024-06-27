import { io } from 'socket.io-client'
import { API_URL } from '../.env/config'

// Crie o objeto socket e conecte-se à URL da API
const socket = io(API_URL, {
  transports: ['websocket', 'polling'],
})

// Adicione logs para depuração
socket.on('connect', () => {
  console.log('Conectado ao servidor')
})

socket.on('disconnect', () => {
  console.log('Desconectado do servidor')
})

socket.on('error', (error) => {
  console.error('Erro no socket:', error)
})

export default socket
