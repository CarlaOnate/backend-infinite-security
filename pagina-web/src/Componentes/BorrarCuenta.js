import React from "react";
import Boton from './Boton.js'
import '../Estilos/Boton.css'

const Borrarcuenta = () =>{
    return(
        <div>
           <section className='header'>.</section>
            
            <h1> Borrar una cuenta </h1>

            <h2> ¿Estás seguro de eliminar esta cuenta? </h2>

            <div className="Botones">
                <Boton texto = "Si" clase = 'Codigoespecial'/>
                <Boton texto = "No" clase = 'Codigo'/>
            </div>

           <footer className='footer'>.</footer>
        </div>
    )
}


export default Borrarcuenta;