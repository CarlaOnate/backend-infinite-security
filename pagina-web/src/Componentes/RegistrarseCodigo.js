import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Boton from './Boton'
import Input from './InputTexto'
import '../Estilos/RegistroCodigo.css'

const RegistrarseCodigo = () =>{

    const navigate = useLocation()

    const paths = {
        home: navigate.pathname === '/',
        IniciarSesion: navigate.pathname === '/IniciarSesion'
    };

    return(

        <div className="GeneralRegistroCodigo">
            
            {/* <NavLink to="/" className={paths.home}>Registrarme</NavLink> */}
            
        </div>
    )
}

export default RegistrarseCodigo