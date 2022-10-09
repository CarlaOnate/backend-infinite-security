import React , {useState} from 'react';
import '../Estilos/imagenes.css'
import '../Estilos/Contra.css'
import { NavLink } from "react-router-dom";
import { Input, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { sendEmail, verificar, changePassword } from '../services/axios/user'
import { validatePasswordStrength } from "../util";


const Contra = (props) => {
    const [ step, setStep ] = useState(0)
    const [ inputs , setInputs ] = useState({})
    const [ success, setSuccess ] = useState({})
    const [ error, setError ] = useState({})
    const [ warning, setWarning ] = useState()
    const [ redirectToLogin, setRedirectToLogin ] = useState(false)

    const changeNextStep = async () => {
      if (step + 1 === 1) await handleStep1Actions()
      if (step + 1 === 2) await handleStep2Actions()
      if (step + 1 === 3) await handleStep3Actions()
    }

    const handleInputChange = (e, type) => {
      const { target } = e;
      setInputs(prev => ({
        ...prev,
        [type]: target.value
      }))
    }

    const handleStep1Actions = () => {
      const { email } = inputs;
      setStep(step + 1)
      const emailObject = {
        type:"change-password",
        email
      }
      sendEmail(emailObject)
        .then(response => {
          if (response.msg) setSuccess({ msg: response.msg })
        })
        .catch(() => {
          setError({msg: "Hubo un error, inténtalo mas tarde"})
        })
    }

    const handleStep2Actions = async () => {
      const { email } = inputs

      const user = await verificar({
        email,
        "code": inputs.code
      })

      if(user.msg) {
        return setStep(step + 1)
      }
      if (user.error) {
        return setError({ msg: user.error })
      }
    }

    const handleStep3Actions = () => {
      const { email, password_1 } = inputs;
      if (verifySamePassword()) {
        const validPassword = validatePasswordStrength(password_1)
        if (!validPassword) return setWarning(true)
        const changePasswordReq = { email, password: password_1 }
        changePassword(changePasswordReq)
          .then(res => {
            if (res.msg) {
              setSuccess({ msg: res.msg })
              setRedirectToLogin(true)
            }
            if (res.error) setError({ msg: "Hubo un error, inténtalo mas tarde" })
          })
          .catch(() => setError({ msg: "Hubo un error, inténtalo mas tarde" }))
      } else {
        setError({ msg: "Las contraseñas no coinciden "})
      }
    }

    const verifySamePassword = () => {
      const { password_1, password_2 } = inputs;
      return password_1 === password_2
    }

    const renderError = () => (
        <Alert
          message="Error"
          description={error.msg}
          type="error"
          showIcon
          afterClose={() => setError(false)}
          closable
        />
    )

    const renderSuccess = () => (
      <Alert
        description={success.msg || ""}
        type="success"
        showIcon
        afterClose={() => setError(false)}
        closable
      />
    )

    const renderPasswordWarning = () => (
      <Alert
        description="La contrseña tiene que ser igual o mayor 8 dígitos, tener una mayúscula, una minúscula, un número y un cáracter espcial"
        type="warning"
        showIcon
        afterClose={() => setWarning(false)}
        closable
      />
    )

    const Vista1 = () => {
        return(
            <div>
                <section className='header'>.</section>
                <div className='Contenedorpartido'>
                    <img src= {props.imagen} className='Imagen' alt='Imagen Seccion Contra'/>
                    <div className='Secciontexto'>
                    <label>Ingrese su correo</label>
                    <Input onChange={e => handleInputChange(e, 'email')} type="text"/>
                    {success.msg && renderSuccess()}
                    {error.msg && renderError()}
                    <button className='Codigo' onClick={changeNextStep}>
                        Obtener código
                    </button>
                    </div>
                </div>
            </div>
        )
    }

    const Vista2 = () => {
        return(
            <div>
              <section className='header'>.</section>
              <div className='Contenedorpartido'>
                <img src= {props.imagen} className='Imagen' alt='Imagen Seccion Contra'/>
                <div className='Secciontexto'>
                  <p className='ParrafoBoton'>Ingresa el código:</p>
                  <Input onChange={e => handleInputChange(e, 'code')}  type="text" />
                  {success.msg && renderSuccess()}
                  {error.msg && renderError()}
                  <button className='Codigo' onClick={changeNextStep}>Verificar códgio</button>
                </div>
              </div>
            </div>
        )
    }

    const Vista3 = () => {
        return(
            <div>
                <section className='header'>.</section>
                <div className='Contenedorpartido'>
                    <img src= {props.imagen} className='Imagen' alt='Imagen Seccion Contra'/>
                    <div className='Secciontexto'>

                        <p className='ParrafoBoton'>Ingresa la nueva contraseña</p>
                        <Input.Password
                        placeholder="Ingrese la contraseña"
                        onChange={e => handleInputChange(e, 'password_1')}
                        className='InputContra'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                        <p>Confirma la nueva contraseña</p>
                        <Input.Password
                        onChange={e => handleInputChange(e, 'password_2')}
                        placeholder="Confirma la contraseña"
                        className='InputContra'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                        {success.msg && renderSuccess()}
                        {error.msg && renderError()}
                        {warning && renderPasswordWarning()}
                        {!redirectToLogin && <button className='Codigo' onClick={changeNextStep}>Actualizar</button>}
                        {redirectToLogin && <button className='Codigo' onClick={changeNextStep}><NavLink to="login">Login</NavLink></button>}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
          {step === 0 && Vista1()}
          {step === 1 && Vista2()}
          {step === 2 && Vista3()}
        </div>
    )
}

export default Contra;