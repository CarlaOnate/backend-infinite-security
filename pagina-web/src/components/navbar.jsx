import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = ( props ) => {

  const navigate = useLocation()
  console.log(navigate.pathname)

  const paths = {
    home: navigate.pathname === '/' && 'navActivo',
    reserves: navigate.pathname === '/reserves' && 'navActivo',
    login: navigate.pathname === '/login' && 'navActivo'
  }

  const navNoLog = ( navbarType ) => {
    // Agrupar navlinks
    return (
      <>
        <NavLink to="/" className={paths.home} > Inicio </NavLink>
        <NavLink to="/reserves" className={paths.reserves}> Reservas </NavLink>       
        <NavLink to="/login" className={paths.startSession}> Iniciar Sesión </NavLink>
      </>
    )
  }

  const NavNoLog3 = ( navbarType ) => {
    return (
      <>
        <NavLink to="/" className={paths.home}> Conoce el HUB </NavLink>
      </>
    )
  }

  return (
    <nav className="navbar">
      <div className="navbar__options">
        {
          /*
          No esta logueado el usuario
          Se crea un contexto (Estado que todos puedan accesar)
          Se guarda el id del usuario que esta logueado, variables de validaciones generales
          Islock cambia los navbar y así se muestran
          */
        }
        {navigate.pathname === '/' && navNoLog()}
        {navigate.pathname === '/reserves' && navNoLog()}
        {navigate.pathname === '/login' && navNoLog()}
        {navigate.pathname === '/singUp' && navNoLog()}
        {navigate.pathname === '/singUpCode' && navNoLog()}
        {/* || navigate.pathname === '/Reservas' || navigate.pathname === '/IniciarSesion'  */}
        {/* {tipoNavbar === 1 && navNoLog2()} */}
        {navigate.pathname === '/recoverPassword' && NavNoLog3()}
      </div>
    </nav>
  )
}

export default Navbar;