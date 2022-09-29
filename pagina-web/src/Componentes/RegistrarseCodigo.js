import React, {useState} from "react";
import { NavLink} from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Boton from './Boton'
import Input from './InputTexto'
import '../Estilos/RegistroCodigo.css'
import {verificar, verificarUsuario, login} from '../services/axios/user'

const RegistrarseCodigo = (props) =>{

    const navigate = useLocation()
    const navigates = useNavigate()
    const [inputs, setInputs] = useState();

    const paths = {
        home: navigate.pathname === '/',
        IniciarSesion: navigate.pathname === '/IniciarSesion'
    };

    const handelInputs = (e, tipo) => {
        const {target} = e
        setInputs(prep => ({
            ...prep,
            [tipo]:target.value
        }))
    }

    const handleStep1 = async () =>{
        const user = await verificar({
          "email": navigate.state.inputs.email,
          "code": inputs.name
        })
        if(user.msg === "Codigo correcto"){
          const userLoggedIn = await login(navigate.state.inputs)
          if(userLoggedIn.user) {
            await verificarUsuario()
            navigates('/');
          }
        }
    }

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
                        <NavLink to="/IniciarSesion" className={paths.IniciarSesion}>Iniciar Sesion</NavLink>
                    </div>
                </div>
                <br></br>
                <p>Ingresa el código que se envió a tu correo: </p>
                <div className="IngresoTextoRegistroCodigo">
                  <Input onChange = {(e) => handelInputs(e,"name")} mensaje = "Ingresa el código"/>
                  <Boton texto = "Reenviar Codigo" clase = "Codigoverde"/>
                </div>
                <div className="BotonRegistrarfinalcodigo">
                    <button className="CodigoMediano" onClick={handleStep1}>
                        Registrarme
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegistrarseCodigo