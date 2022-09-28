import React from "react";
import '../Estilos/BorrarCuentaAdmin.css'
import DatePicker2 from "./DatePicker";
import Inputmio from './InputTexto';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import CheckBox from "./CheckBox";

const BorrarCuentaAdmin = () =>{
    return(
        <div className="ContenedorGeneralBorrarCuentaAdmin">

            <div className="ConenedorContenidoBorrarCuentaAdmin">

                <div className="ContenedorIzquierdoBorrarCuentaAdmin">

                    <h1 className="TituloBorrarCuentaAdmin">
                        Mi perfil
                    </h1>

                    <p>Correo:</p>
                    <Inputmio mensaje = "Ejemplo@gmail.com"/>

                    <p>Contraseña</p>

                    <Input.Password 
                    placeholder="Ingrese la contraseña" 
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>

                    <p>Fecha de Nacimiento:</p>

                    <DatePicker2/>


                </div>

                <div className="ContenedorDerechoBorrarCuentaAdmin">

                    <p>Nombre:</p>
                    <Inputmio mensaje = "Nombre"/>

                    <p>Apellido Paterno:</p>
                    <Inputmio mensaje = "Apellido Paterno"/>

                    <p>Apellido Materno:</p>
                    <Inputmio mensaje = "Apellido Materno"/>

                    <p>Genero:</p>

                    <div className="CheckboxesBorrarCuentaAdmin">
                        <CheckBox txt = "Masculino" />
                        <CheckBox txt = "Femenino" />
                        <CheckBox txt = "Otro" />
                    </div>

                    <p>Estado:</p>

                    <div className="CheckboxesBorrarCuentaAdmin">
                    <CheckBox txt = "Estudiante" />
                        <CheckBox txt = "Profesor" /> 
                    </div>

                    <div className="CheckboxesBorrarCuentaAdmin">
                        <CheckBox txt = "Investigador" />
                        <CheckBox txt = "Otro" />
                    </div>

            </div>

        </div>
            

            

        </div>
    )
}

export default BorrarCuentaAdmin