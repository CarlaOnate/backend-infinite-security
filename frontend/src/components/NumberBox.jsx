import React from "react";

const NumberBox = (props) =>{
  return(
    <div className="CajaNumeros">
      <div className="Caja">
        {props.numero}
      </div>
      <div className="Texto">
        {props.texto}
      </div>
    </div>
  );
};

export default NumberBox;