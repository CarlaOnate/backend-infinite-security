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
}

export default RickAndMorty

// O puede ser
/*
export const FuncionNombre = () => {}
*/