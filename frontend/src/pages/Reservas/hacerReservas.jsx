import React, { useState, useEffect } from "react";
import { Radio } from 'antd';
import PantallaReserva1 from "./PantallaReserva1";
import MenuInterno from "./menuInterno";
import { TimePicker } from 'antd';
import { DatePicker } from 'antd';
import { getRecursos, crearReserva } from "../../services/axios/user";
import { useLocation, useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;


const HacerReserva = () => {
  const [pantalla, setPantalla] = useState(1);
  const [dataLugares, setDataLugares ] = useState();
  const navigates = useNavigate()
  var enviado = {};
  var enviado2 = {};
  const [inputs, setInputs] = useState(); // TODO: No se esta usando
  const [ lugares, setLugares ] = useState({ pisosDropdown: [], salonesDropdown: [] });
  const [aviso, setAviso] = useState(0)

  const onChange = (e) => {
    setPantalla(e.target.value);
  };

  const onChangeFecha = (date, dateString) => {
    enviado["FechaInicio"] = date[0].format("YYYY-MM-DD");
    enviado["fechaFinal"] = date[1].format("YYYY-MM-DD");
  }

  const onChangeHora = (date, dateString) => {
    enviado["horaI"] = date[0].format("HH:mm");
    enviado["horaF"] = date[1].format("HH:mm");
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
        const pisos = Object.keys(response);
        pisos.map(key => {
          const formattedRoom = response[key].map(room => ({
            pk: room.pk,
            ...room.fields
          }))
          response[key] = formattedRoom
        })
        createDropdownData(response)
        setDataLugares(response)
      }).catch((error) => {
        console.log(error);
      })
    }

    llamarLista()
  },[])

  const items = lugares.pisosDropdown

  const subirDatos = () => {
    if((enviado['Piso'] !==undefined && enviado['Salon'] !==undefined) || (enviado['Productos'] !==undefined && enviado['Categoria'] !==undefined && (enviado['Cantidad'] !== undefined || enviado['Cantidad'] !== 0))){
      
      crearReserva(enviado)
        .then(data => {
          console.log(data)
          //navigates('/')
        })
        .catch()
    
    }else{
      setAviso(1);
    }
  }

  const subirDatos2 = () => {
    if((enviado['Productos'] !==undefined && enviado['Categoria'] !==undefined && (enviado['Cantidad'] !== undefined || enviado['Cantidad'] !== 0))){
      
      crearReserva(enviado).then(navigates('/')).catch()
    
    }else{
      setAviso(1);
    }
  }


  return (

    <div className="SeccionGeneralHacerReservas">

      <div className="HacerReservaCentral">
            
        <h1 className="tituloHacerReserva">¿Qué quieres reservar?</h1>
      
        <Radio.Group onChange={onChange} value={pantalla} >
          <Radio value={1}>Lugar</Radio>
          <Radio value={2}>Producto</Radio>
        </Radio.Group>

        {pantalla === 1 && <PantallaReserva1 enviado = {enviado} items = {items}/>}
        {pantalla === 2 && <MenuInterno enviado = {enviado2}/>}
            
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
        
      </div>
      

      {aviso === 1 && <p className="AdvertenciaHacer Reserva">La reserva no se realizara ya que faltan campos por llenar</p>}

    </div>
  )
}

export default HacerReserva;