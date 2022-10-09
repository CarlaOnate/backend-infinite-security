import React, {useState} from "react";
import '../Estilos/Registrarse.css'
import { Input, Radio, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Navigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DatePicker, Alert } from 'antd';
import {crearUsuario, sendEmail} from '../services/axios/user'
import { validatePasswordStrength } from "../util";

const Registrarse = () => {
    const navigate = useLocation()
    const [radio1, setRadio1] = useState(1);
    const [radio2, setRadio2] = useState(1);
    const [ warning, setWarning ] = useState({});
    const [ error, setError ] = useState()
    const [ loading, setLoading ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)

    const [inputs, setInputs] = useState({"work": radio2,"gender":radio1});

    const handleStep1 = async () => {
      if (Object.keys(inputs).length === 8) {
        const validPassword = validatePasswordStrength(inputs.password)
        if (validPassword) {
          const emailObject = { // A1!holaholahola
            type:"verify-email",
            email: inputs.email
          }
          crearUsuario(inputs)
            .then(() => {
                setLoading(true)
                return sendEmail(emailObject)
              })
            .then(data => data.msg && setRedirect(true))
            .catch(() => setError(true))
        } else {
          setWarning({ msg: "La contrseña tiene que ser igual o mayor 8 dígitos, tener una mayúscula, una minúscula, un número y un cáracter espcial"})
        }
      }
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

    const onChange = (dateString) => {
        dateString && setInputs(prep => ({
            ...prep,
            "dateOfBirth": dateString.format('YYYY-MM-DD')
        }))
    };

    const paths = {
        RegistrarseCodigo: navigate.pathname === '/RegistrarseCodigo',
        IniciarSesion: navigate.pathname === '/IniciarSesion'
    };

    const resetAlertStates = () => {
      setWarning({})
      setError(false)
    }

    const renderWarning = () => (<div>
      <Alert
        description={warning.msg}
        type="warning"
        showIcon
        afterClose={resetAlertStates}
        closable/>
    </div>)
    
    const renderError = () => (<div>
      <Alert
        description="El correo es incorrecto o ya existe"
        type="error"
        showIcon
        afterClose={resetAlertStates}
        closable/>
    </div>)

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
                <Input type="email" onChange = {(e) => handelInputs(e,"email")} mensaje = "ejemplo@gmail.com"/>
                <p>Contraseña</p>
                <Input.Password
                  onChange = {(e) => handelInputs(e,"password")}
                  placeholder="Ingrese la contraseña"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                {warning.msg && renderWarning()}
                {error && renderError()}
                <div className="BotonRegistrarse">
                    <button onClick={handleStep1} className="CodigoPeque">
                    Continuar
                    </button>
                </div>
                {loading && <Spin size="small" />}
            </div>
            {redirect && <Navigate to="/RegistrarseCodigo" state = {{"inputs":inputs}}/>}
        </div>
    )
}

export default Registrarse