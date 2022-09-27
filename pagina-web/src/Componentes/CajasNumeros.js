import React from "react";
import '../Estilos/CajaNumeros.css'
const Cajanumeros = (props) =>{
    return(
        <div className="CajaNumeros">
            <div className="Caja">
                {props.numero}
            </div>
            
            <div className="Texto">
                {props.texto}
            </div>
        </div>
    )
}

export default Cajanumeros