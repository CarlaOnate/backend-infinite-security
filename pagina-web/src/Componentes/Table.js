import React, { useEffect, useState } from 'react'
import { Space, Table as AntTable, Tag } from 'antd'
import { login, historial } from '../services/axios/user'

export const Table = () => {
  const [ data, setData ] = useState()
  const columns = [
    {
      title: 'Código Reserva',
      dataIndex: 'reserva.fields.codigoReserva',
      key: 'codigoReserva',
    },
    {
      title: 'Producto',
      dataIndex: 'producto.fields.nombre',
      key: 'prodcto',
    },
    {
      title: 'Lugar',
      dataIndex: 'lugar.fields.piso',
      key: 'lugar',
    },
    {
      title: 'Estatus',
      dataIndex: 'reserva.fields.estatus',
      key: 'estatus',
    },
    {
      title: 'Fecha',
      dataIndex: 'reserva.fields.fechaInicio',
      key: 'fecha',
    },
    {
      title: 'Horario',
      dataIndex: 'horario',
      key: 'horario',
    }
  ]

  const doLogin = () => {
    login().then(e => console.log('data login =>', e)).catch(e => console.log(e))
  }

  const fetchData = () => {
    historial().then(data => {
      console.log(data)
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    const fetch = async () => {
      await doLogin()
      //await fetchData()
    }
    fetch()
  }, [])

  return (
    <section>
      <AntTable
        columns={columns}
      />
      <button onClick={fetchData}>FETCH</button>
    </section>
  )
}
