import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import InputTexto from './InputTexto'
import Boton from "./Boton";
import '../Estilos/IniciarSesion.css'

const IniciarSesion = () =>{
    
    const navigate = useLocation()

    const paths = {
        Registrarse: navigate.pathname === '/Registrarse',
        RecuperarContra: navigate.pathname === '/RecuperarContra'
    }

    return(
        <div className="InicioSesionGeneral">
            
            <div className="Imagen">
                <img src="../Imagenes/InicioSesion.png" alt="Imagen Inicio Sesion"/>
            </div>

            <div className="CajasTexto">
                <div className="ContenedoresGenerales">

                    <div className="TitulosInicioSesion">
                        
                        <div className="TituloIniciarSesion">Inicia Sesión</div>

                        <div>
                            <NavLink to="/Registrarse" className={paths.Registrarse}> Registrarse </NavLink>
                        </div>

                    </div>
                    
                    <div className="CajasTextoInicioSesion">    
                        <p>Correo: </p>
                        <InputTexto mensaje = "Correo" />
                        <p>Contraseña: </p>
                        <InputTexto mensaje = "Contraseña" />
                    </div>

                    <div className="BotonLinkfinal">
                       
                       <Boton texto = "Iniciar Sesion" clase= "CodigoPeque"/>
                        
                        <div className="LinkContraseña">
                            <NavLink to="/RecuperarContra" className={paths.RecuperarContra}> Recuperar Contraseña </NavLink>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default IniciarSesion