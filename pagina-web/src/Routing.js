import React from 'react';
import Home from './pages/clasesReact/Home/App';
import Pepo from './pages/clasesReact/Pepo'
import RickAndMorty from './pages/clasesReact/RickAndMortyApi'
import { Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <Routes>
      <Route  path="/" element={<Home />}/>
      <Route  path="/jiji" element={<p> JIJIJI </p>}/>
      <Route  path="/pepo" element={<Pepo />}/>
      <Route  path="/axios" element={<RickAndMorty />}/>
    </Routes>
  );
}

export default Routing;
