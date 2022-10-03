import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../Estilos/PerfilUsuario.css'
import Inputmio from './InputTexto';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import DatePicker2 from "./DatePicker";
import CheckBox from "./CheckBox";

const PerfilUsuario = () =>{
    const navigate = useLocation()

    const paths = {
            home: navigate.pathname === '/' && 'navActivo',
            BorrarCuenta: navigate.pathname === '/BorrarCuenta' && 'navActivo',
    }

    return(
        <div className="PerfilUsuarioUser">
            
            <h1 className="TituloPerfilUsuario">Perfil del usuario</h1>

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
                    
                <button type="Submit" className="CodigoMediano">

                    <NavLink to="/" className={paths.home}>Actualizar</NavLink>
                        
                </button>

                <button type="Submit" className="CodigoespecialMediano">

                    <NavLink to="/BorrarCuenta" className={paths.BorrarCuenta}>Borrar Cuenta</NavLink>
                        
                </button>

            </div>

        </div>
    )
}

export default PerfilUsuario;