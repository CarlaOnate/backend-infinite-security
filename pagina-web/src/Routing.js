import React from 'react';
//import Contra from './components/Contra';
//import imagen1 from './Imagenes/Imagen1.png';
//import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbars/Navbar';

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<p>Página principal</p>}/>
          <Route  exact path="/RecuperarContra" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>
          <Route  exact path="/Borrarcuenta" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>
          <Route  exact path="/GraficasUsuario" element={<Contra imagen = {imagen1} mensaje = "Ingrese su correo"/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default Routing;