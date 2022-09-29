import React from 'react'

export const AdminStats = () => {
  return (
    <section className='stats-container'>
      <div className='stats-top'>
        <h1>Estadistica</h1>
        <button>D</button>
      </div>
      <div className='stats-options'>
        <button>Reserva</button>
        <button>Lugares</button>
        <button>Producto</button>
      </div>
      <div className='stats-graphs'>
        <div>Estadistica 1</div>
        <div>Estadistica 2</div>
      </div>
    </section>
  )
}
