import axios from "axios";

const baseURL = "http://localhost:8000/api"; // url de la api de back
const service = axios.create({ baseURL, headers: {
  'Content-Type': 'application/json',
},
withCredentials: true })

// Add here user api endpoints
export const login = async user => {
  const { data } = await service.post('/login-user', user)
  return data
}


export const crearUsuario = async user => {
  const { data } = await service.post('/create-user', user)
  return data
}

export const sendEmail = async user => {
  const { data } = await service.post('/email', user)
  return data
}

export const verificar = async user => {
  const { data } = await service.post('/verify-code', user)
  return data
}

export const verificarUsuario = async user => {
  const { data } = await service.post('/verify-user', user)
  return data
}

//Para crear la reserva
export const crearReserva = async user => {
  const { data } = await service.post('/create-reserva', user)
  return data
}

//Para crear llamar a los recursos y toda la info
export const getRecursos = async user => {
  const { data } = await service.post('/get-resource', user)
  return data
}

export const historial = async (filter) => {
  console.log('HISTORIAL FILTER =>', filter)
  const { data } = await service.post('/historial/', filter)
  return data
}

export const logout = async() => {
  return await service.get('/logout')
}