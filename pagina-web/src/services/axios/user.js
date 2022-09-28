import axios from "axios";

const baseURL = "http://localhost:8000/api"; // url de la api de back
const service = axios.create({ baseURL, headers: {
  'Content-Type': 'application/json',
},
withCredentials: true })

// Add here user api endpoints
export const login = async user => {
  const fixedData = { email: "1234", password: "1234" }
  return await service.post('/login-user', fixedData)
}

export const signup = async user => {
  return await service.post('/signup', user)
}

export const historial = async () => {
  const { data } = await service.post('/historial/')
  return data
}

export const logout = async() => {
  return await service.get('/logout')
}