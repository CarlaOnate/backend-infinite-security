import React, { useState, useEffect } from "react";
import { Radio } from 'antd';
import PantallaReserva1 from "./PantallaReserva1";
import MenuInterno from "./menuInterno";
import { TimePicker, Alert } from 'antd';
import { DatePicker } from 'antd';
import { getRecursos, crearReserva } from "../../services/axios/user";

const { RangePicker } = DatePicker;


const HacerReserva = props => {
  const { changeMenuOption } = props;
  const [pantalla, setPantalla] = useState(1);
  const [ enviado, setEnviado ]  = useState({});
  const [ lugares, setLugares ] = useState({ pisosDropdown: [], salonesDropdown: [] });
  const [aviso, setAviso] = useState()

  const onChange = (e) => {
    setPantalla(e.target.value);
  };

  const onChangeFecha = (date) => {
    setEnviado(prev => ({
      ...prev,
      FechaInicio: date && date[0].format("YYYY-MM-DD"),
      fechaFinal: date && date[1].format("YYYY-MM-DD")
    }))
  }

  const onChangeHora = (date) => {
    setEnviado(prev => ({
      ...prev,
      horaI: date && date[0].format("HH:mm"),
      horaF: date && date[1].format("HH:mm")
    }))
  }

  const createDropdownData = (response) => {
    const pisosDropdown = []
    Object.keys(response).map(piso => {
      pisosDropdown.push({
        key: piso,
        label: `Piso ${piso}`
      })
    })
    setLugares(prev => ({...prev, pisosDropdown}))
  }

  useEffect(() => {
    const llamarLista = () => {
      const filtrado = {
        "resourceType": "Lugar",
        "byFloor": true
      }
      getRecursos(filtrado).then((response) => {
        createDropdownData(response.value)
      }).catch((error) => {
        console.error(error);
      })
    }
    llamarLista()
  },[])

  const resetAviso = () => {
    setAviso(null)
  }

  const mostrarAlerta = () => (
    <>
      {aviso === 1 &&
        <Alert
          message="Error"
          description="No se realizó la reserva ya que falta un dato"
          type="error"
          showIcon
          afterClose={resetAviso}
          closable
      />}
      {aviso === 2 &&
        <Alert
          description="Ese lugar no esta disponible en esas fechas"
          type="warning"
          showIcon
          afterClose={resetAviso}
          closable
      />}
      {aviso === 3 &&
        <Alert
          message="La reserva se aplicó con éxito"
          type="success"
          showIcon
          afterClose={resetAviso}
          closable
        />}
    </>
  )

  const subirDatos = () => {
    if((enviado['Piso'] !==undefined && enviado['Salon'] !==undefined) || (enviado['Productos'] !==undefined && enviado['Categoria'] !==undefined && (enviado['Cantidad'] !== undefined || enviado['Cantidad'] !== 0))){
      crearReserva(enviado)
        .then(data => {
          if (data.warning) return setAviso(2)
          if (data.Recurso) return changeMenuOption('reservations-list')
        })
        .catch(() => setAviso(1))
    } else {
      setAviso(3);
    }
  }

  const subirDatos2 = () => {
    if((enviado['Productos'] !==undefined && enviado['Categoria'] !==undefined && (enviado['Cantidad'] !== undefined || enviado['Cantidad'] !== 0))){
      crearReserva(enviado)
        .then(data => {
          if (data.warning) return setAviso(2)
          if (data.Recurso) return changeMenuOption('reservations-list')
        })
        .catch(() => setAviso(1))
    } else {
      setAviso(3);
    }
  }

  const items = lugares.pisosDropdown

  return (
    <div className="SeccionGeneralHacerReservas">
      <div className="HacerReservaCentral">
        <h1 className="tituloHacerReserva">¿Qué quieres reservar?</h1>
        <Radio.Group onChange={onChange} value={pantalla} >
          <Radio value={1}>Lugar</Radio>
          <Radio value={2}>Producto</Radio>
        </Radio.Group>
        {pantalla === 1 && <PantallaReserva1 enviado={setEnviado} enviadoObj={enviado} items = {items}/>}
        {pantalla === 2 && <MenuInterno enviado={setEnviado} enviadoObj={enviado}/>}
      </div>
      <div className="HacerReservaDerecha">
        <h1 className="tituloHacerReserva">¿Cuando es la reserva?</h1>
        <RangePicker onChange={onChangeFecha} />
        <h1 className="tituloHacerReserva">¿A que hora es la reserva?</h1>
        <TimePicker.RangePicker onChange={onChangeHora} />
        <div className="BotonHacerReservaDerecha">
          {pantalla === 1 &&
            <button className= "CodigoPeque" onClick={subirDatos}>
              Reservar
            </button>
          }
          {pantalla === 2 &&
            <button className= "CodigoPeque" onClick={subirDatos2}>
              Reservar productos
            </button>
          }
        </div>
        {aviso && mostrarAlerta()}
      </div>
    </div>
  )
}

export default HacerReserva;