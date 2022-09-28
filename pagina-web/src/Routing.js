import React from 'react';
import Contra from './Componentes/Contra';
import imagen1 from './Imagenes/Imagen1.png';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './Componentes/Navbars/Navbar';
import Pantallaprincipal from './Componentes/pantallaPrincipal';
import Reservas from './Componentes/Reservas';
import IniciarSesion from './Componentes/IniciarSesion';
import Registrarse from './Componentes/Registrarse';
import RegistrarseCodigo from './Componentes/RegistrarseCodigo';
import { ComponentWithContext } from './pages/ComponentWithContext';
import { HistorialReservas } from './pages/HistorialReservas/HistorialReservas';

function Routing() {
  return (
    <>
      <BrowserRouter>
        
        <Navbar/>

        <Routes>
          
          <Route path='/' element={<Pantallaprincipal/>}/>

          <Route path='/Reservas' element={<Reservas/>}/>

          <Route path='/IniciarSesion' element = {<IniciarSesion/>}/>

          <Route  exact path="/RecuperarContra" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>

          <Route exact path="/Registrarse" element={<Registrarse/>}/>
          
          <Route exact path="/RegistrarseCodigo" element={<RegistrarseCodigo/>}/>
          
          <Route  exact path="/Borrarcuenta" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>

          <Route  exact path="/GraficasUsuario" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>

          <Route  exact path="/historial-reservas" element={<HistorialReservas />}/>

          {/* EXAMPLE CONTEXT */}
          <Route  exact path="/user-context" element={<ComponentWithContext />}/>

        </Routes>
        
      </BrowserRouter>
      
    </>
  );
}

export default Routing;