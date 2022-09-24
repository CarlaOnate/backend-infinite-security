import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";

const CajaImagen = (props) =>{
    return(
        <div>
            <img src = {props.ruta} alt = "Imagen tec"/>

            <p>{props.txt}</p>
        </div>
    )
}

export default CajaImagen