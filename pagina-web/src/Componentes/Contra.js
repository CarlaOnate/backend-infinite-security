import React from 'react';
import '../Estilos/header.css'
import '../Estilos/footer.css'
import '../Estilos/imagenes.css'
import '../Estilos/Contra.css'
import Cajatexto from './InputTexto'
import Boton from './Boton'


const Contra = (props) => {
    return(
        <div>
            <section className='header'>.</section>
            <div className='Contenedorpartido'>
                <img src= {props.imagen} className='Imagen'/>
                <div className='Secciontexto'>

                <p className='ParrafoBoton'>Ingrese su correo:</p>

                <Cajatexto mensaje = {props.mensaje}/>
                
                <Boton texto = "Obtener código" clase="Codigo"/>

                </div>

            </div>
            <footer className='footer'>.</footer>
        </div>
    )
}

export default Contra;