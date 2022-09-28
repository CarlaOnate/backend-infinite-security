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

export const signup = async user => {
  return await service.post('/signup', user)
}

export const darAlta = async user => {
  return await service.post('/signup/', user)
}

export const historial = async (filter) => {
  console.log('HISTORIAL FILTER =>', filter)
  const { data } = await service.post('/historial/', filter)
  return data
}

export const logout = async() => {
  return await service.get('/logout')
}