import { parse } from 'json2csv';

export const formatDownloadData = (data, setError) => {
  const columns = [
    'ID', 'Codigo reserva', 'Usuario id', 'Usuario',
    'Usuario rol', 'Producto id', 'Producto nombre',
    'Producto categoria', 'Lugar id', 'Lugar piso',
    'Lugar salon', 'Estatus', 'Fecha Inicial',
    'Fecha Final', 'Hora Inicial', 'Hora Final']

  const field = el => ({
    ID: el.reserva.id,
    'Codigo reserva': el.reserva.codigoReserva,
    'Usuario id': el.usuario.id,
    'Usuario': el.usuario.nombre,
    'Usuario rol': el.usuario.rol,
    'Producto id': el.producto ? el.producto.id : 'NO DATA',
    'Producto nombre': el.producto ? el.producto.nombre : 'NO DATA',
    'Producto categoria': el.producto ? el.producto.categoria : 'NO DATA',
    'Lugar id': el.lugar ? el.lugar.id : 'NO DATA',
    'Lugar piso': el.lugar ? el.lugar.piso : 'NO DATA',
    'Lugar salon': el.lugar ? el.lugar.salon : 'NO DATA',
    Estatus: el.reserva.estatusName,
    'Fecha Inicial': el.reserva.fechaInicio,
    'Fecha Final': el.reserva.fechaFinal,
    'Hora Inicial': el.reserva.horaInicio,
    'Hora Final': el.reserva.horaFinal,
  })

  const formattedFields = data.map(el => {
    return field(el)
  })

  try {
    const csv = parse(formattedFields, columns)
    const file = new Blob([csv], {type: '.csv'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'historial-reservas.csv');
    else { // Others
        const a = document.createElement("a"),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'historial-reservas.csv';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
    }
  } catch  (err) {
    setError(true)
  }


  return formattedFields;
}