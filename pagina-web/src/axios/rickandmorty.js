import axios from "axios";

const baseURL = "https://rickandmortyapi.com/api"; // url de la api de back
const service = axios.create({ baseURL })

// Add here rick and morty api endpoints
export const getCharacters = async () => {
  return await service.get('/character')
}


// const soyPromesa = promesa().then(data => "gaurdo datos").catch(e => console.log(e))

