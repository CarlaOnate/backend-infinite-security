import React from "react";
import '../Estilos/CajaImagen.css'

const CajaImagen = (props) =>{
    return(
        <div className="CajaImagenContenedor">
            <img className="ImagenCajaImagen" src = {props.ruta} alt = "Imagen tec"/>

            <p className="TextoImagenCaja">{props.txt}</p>
        </div>
    )
}

export default CajaImagen