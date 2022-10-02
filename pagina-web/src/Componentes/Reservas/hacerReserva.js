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
  var enviado = {};
  var enviado2 = {};
  const [inputs, setInputs] = useState();


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

  let items = []
    

  const llamarLista = () =>{
    
    const filtrado = {
      "resourceType": "Lugar",
      "byFloor": true
    }

    getRecursos(filtrado).then((response) =>{
      //console.log(response)
      
      for (let i in response){

        if(response[i].length > 0){

          console.log(response[i])
          //console.log(response[i].length)

          for(let j in response[i]){

            var items2 = {}
            console.log(items2)

            items2 = {key: response[i][j].pk, label: response[i][j].fields.salon}

            console.log(j)
            console.log("Aqui")

            items.push(items2)

            console.log(items)
            console.log(items2)

        }
      }
    }
      //console.log(items)
      return items
    }).catch((error) => {
      console.log(error);
    })

  }
  useEffect(()=>{
    llamarLista()
  },items = []) //Aqui en lugar de items es []


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
