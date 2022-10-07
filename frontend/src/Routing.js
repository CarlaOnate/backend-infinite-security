import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { UserContext } from './context/userContext'

import Contra from './pages/cambiarContra';
import { Navbar } from './components/navbar/Navbar';
import Pantallaprincipal from './pages/pantallaPrincipal';
import Reservas from './pages/Reserves';
import Registrarse from './pages/Registrarse';
import IniciarSesion from './pages/IniciarSesion';
import RegistrarseCodigo from './pages/RegistarseCodigo';
import { ReservasMenu } from './pages/Reservas/ReservasMenu';
import { Users } from './pages/Usuarios/Users';

import RecoverPasswordImage from './images/recoverPassword.png';

import { Stats } from './pages/statistics/Stats';
import { HistorialReservas } from './pages/reservesHistory/ReservesHistory';
import { Profile } from './pages/Profile';

function Routing(props) {
  const { user } = useContext(UserContext);
  const userLoggedIn = user.id !== null;
  const userIsAdmin = user.rol !== null;
  const showUserRoutes = userLoggedIn && !userIsAdmin;
  const showAuthRoutes = !userLoggedIn;
  const showAdminRoutes = userIsAdmin;

  const authProps = {
    userId: user.id,
    userLoggedIn,
    userIsAdmin,
    userIsGeneralAdmin: user.rol === 0
  };

  const renderAuthRoutes = (authProps) => (
    <>
      <Route exact path='/login' element = {<IniciarSesion {...authProps} />}/>{/*Para la pestaña de login o de inicio de sesion*/}
      <Route  exact path="/RecuperarContra" element={<Contra imagen = {RecoverPasswordImage} mensaje = "Ingrese su correo" {...authProps} />}/>{/*Para la pestaña de recuperar contraseña*/}
      <Route exact path="/Registrarse" element={<Registrarse {...authProps} />}/> {/*Para la pestaña de Registrarse*/}
      <Route exact path="/RegistrarseCodigo" element={<RegistrarseCodigo {...authProps} />}/> {/*para ir a registrarse donde te pide el código codigo*/}
    </>
  );

  const renderPublicRoutes = (authProps) => (
    <>
      <Route path='/' element={<Pantallaprincipal {...authProps} />}/>
      <Route path='reserves' element={<Reservas {...authProps} />}/>
    </>
  );

  const renderUserRoutes = (authProps) => {
    return (
      <>
        <Route  exact path="perfil" element={<Profile {...authProps} />}/>
        <Route  exact path="/statistics" element={<Stats {...authProps} />}/>
        <Route  exact path="/perfil" element={<Profile {...authProps} />}/>
      </>
    );
  };

  const renderAdminRoutes = (authProps) => (
    <>
      <Route  exact path="/reserves-history" element={<HistorialReservas {...authProps} />}/>
      <Route  exact path="/statistics" element={<Stats {...authProps} />}/>
      <Route  exact path="perfil" element={<Profile {...authProps} />}/>
      <Route exact path="/reservation" element={<ReservasMenu {...authProps} />}/>
      <Route exact path="/users" element={<Users {...authProps} />}/>
    </>
  );

  return (
    <>
      <BrowserRouter>
        <Navbar {...authProps} />
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
};

export default Routing;