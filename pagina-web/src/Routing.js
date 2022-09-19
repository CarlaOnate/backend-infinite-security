import React from 'react';
import Home from './pages/clasesReact/Home/App';
import Pepo from './pages/clasesReact/Pepo'
import { Ivan } from './pages/clasesReact/Ivan'
import Registration from './pages/Registration'
import RickAndMorty from './pages/clasesReact/RickAndMortyApi'
import { Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <Routes>
      <Route  path="/" element={<Home />}/>
      <Route  path="/registro" element={<Registration />}/>
      <Route  path="/jiji" element={<p> JIJIJI </p>}/>
      <Route  path="/pepo" element={<Pepo />}/>
      <Route  path="/ivan" element={<Ivan />}/>
      <Route  path="/axios" element={<RickAndMorty />}/>
    </Routes>
  );
}

export default Routing;
