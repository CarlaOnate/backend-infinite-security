import React from "react";
import { NavLink } from "react-router-dom";
import '../../Estilos/Navbar.css'
import { useLocation } from "react-router-dom";

const Navbar = (props) => {

    const navigate = useLocation()
    console.log(navigate.pathname)

    const paths = {
        home: navigate.pathname === '/' && 'navActivo',
        Borrar: navigate.pathname === '/Borrarcuenta' && 'navActivo',
        Recuperar: navigate.pathname === '/RecuperarContra' && 'navActivo'
    }

    const navNoLog = (tipoNavbar) => {
        //Agrupar navlinks
        return(
            <>
                <NavLink to="/" className={paths.home} > Home </NavLink>
                    
                <NavLink to="/Borrarcuenta" className={paths.Borrar}> Borrar cuenta </NavLink>
                            
                <NavLink to="/RecuperarContra" className={paths.Recuperar}> Recuperar contra </NavLink>
            </>
            
        )
    }

    const navNoLog2 = (tipoNavbar) => {
        //Agrupar navlinks
        return(
            <>
                <NavLink to="/" className={paths.home} > Home </NavLink>
                    
                <NavLink to="/" className={paths.Borrar}> Home2 </NavLink>
                            
                <NavLink to="/" className={paths.Recuperar}> Home3 </NavLink>
            </>
        )
    }

    const tipoNavbar = 0;

    return(
        <nav>
            <div className="Navbar">
                <img src="#" alt="Logo tec"/>

                <div className="Cajita">
                    
                    {
                        //No esta logueado el usuario
                        //Se crea un contexto (Estado que todos puedan accesar)
                        //Se guarda el id del usuario que esta logueado, variables de validaciones generales
                        //Islock cambia los navbar y así se muestran
                    }

                    {tipoNavbar === 0 && navNoLog()}
                    {tipoNavbar === 1 && navNoLog2()}

                </div>
            </div>

        </nav>
    )
}


export default Navbar;