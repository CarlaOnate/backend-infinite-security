import React, { useState } from "react";
import Login from '../../components/Login'
import Signup from '../../components/Signup'
import { Input, Image, Button } from 'antd';
import miImage from '../../assets/carla5_2000px.JPG'

const Registration = props => {
  const [showLogin, setShowLogin] = useState(true);
  
  const texto = showLogin ? "Inicia sesión" : "Registrate"

  const onCLickLogin = () => {
    setShowLogin(!showLogin);
  }

  return (
    <div>
      <div>
        <Button>SOY BOTON</Button>
      </div>
      <div>
        <h2>Registrate</h2>
        <p onClick={onCLickLogin}>{texto}</p>
      </div>
      {showLogin ?
        (<Login changeForm={onCLickLogin}/>) :
        (<Signup changeForm={onCLickLogin}/>)}
    </div>
  )
}

export default Registration;
