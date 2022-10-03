import React, {useContext} from 'react';
import Contra from './Componentes/Contra';
import imagen1 from './Imagenes/Imagen1.png';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Navbar2 } from './Componentes/Navbars/Navbar2';
import Pantallaprincipal from './Componentes/pantallaPrincipal';
import Reservas from './Componentes/Reservas';
import IniciarSesion from './Componentes/IniciarSesion';
import Registrarse from './Componentes/Registrarse';
import RegistrarseCodigo from './Componentes/RegistrarseCodigo';
import { ComponentWithContext } from './pages/ComponentWithContext';
import Borrarcuenta from './Componentes/BorrarCuenta';
import PerfilUsuario from './Componentes/PerfilUsuario';
import BorrarCuentaAdmin from './Componentes/BorrarCuentaAdmin'
import { HistorialReservas } from './pages/HistorialReservas/HistorialReservas';
import HacerReserva from './Componentes/Reservas/hacerReserva';
function Routing() {
  const { user } = useContext(UserContext)
  const userLoggedIn = user.id !== null;
  const userIsAdmin = user.rol !== null;
  const showUserRoutes = userLoggedIn && !userIsAdmin
  const showAuthRoutes = !userLoggedIn
  const showAdminRoutes = userIsAdmin

  const authProps = {
    userLoggedIn,
    userIsAdmin
  }

  const renderAuthRoutes = (authProps) => (
    <>
      <Route path='/IniciarSesion' element = {<IniciarSesion {...authProps} />}/>
      <Route  exact path="/RecuperarContra" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo" {...authProps} />}/>
      <Route exact path="/Registrarse" element={<Registrarse {...authProps} />}/>
    </>
  )

  const renderPublicRoutes = (authProps) => (
    <>
      <Route path='/' element={<Pantallaprincipal {...authProps} />}/>
      <Route path='/Reservas' element={<Reservas {...authProps} />}/>
    </>
  )

  const renderUserRoutes = (authProps) => {
    return (
      <>
        <Route  exact path="/Borrarcuenta" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo" {...authProps} />}/>
        <Route  exact path="/GraficasUsuario" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo" {...authProps} />}/>
        <Route  exact path="/estadisticas" element={<Stats {...authProps} />}/>
      </>
    )
  }

  const renderAdminRoutes = (authProps) => (
    <>
      <Route  exact path="/historial-reservas" element={<HistorialReservas {...authProps} />}/>
      <Route  exact path="/estadisticas" element={<Stats {...authProps} />}/>
      <Route  exact path="/usuarios" element={<Users {...authProps} />}/>
    </>
  )

  return (
    <>
      <BrowserRouter>
        <Navbar2 {...authProps} />
        <Routes>
          {renderPublicRoutes(authProps)}
          {showUserRoutes && renderUserRoutes(authProps)}
          {showAuthRoutes && renderAuthRoutes(authProps)}
          {showAdminRoutes && renderAdminRoutes(authProps)}
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;