import React, { useEffect, useState } from 'react'
import { Space, Table as AntTable, Tag } from 'antd'
import { login, historial } from '../services/axios/user'
import moment from 'moment'

export const Table = () => {
  // TODO: Optionat - poner pagination
  const [ data, setData ] = useState()
  const columns = [
    {
      title: 'Código Reserva',
      dataIndex: ['reserva', 'codigoReserva'],
      key: 'codigoReserva',
      sorter: (a, b) => a.reserva.codigoReserva < b.reserva.codigoReserva,
    },
    {
      title: 'Nombre',
      dataIndex: ['usuario', 'nombre'],
      key: 'nombreUsuario',
      sorter: (a, b) => a.usuario.nombre < b.usuario.nombre
    },
    {
      title: 'Producto',
      dataIndex: ['producto', 'nombre'],
      key: 'prodcto',
      width: 100,
      sorter: (a, b) => a.producto.nombre < b.producto.nombre
    },
    {
      title: 'Lugar',
      render: (_, record) => {
        const { lugar } = record;
        const renderLugar = () => (<p>Piso {lugar.piso}, Salón {lugar.salon}</p>)
        return (
        <>{lugar ? renderLugar() : '/'}</>
      )},
      key: 'lugar',
      sorter: (a, b) => a.piso < b.piso
    },
    {
      title: 'Estatus',
      dataIndex: 'reserva.estatus',
      key: 'estatus',
      render: (_, record) => {
        const { reserva: { estatus, estatusName } } = record;
        const renderEstatus = () => (<p>{estatusName}</p>)
        return (
        <>{renderEstatus()}</>
      )},
      sorter: (a, b) => a.reserva.estatus < b.reserva.estatus
    },
    {
      title: 'Fecha',
      key: 'fecha',
      render: (_, record) => {
        const { reserva: {fechaInicio, fechafinal }} = record;
        return (
        <Space size="middle">
          {moment(fechaInicio).format('ll')} - {moment(fechafinal).format('ll')}
        </Space>)
      },
      sorter: (a, b) => moment(a.reserva.fechaInicio) < moment(b.reserva.fechaInicio)
    },
    {
      title: 'Horario',
      key: 'horario',
      render: (_, record) => {
        const { reserva: {horaInicio, horaFinal }} = record;
        return (
        <Space size="middle">
          {horaInicio} - {horaFinal}
        </Space>
      )},
      sorter: (a, b) => moment(a.reserva.horaInicio) < moment(b.reserva.horaFinal)
    },
  ]

  const doLogin = () => {
    login().then(e => console.log('data login =>', e)).catch(e => console.log(e))
  }

  const fetchData = () => {
    historial().then(data => {
      setData(data.values)
      console.log(data)
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchData()
    }
    fetch()
  }, [])

  const renderFooter = () => {
    return (
      <p>Total registros: {data && data.length}</p>
    )
  }

  return (
    <section>
      <AntTable
        size="small"
        columns={columns}
        dataSource={data}
        footer={renderFooter}
        scroll={{ x: '100%', y: '100%' }}
        pagination={{
          position: ['bottomCenter'],
        }}
      />
    </section>
  )
}
