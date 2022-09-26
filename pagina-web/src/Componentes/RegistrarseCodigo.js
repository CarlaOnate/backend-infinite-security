import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Boton from './Boton'

const RegistrarseCodigo = () =>{

    const navigate = useLocation()

    const paths = {
        home: navigate.pathname === '/',
        IniciarSesion: navigate.pathname === '/IniciarSesion'
    };

    return(

        <div className="GeneralRegistroCodigo">

            <div>
                <div className="ImagenRegistro">
                    <img src="../Imagenes/InicioSesion.png" alt="Imagen RegistroCodigo"/>
                </div>
            </div>

            <div className="TitulosInicioSesion">       
                <div className="TituloIniciarSesion">Registrarse
                </div>
                <div>
                    <NavLink to="/IniciarSesion" className={paths.IniciarSesion}> Iniciar Sesion </NavLink>
                </div>

                <div><Boton texto = "Reenviar Codigo" clase ='Codigoverde'/></div>
                
            </div>

        </div>
    )
}

export default RegistrarseCodigo