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

export const historial = async (filter) => {
  const { data } = await service.post('/historial/', filter)
  return data
}

export const getAdminStats = async (filter) => {
  const { data } = await service.post('/estadistica-general', filter)
  return data
}

export const getUsers = async (user) => {
  const { data } = await service.get('/users', user)
  return data
}

export const getUser = async (user) => {
  const { data } = await service.post('/getuseritself-user', user)
  return data
}

export const editUser = async (userData) => {
  const { data } = await service.post('/edit-user', userData)
  return data
}

export const deleteUser = async (userId) => {
  const { data } = await service.post('/delete-user', userId)
  return data
}

export const userStats = async (userId) => {
  const { data } = await service.post('/estadistica-user', userId)
  return data
}

export const userHistorial = async (userId) => {
  const { data } = await service.post('/user/historial/', userId)
  return data
}

export const logout = async() => {
  return await service.get('/logout')
}