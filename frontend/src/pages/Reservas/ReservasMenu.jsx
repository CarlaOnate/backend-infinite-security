import { Button } from 'antd'
import React, { useState } from 'react'
import HacerReserva from './hacerReservas'
import { ReservationList } from './ReservationList'

export const ReservasMenu = props => {
  const [ menuOption, setMenuOption ] = useState()


  const onClickMenuOption = (option) => setMenuOption(option)

  return (
    <section>
      <div className="HacerReservaIzquierda">
        <Button className="CodigoPeque" onClick={() => onClickMenuOption('create-reservation')} >Crear Reservas</Button>
        <Button className="CodigoPeque" onClick={() => onClickMenuOption('reservation-list')} >Mis Reservas</Button>
        <Button className="CodigoPeque" onClick={() => onClickMenuOption('reservation-management')} >Manejo de Reservas</Button>
      </div>
      <div>
        {menuOption === 'create-reservation' && <HacerReserva />}
        {menuOption === 'reservations-list' && <ReservationList />}
        {menuOption === 'reservation-management' && <ReservationList />}
      </div>
    </section>
  )
}
