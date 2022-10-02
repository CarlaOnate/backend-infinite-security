import React, { useState, useEffect } from "react";
import { Radio } from 'antd';
import PantallaReserva1 from "./PantallaReserva1";
import PantallaReserva2 from "./PantallaReserva2";
import { TimePicker } from 'antd';
import { DatePicker } from 'antd';
import { getRecursos } from "../../services/axios/user";

const { RangePicker } = DatePicker;


const HacerReserva = () => {
  const [pantalla, setPantalla] = useState(1);
  const [dataLugares, setDataLugares ] = useState();

  var enviado = {};
  var enviado2 = {};
  const [inputs, setInputs] = useState();
  const [ lugares, setLugares ] = useState({ pisosDropdown: [], salonesDropdown: [] });


  const onChange = (e) => {
    setPantalla(e.target.value);
  };

  const onChangeFecha = (date, dateString) => {
    console.log(date[0].format("YYYY-MM-DD"));
    console.log(date[1].format("YYYY-MM-DD"));

    enviado["fechaInicio"] = date[0].format("YYYY-MM-DD");
    enviado["fechaFinal"] = date[1].format("YYYY-MM-DD");

    console.log(enviado)
  }

  const onChangeHora = (date, dateString) => {
    console.log(date[0].format("HH:mm"));
    console.log(date[1].format("HH:mm"));

    enviado["horaInicio"] = date[0].format("HH:mm");
    enviado["horaFinal"] = date[1].format("HH:mm");

    console.log(enviado)
  }

  const createDropdownData = (response) => {
    const pisosDropdown = [] // Variable donde se van a guardar los pisos con key, label
    Object.keys(response).map(piso => { // Iteras los pisos, las llaves del objeto reponse
      // Por cada piso haces un push con el key y label de ese piso
      pisosDropdown.push({
        key: piso,
        label: `Piso ${piso}`
      })
    })
    // Al terminar de recorrer los pisos y guardar cada {} en pisosDropdpown
    // Actualiza el estado no usando el previo, sino usando el nuevo [] que creaste
    // y reemplazar por completo el pisosDropdown anterior por el nuevo
    // En caso de que se corra mas de una vez evitas que se dupliquen elementos ya que sobreescribes
    setLugares(prev => ({...prev, pisosDropdown}))
  }

  useEffect(() => {
    // Funcion para llamar a back tiene que estar dentro de useEffect, esto para que solo se llame esta funcion 1 vez cuando el componente se esta montando
    // Podrías tener diferentes funciones como llamarLuagres, llamarProudctos
    // O hacer funciones fuera que cada una llame el getRecurso con un filtrado diferente y todas las pones dentro de llamarLista
    const llamarLista = () => {
      console.log('LLAMR LISTA')

      const filtrado = {
        "resourceType": "Lugar",
        "byFloor": true
      }
  
      getRecursos(filtrado).then((response) => {
        // Obtienes un array con las llaves del obj response que son los pisos [1, 2, 3]
        const pisos = Object.keys(response);
        // Iteras los pisos
        pisos.map(key => {
          // Cada array que este dentro de los pisos lo ciclas
          // y el valor en esa posicion del array va a ser remplazado por el objeto que regresa despues de room =>
          // regresas solo la llave pk y que te ponga ahi todas las llaves que estan dentro de room.fields
          const formattedRoom = response[key].map(room => ({
            pk: room.pk,
            ...room.fields
          }))
          // Sobreescribes el response para que en ese piso lo valores esten como los acomodaste
          response[key] = formattedRoom
        })
        // llamas funcion para crear [{}] de key value para cada piso (en este caso)
        createDropdownData(response)
        // Guardas el response porque maybe luego lo necesitas
        // SINO LO NECESITAS TONS QUITA ESTO Y QUITA ESTE ESTADO
        setDataLugares(response)
      }).catch((error) => {
        console.log(error);
      })
    }

    llamarLista()
  },[])

  console.log('lugares =>', lugares)
  const items = []
  return (
    <div>

      <Radio.Group onChange={onChange} value={pantalla}>
        <Radio value={1}>Lugar</Radio>
        <Radio value={2}>Producto</Radio>
      </Radio.Group>

      {pantalla === 1 && <PantallaReserva1 enviado = {enviado} items = {items}/>}
      {pantalla === 2 && <PantallaReserva2 enviado = {enviado2}/>}


      <TimePicker.RangePicker onChange={onChangeHora} />

      <RangePicker onChange={onChangeFecha} />

    </div>
  )
}

export default HacerReserva;
