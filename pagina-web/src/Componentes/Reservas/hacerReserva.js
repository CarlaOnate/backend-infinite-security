import React, { useState } from "react";
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


  return (
    <div>

      <Radio.Group onChange={onChange} value={pantalla}>
        <Radio value={1}>Lugar</Radio>
        <Radio value={2}>Producto</Radio>
      </Radio.Group>

      {pantalla === 1 && <PantallaReserva1 enviado = {enviado}/>}
      {pantalla === 2 && <PantallaReserva2 enviado = {enviado2}/>}


      <TimePicker.RangePicker onChange={onChangeHora} />

      <RangePicker onChange={onChangeFecha} />

    </div>
  )
}

export default HacerReserva;
