import { useEffect, useState } from 'react'
import { getCharacters } from '../../../axios/rickandmorty' // Absolute import

const RickAndMorty = () => {
  const [ apiResponse, setApiResponse ] = useState()
  const [ apiResponse2, setApiResponse2 ] = useState()

  const callAPI = async () => {
    return await getCharacters();
  }

  // Manera 1
  useEffect(() => { // Lifecycle of component
    callAPI().then(data => setApiResponse(data)) // Promesa -> proceso asincrono
  }, [])

  // Manera 2
  useEffect(() => {
    const fetchData = async () => {
      const data = await callAPI();
      setApiResponse2(data)
    }
    fetchData()
  }, [])

  console.log('api 1', apiResponse)
  console.log('api 2', apiResponse2)

  const arra = [1, 3, 5, 7, "a", {}]
  arra.forEach((el, ind) => {
    return 2
  })
  const newvoArra = arra.map((el, ind) => 2)

  return (
    <div>
      {apiResponse && (apiResponse.data.results.map(el => (
        <div>
          <img alt="imagen" src={el.image} />
          <p>{el.location.name}</p>
          <p>{el.name}</p>
        </div>
      )))}
    </div>
  )
}

export default RickAndMorty

// O puede ser
/*
export const FuncionNombre = () => {}
*/