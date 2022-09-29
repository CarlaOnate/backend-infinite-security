import React, {useContext} from 'react';
import Contra from './Componentes/Contra';
import imagen1 from './Imagenes/Imagen1.png';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from './Componentes/Navbars/Navbar';
import Pantallaprincipal from './Componentes/pantallaPrincipal';
import Reservas from './Componentes/Reservas';
import IniciarSesion from './Componentes/IniciarSesion';
import Registrarse from './Componentes/Registrarse';
import RegistrarseCodigo from './Componentes/RegistrarseCodigo';
import { ComponentWithContext } from './pages/ComponentWithContext';
import { HistorialReservas } from './pages/HistorialReservas/HistorialReservas';
import { UserContext } from './context/userContext'

function Routing() {
  const { user } = useContext(UserContext)
  const userLoggedIn = user.user != null
  const userIsAdmin = user.rol != null
  const showUserRoutes = userLoggedIn && !userIsAdmin
  const showAuthRoutes = !userLoggedIn
  const showAdminRoutes = userIsAdmin

  const renderAuthRoutes = () => (
    <>
      <Route path='/IniciarSesion' element = {<IniciarSesion/>}/>
      <Route  exact path="/RecuperarContra" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>
      <Route exact path="/Registrarse" element={<Registrarse/>}/>
    </>
  )

  const renderPublicRoutes = () => (
    <>
      <Route path='/' element={<Pantallaprincipal/>}/>
      <Route path='/Reservas' element={<Reservas/>}/>
    </>
  )

  const renderUserRoutes = () => {
    return (
      <>
        <Route  exact path="/Borrarcuenta" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>
        <Route  exact path="/GraficasUsuario" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>
      </>
    )
  }

  const renderAdminRoutes = () => (
    <>
      <Route  exact path="/historial-reservas" element={<HistorialReservas />}/>
    </>
  )

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {renderPublicRoutes()}
          {showUserRoutes && renderUserRoutes()}
          {showAuthRoutes && renderAuthRoutes()}
          {showAdminRoutes && renderAdminRoutes()}
          <Route path='*' element={<Navigate to="/" />} />
          {/* EXAMPLE CONTEXT */}
          <Route  exact path="/user-context" element={<ComponentWithContext />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;