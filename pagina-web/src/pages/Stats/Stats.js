import React, { useContext } from 'react'
import { AdminStats } from './AdminStats'
import { UserStats } from './UserStats'
import { UserContext } from '../../context/userContext'
import '../../Estilos/stats.css'

export const Stats = () => {
  const user = useContext(UserContext);
  const userIsAdmin = user.user.rol != null;

  return (
    <>
      {userIsAdmin ? <AdminStats /> : <UserStats />}
    </>
  )
}
