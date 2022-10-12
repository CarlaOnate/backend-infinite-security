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
    <div key={`${estatusName}+${record.reserva.codigoReserva}`} className={`tag ${statusClass[estatus]}`}><p>{estatusName}</p></div>
  )
}

const renderLugar = (_, record) => {
  const { lugar } = record;

  if (!lugar) return <p>\</p>

  return (
    <p key={`${lugar.piso}+${lugar.salon}+${record.reserva.codigoReserva}`}>Piso {lugar.piso}, Salón {lugar.salon}</p>
  )
}

const renderProducto = (_, record) => {
  const { producto } = record;

  if (!producto) return <p>\</p>

  return (
    <p key={`${producto.nombre}+${record.reserva.codigoReserva}`}>{producto.nombre}</p>
  )
}

const renderCategoria = (_, record) => {
  const { producto } = record;

  if (!producto) return <p>\</p>

  return (
    <p key={`${producto.categoria}+${record.reserva.codigoReserva}`}>{producto.categoria}</p>
  )
}

const renderFecha = (_, record) => {
  const { reserva: {fechaInicio, fechaFinal }} = record;
  return (
    <p key={`${fechaInicio}${fechaFinal}+${record.reserva.codigoReserva}`}>{moment(fechaInicio).format('ll')} - {moment(fechaFinal).format('ll')}</p>
  )
}

const renderHorario = (_, record) => {
  const { reserva: {horaInicio, horaFinal }} = record;
  return (
    <p key={`${horaInicio}${horaFinal}+${record.reserva.codigoReserva}`}>{horaInicio} - {horaFinal}</p>
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
    sorter: (a, b) => moment(a.reserva.fechaInicio) <= moment(b.reserva.fechaFinal),
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