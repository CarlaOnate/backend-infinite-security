import React from "react";
import { NavLink } from "react-router-dom";
import '../../Estilos/Navbar.css'
import { useLocation } from "react-router-dom";

const Navbar = (props) => {

    const navigate = useLocation()

    console.log(navigate.pathname)

    const paths = {
        home: navigate.pathname === '/' && 'navActivo',
        Reservas: navigate.pathname === '/Reservas' && 'navActivo',
        IniciarSesion: navigate.pathname === '/IniciarSesion' && 'navActivo'
    }

    const navNoLog = (tipoNavbar) => {
        //Agrupar navlinks
        return(
            <>
                <NavLink to="/" className={paths.home} > Home </NavLink>
                    
                <NavLink to="/Reservas" className={paths.Reservas}> Reservas </NavLink>
                            
                <NavLink to="/IniciarSesion" className={paths.IniciarSesion}> Iniciar Sesion </NavLink>
            </>
            
        )
    }

    const NavNoLog3 = (tipoNavbar) => {
        return(
            <>
                <NavLink to="/" className={paths.home}> Conoce el HUB </NavLink>
            </>
        )
    }

    return(
        <nav>
            <div className="Navbar">
                <img src = '../../Imagenes/logo-tec.jpg' alt="Logo tec"/>

                <div className="Cajita">
                    
                    {
                        //No esta logueado el usuario
                        //Se crea un contexto (Estado que todos puedan accesar)
                        //Se guarda el id del usuario que esta logueado, variables de validaciones generales
                        //Islock cambia los navbar y así se muestran
                    }
                    
                    {navigate.pathname === '/' && navNoLog()}
                    {navigate.pathname === '/Reservas' && navNoLog()}
                    {navigate.pathname === '/IniciarSesion' && navNoLog()}
                    {navigate.pathname === '/Registrarse' && navNoLog()}
                    {navigate.pathname === '/RegistrarseCodigo' && navNoLog()}

                    {/* || navigate.pathname === '/Reservas' || navigate.pathname === '/IniciarSesion'  */}
                    {/* {tipoNavbar === 1 && navNoLog2()} */}

                    {navigate.pathname === '/RecuperarContra' && NavNoLog3()}

                </div>
            </div>

        </nav>
    )
}


export default Navbar;