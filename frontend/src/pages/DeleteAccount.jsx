import React from "react";
import Boton from '../components/Button'
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../Estilos/Boton.css'

const Borrarcuenta = () =>{
    const navigate = useLocation()

    const paths = {
        home: navigate.pathname === '/' && 'navActivo',
        PerfilUsuario: navigate.pathname === '/PerfilUsuario' && 'navActivo',
    }

    return(
        <div className="BorrarCuentaUserGeneral">            
            <h1 className="TituloBorrarCuentaUser"> Borrar una cuenta </h1>

            <h2 className="SubtituloBorrarCuentaUser"> ¿Estás seguro de eliminar esta cuenta? </h2>

            <div className="Botones">
                <button className="Codigoespecial">
                    <NavLink to="/" className={paths.home}> Si </NavLink>
                </button>
                <button className="Codigo">
                    <NavLink to="/PerfilUsuario" className={paths.PerfilUsuario}> No </NavLink>
                </button>
                
            </div>

        </div>
    )
}


export default Borrarcuenta;