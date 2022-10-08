import React, {useState} from "react";
import '../Estilos/Registrarse.css'
import { Input, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DatePicker } from 'antd';
import {crearUsuario, sendEmail} from '../services/axios/user'

const Registrarse = () => {
    
    const navigate = useLocation()
    

    const [radio1, setRadio1] = useState(1);
    const [radio2, setRadio2] = useState(1);

    const [inputs, setInputs] = useState({"work": radio2,"gender":radio1});

    

    const handleStep1 = async () =>{
        const user = await crearUsuario(inputs)
        const emailObject = {
            type:"verify-email",
            email: inputs.email
        }
        const email = await sendEmail(emailObject)
    }

    const handelInputs = (e, tipo) => {
        const {target} = e
        if(tipo === 'work') setRadio2(e.target.value) 
        if(tipo === 'gender') setRadio1(e.target.value) 
        setInputs(prep => ({
            ...prep,
            [tipo]:target.value
        }))
    }

    const onChange = (date, dateString) => {
        setInputs(prep => ({
            ...prep,
            "dateOfBirth":dateString
        }))
    };

    const paths = {
        RegistrarseCodigo: navigate.pathname === '/RegistrarseCodigo',
        IniciarSesion: navigate.pathname === '/IniciarSesion'
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
                        <NavLink to="/IniciarSesion" className={paths.IniciarSesion}> Iniciar Sesion </NavLink>
                    </div>

                </div>

                <p>Nombre:</p>
                <Input onChange = {(e) => handelInputs(e,"name")}/>
                
                <p>Apellido Paterno:</p>
                <Input onChange = {(e) => handelInputs(e,"lastName")}/>
                
                <p>Apellido Materno:</p>
                <Input onChange = {(e) => handelInputs(e,"secondLastName")}/>

                <p>Genero:</p>
                
                <div className="Checkboxes">
                    <Radio.Group  value = {radio1}  onChange = {(e) => handelInputs(e,"gender")}> 
                        <Radio value = {1}>Masculino</Radio>
                        <Radio value = {2}>Femenino</Radio>
                        <Radio value = {3}>Otro</Radio>
                    </Radio.Group>
                </div>
                
                <p>Fecha de Nacimiento:</p>
                
                {/* <DatePicker2 onChange = onChange/> */}
                <DatePicker onChange={onChange} />

                <p>Estado:</p>

                <div className="Checkboxes">
                    <Radio.Group  value = {radio2}  onChange = {(e) => handelInputs(e,"work")}> 
                        <Radio value = {1}>Profesor</Radio>
                        <Radio value = {2}>Estudiante</Radio>
                        <Radio value = {3}>Investigador</Radio>
                        <Radio value = {4}>Otro</Radio>
                    </Radio.Group>
                </div>                
                    
                <p>Correo:</p>
                <Input onChange = {(e) => handelInputs(e,"email")} mensaje = "Ejemplo@gmail.com"/>

                <p>Contraseña</p>

                <Input.Password 
                  onChange = {(e) => handelInputs(e,"password")}
                  placeholder="Ingrese la contraseña" 
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>

                <div className="BotonRegistrarse">
                    
                    <button onClick={handleStep1} className="CodigoPeque">

                        <NavLink to="/RegistrarseCodigo" 
                        state = {{"inputs":inputs}}
                        className={paths.RegistrarseCodigo}
                        >Continuar</NavLink>
                        
                    </button>

                </div>
                
            </div>

        </div>
    )
}

export default Registrarse