import React, { useState, useEffect } from 'react'
import { userHistorial } from '../../services/axios/user'
import { Button, Alert, Table } from 'antd';
import moment from 'moment'

export const OneUserReservation = props => {
  const { user, onClickReturn } = props;
  const [ error, setError ] = useState(false)
  const [ data, setData ] = useState()

  const fetchData = filter => {
    userHistorial(filter).then(data => {
      setData(data.values)
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchData({ id: user.pk })
    }
    fetch()
  }, [user.pk])

  const renderEstatus = (_, record) => {
    const { reserva: { estatus, estatusName } } = record;
    const statusClass = {
      1: 'por-iniciar',
      2: 'en-proceso',
      3: 'finalizado',
      4: 'cancelado',
    }
    return (
      <>
        <div className={`tag ${statusClass[estatus]}`}><p>{estatusName}</p></div>
      </>
    )
  }
  
  const renderLugar = (_, record) => {
    const { lugar } = record;
  
    if (!lugar) return <p>\</p>
  
    return (
      <p>Piso {lugar.piso}, Salón {lugar.salon}</p>
    )
  }
  
  const renderProducto = (_, record) => {
    const { producto } = record;
  
    if (!producto) return <p>\</p>
  
    return (
      <p>{producto.nombre}</p>
    )
  }
  
  const renderCategoria = (_, record) => {
    const { producto } = record;
  
    if (!producto) return <p>\</p>
  
    return (
      <p>{producto.categoria}</p>
    )
  }
  
  const renderFecha = (_, record) => {
    const { reserva: {fechaInicio, fechafinal }} = record;
    return (
      <p>{moment(fechaInicio).format('ll')} - {moment(fechafinal).format('ll')}</p>
    )
  }
  
  const renderHorario = (_, record) => {
    const { reserva: {horaInicio, horaFinal }} = record;
    return (
      <p>{horaInicio} - {horaFinal}</p>
    )
  }

  const tableColumns = [
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
      render: renderProducto,
      key: 'prodcto',
      sorter: (a, b) => a.producto.nombre < b.producto.nombre
    },
    {
      title: 'Categoría',
      render: renderCategoria,
      key: 'categoria',
      sorter: (a, b) => a.producto.categoria < b.producto.categoria
    },
    {
      title: 'Lugar',
      render: renderLugar,
      key: 'lugar',
      sorter: (a, b) => a.piso < b.piso
    },
    {
      title: 'Estatus',
      dataIndex: 'reserva.estatus',
      key: 'estatus',
      render: renderEstatus,
      sorter: (a, b) => a.reserva.estatus < b.reserva.estatus
    },
    {
      title: 'Fecha',
      key: 'fecha',
      render: renderFecha,
      sorter: (a, b) => moment(a.reserva.fechaInicio) < moment(b.reserva.fechaInicio)
    },
    {
      title: 'Horario',
      key: 'horario',
      render: renderHorario,
      sorter: (a, b) => moment(a.reserva.horaInicio) < moment(b.reserva.horaFinal)
    },
  ]

  return (
    <section>
      {error &&
        <Alert
          message="Error"
          description="Hubo un error, inténtalo mas tarde"
          type="error"
          showIcon
          afterClose={setError(false)}
          closable
        />}
      <Table
        columns={tableColumns}
        dataSource={data}
      />
      <Button onClick={onClickReturn}> Volver </Button>
    </section>
  )
}
