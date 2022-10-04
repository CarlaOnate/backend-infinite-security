import { Input } from 'antd';
import React from 'react';
import '../Estilos/InputText.css'

const Texto = (props) => <Input className='Input' size="large" placeholder={props.mensaje}  />; 

export default Texto;