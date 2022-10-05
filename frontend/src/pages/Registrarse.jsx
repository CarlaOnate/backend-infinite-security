import React from "react";
import DatePicker2 from "../components/DatePicker";
import '../Estilos/Registrarse.css'
import Inputmio from '../components/InputTexto';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CheckBox from "../components/CheckBox";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Registrarse = () => {
    
    const navigate = useLocation()

    const paths = {
        RegistrarseCodigo: navigate.pathname === '/RegistrarseCodigo',
        IniciarSesion: navigate.pathname === '/login'
    };

    return(
        <div className="ArearegistroGeneral">

            <div className="ImagenRegistro">
                <img src="../Imagenes/InicioSesion.png" alt="Imagen Registro"/>
            </div>

            <div className="AreadeCamposRegistro">

                <div className="TitulosRegistrarse1">
                        
                    <div className="TituloIniciarSesion">Registrarse</div>

                    <div>
                        <NavLink to="/login" className={paths.IniciarSesion}> Iniciar Sesion </NavLink>
                    </div>

                </div>

                <p>Nombre:</p>
                <Inputmio mensaje = "Nombre"/>
                
                <p>Apellido Paterno:</p>
                <Inputmio mensaje = "Apellido Paterno"/>
                
                <p>Apellido Materno:</p>
                <Inputmio mensaje = "Apellido Materno"/>

                <p>Genero:</p>
                
                <div className="Checkboxes">
                    <CheckBox txt = "Masculino" />
                    <CheckBox txt = "Femenino" />
                    <CheckBox txt = "Otro" />
                </div>
                
                <p>Fecha de Nacimiento:</p>
                
                <DatePicker2/>

                <p>Estado:</p>

                <div className="Checkboxes">
                   <CheckBox txt = "Estudiante" />
                    <CheckBox txt = "Profesor" />
                    <CheckBox txt = "Investigador" />
                    <CheckBox txt = "Otro" /> 
                </div>
                
                    
                <p>Correo:</p>
                <Inputmio mensaje = "Ejemplo@gmail.com"/>

                <p>Contraseña</p>

                <Input.Password 
                placeholder="Ingrese la contraseña" 
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>

                <div className="BotonRegistrarse">
                    
                    <button type="Submit" className="CodigoPeque">

                        <NavLink to="/RegistrarseCodigo" className={paths.RegistrarseCodigo}>Continuar</NavLink>
                        
                    </button>

                </div>
                
            </div>

        </div>
    )
}

export default Registrarse