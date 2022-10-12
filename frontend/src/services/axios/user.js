import axios from "axios";

const baseURL = "https://153.92.222.205:8000/api";
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

export const changePassword = async user => {
  const { data } = await service.post('/change-password', user)
  return data
}

//Para crear la reserva
export const crearReserva = async user => {
  const { data } = await service.post('/create-reserva', user)
  return data
}

export const getRecursos = async user => {
  const { data } = await service.post('/get-resource', user)
  return data
}

export const postReserva = async user => {
  await service.post('/create-reserva', user)
}

export const logout = async () => {
  return await service.get('/logout-user')
}

export const getReserva = async (reserva) => {
  const { data } = await service.post('/get-reserva', reserva)
  return data
}

export const updateReserva = async (reserva) => {
  const { data } = await service.post('/update-reserva', reserva)
  return data
}

export const deleteReserva = async (reserva) => {
  const { data } = await service.post('/delete-reserva', reserva)
  return data
}

export const getLoggedUser = async () => {
  const { data } = await service.post('/logged-user')
  return data
}