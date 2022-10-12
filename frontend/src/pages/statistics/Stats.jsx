import React from 'react'
import { AdminStats } from './AdminStats'
import { UserStats } from './UserStats'
import '../../Estilos/stats.css'

export const Stats = props => {
  const { userIsAdmin } = props;

  return (
    <>
      {userIsAdmin ? <AdminStats /> : <UserStats />}
    </>
  )
}
