import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

export const ComponentWithContext = () => {
  const {user, setUser} = useContext(UserContext)
  const [ nameInput, setNameInput ] = useState("")

  console.log(user) // If user is none the user is not logged in

  const updateUserCtx = () => {
    setUser({name: nameInput})
  }

  const handleNameOnChange = e => {
    const { target } = e;
    setNameInput(target.value)
  }

  return (
    <>
      <div>SOY COMPONENTE QUE ACCESA EL CONTEXT</div>
      <p>El contexto actual es:</p>
      <ul>
        <li>User: {user && user.name}</li>
      </ul>
      <p>Para cambiar datos de context se usa usercxt.setUser</p>
      <label>Ponle un nombre a este user:</label>
      <input type="text" onChange={handleNameOnChange}/>
      <button onClick={updateUserCtx}>Cambiar nombre de user</button>
    </>
  )
}
