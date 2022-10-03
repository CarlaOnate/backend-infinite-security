import React , {useState} from 'react';
import '../Estilos/header.css'
import '../Estilos/footer.css'
import '../Estilos/imagenes.css'
import '../Estilos/Contra.css'
import Cajatexto from './InputTexto'
import Boton from './Boton'
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const Aumentar = {}

const Contra = (props) => {
    const [vistas, setVistas] = useState(0)
    const navigate = useLocation()
    const paths = {
        IniciarSesion: navigate.pathname === '/IniciarSesion' && 'navActivo',
    }

    const Aumentar = () => {
        setVistas(vistas + 1);
    }

    const Vista1 = () => {
        return(

            <div>
                <section className='header'>.</section>
                <div className='Contenedorpartido'>
                    <img src= {props.imagen} className='Imagen'/>
                    <div className='Secciontexto'>

                    <p className='ParrafoBoton'>Ingrese su correo:</p>

                    <Cajatexto mensaje = {props.mensaje}/>
                    
                    {/* <Boton texto = "Obtener código" clase="Codigo"/> */}

                    <button className='Codigo' onClick={() => Aumentar()}>
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
                    <img src= {props.imagen} className='Imagen'/>
                    <div className='Secciontexto'>

                    <p className='ParrafoBoton'>Ingrese su correo:</p>

                    <Cajatexto mensaje = {props.mensaje}/>

                    <p className='ParrafoBoton'>Ingresa el código:</p>
                    <Cajatexto mensaje = "Ingresa el código"/>

                    {/* <Boton texto = "Obtener código" clase="Codigo"/> */}

                    <button className='Codigo' onClick={() => Aumentar()}>
                        Ingresar constraseña
                    </button>

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
                    <img src= {props.imagen} className='Imagen'/>
                    <div className='Secciontexto'>

                    <p className='ParrafoBoton'>Ingrese su correo:</p>

                    <Cajatexto mensaje = {props.mensaje}/>
                    
                    <p className='ParrafoBoton'>Ingresa la nueva contraseña</p>

                    <Input.Password 
                    placeholder="Ingrese la contraseña" 
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>

                    <p>Confirma la nueva contraseña</p>
                    <Input.Password 
                    placeholder="Confirma la contraseña" 
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>

                    {/* <Boton texto = "Obtener código" clase="Codigo"/> */}

                    <button className='Codigo' onClick={() => Aumentar()}>
                        Actualizar
                    </button>

                    </div>

                </div>
            </div>
        )
    }

    return(
        
        <div>
            
            {vistas === 0 && Vista1()}
            {vistas === 1 && Vista2()}
            {vistas === 2 && Vista3()}
            
        </div>
    )
}

export default Contra;