import React from 'react'
import '../Estilos/Boton.css'

const Boton = (props) => {
    return(
        <button type='submit' className={props.clase}> {props.texto}</button>
    )
}

export default Boton