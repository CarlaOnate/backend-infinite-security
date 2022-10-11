import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from '../components/Button';
import Input from '../components/InputTexto'
import '../Estilos/RegistroCodigo.css'

const RegistrarseCodigo = () =>{

    const navigate = useLocation()

    const paths = {
        home: navigate.pathname === '/',
        IniciarSesion: navigate.pathname === '/login'
    };

    return(

        <div className="GeneralRegistroCodigo">
            
            <div className="ImagenRegistroCodigo">
                <img src="../Imagenes/InicioSesion.png" alt = "Imagen"/>
            </div>

            <div className="SeccionTextoRegistroCodigo">

                <div className="TitulosRegistroCodigo">
                    
                    <div className="TituloRegistroCodigo">
                        Registrarse
                    </div>

                    <div className="Link1RegistroCodigo">
                        <NavLink to="/login" className={paths.IniciarSesion}>Iniciar Sesion</NavLink>
                    </div>

                </div>

                <br></br>
                <p>Ingresa el código que se envió a tu correo: </p>
                
                <div className="IngresoTextoRegistroCodigo">
                    
                    
                    <Input mensaje = "Ingresa el código"/>
                    <Button texto = "Reenviar Codigo" clase = "Codigoverde"/>

                </div>

                <div className="BotonRegistrarfinalcodigo">

                    <button className="CodigoMediano">
                        <NavLink to="/" className={paths.home}>Registrarme</NavLink> 
                    </button>
                    
                </div>
            </div>
            {/* <NavLink to="/" className={paths.home}>Registrarme</NavLink> */}
            
        </div>
    )
}

export default RegistrarseCodigo