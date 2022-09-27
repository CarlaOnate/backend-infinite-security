import React, { useEffect, useState } from 'react'
import { Space, Table as AntTable, Tag } from 'antd';

export const Table = () => {
  const [ data, setData ] = useState()
  const columns = [
    {
      title: 'Código Reserva',
      dataIndex: 'codigoReserva',
      key: 'codigoReserva',
    },
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'prodcto',
    },
    {
      title: 'Luagr',
      dataIndex: 'lugar',
      key: 'lugar',
    },
    {
      title: 'Estatus',
      dataIndex: 'estatus',
      key: 'estatus',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Horario',
      dataIndex: 'horario',
      key: 'horario',
    }
  ]



  useEffect(() => {
    setData([
      {

      }
    ])
  }, [])



  return (
    <section>
      <AntTable
        columns={columns}
      />
    </section>
  )
}
