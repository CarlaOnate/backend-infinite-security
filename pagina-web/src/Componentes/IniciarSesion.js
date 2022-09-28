import React , {useContext, useState} from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import InputTexto from './InputTexto'
import Boton from "./Boton";
import '../Estilos/IniciarSesion.css'
import {login} from '../services/axios/user.js'
import {UserContext} from '../context/userContext'

const IniciarSesion = () =>{

    const [inputs, setInputs] = useState();
    const {user, setUser} = useContext(UserContext);
    const navigates = useNavigate()

    const handelInputs = (e, tipo) => {
        const {target} = e
        //console.log(target.value)
        setInputs(prep => ({
            ...prep,
            [tipo]:target.value
        }))
    }

    const onClickLogin = () =>{
        const loginbody = {
            "email":inputs[1],
            "password":inputs[2]
        }

        login(loginbody).then(data => {
            setUser(prev =>({
                ...prev,
                user:data
            }))
            navigates('/');
        }).catch()
    }

    //console.log(inputs)
    //console.log(user)

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
                        <InputTexto onChange = {(e) => handelInputs(e,1)} mensaje = "Correo" />
                        <p>Contraseña: </p>
                        <InputTexto onChange = {(e) => handelInputs(e,2)} mensaje = "Contraseña" />
                    </div>

                    <div className="BotonLinkfinal">
                       
                       <Boton onClick = {onClickLogin} texto = "Iniciar Sesion" clase= "CodigoPeque"/>
                        
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