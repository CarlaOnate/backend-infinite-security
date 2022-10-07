import moment from 'moment';

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

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: ['reserva', 'id'],
    key: 'idReserva',
    sorter: (a, b) => a.reserva.id < b.reserva.id,
    sortDirections: ['descend'],
  },
  {
    title: 'Código Reserva',
    dataIndex: ['reserva', 'codigoReserva'],
    key: 'codigoReserva',
    sorter: (a, b) => a.reserva.codigoReserva < b.reserva.codigoReserva,
    sortDirections: ['descend'],
  },
  {
    title: 'Nombre',
    dataIndex: ['usuario', 'nombre'],
    key: 'nombreUsuario',
    sorter: (a, b) =>  a.usuario.nombre < b.usuario.nombre,
    sortDirections: ['descend'],
  },
  {
    title: 'Producto',
    render: renderProducto,
    key: 'prodcto',
    sorter: (a, b) => (a.producto && b.producto) && a.producto.nombre < b.producto.nombre,
    sortDirections: ['descend'],
  },
  {
    title: 'Categoría',
    render: renderCategoria,
    key: 'categoria',
    sorter: (a, b) => (a.producto && b.producto) && a.producto.categoria < b.producto.categoria,
    sortDirections: ['descend'],
  },
  {
    title: 'Lugar',
    render: renderLugar,
    key: 'lugar',
    sortDirections: ['descend'],
  },
  {
    title: 'Estatus',
    dataIndex: 'reserva.estatus',
    key: 'estatus',
    render: renderEstatus,
    sorter: (a, b) => a.reserva.estatus < b.reserva.estatus,
    sortDirections: ['descend'],
  },
  {
    title: 'Fecha',
    key: 'fecha',
    render: renderFecha,
    sorter: (a, b) => moment(a.reserva.fechaInicio) < moment(b.reserva.fechaInicio),
    sortDirections: ['descend'],
  },
  {
    title: 'Horario',
    key: 'horario',
    render: renderHorario,
    sorter: (a, b) => moment(a.reserva.horaInicio) < moment(b.reserva.horaFinal),
    sortDirections: ['descend'],
  },
]