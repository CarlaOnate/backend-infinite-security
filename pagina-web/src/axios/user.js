import axios from "axios";

const baseURL = "localhost:4000"; // url de la api de back
const service = axios.create({ baseURL, withCredentials: true })

// Add here user api endpoints
export const signup = async user => {
  return await service.post('/signup', user)
}

export const logout = async() => {
  return await service.get('/logout')
}
