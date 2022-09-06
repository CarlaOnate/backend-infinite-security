import React from 'react';
import Home from './pages/Home/App';
import Pepo from './pages/Pepo'
import { Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <Routes>
      <Route  path="/" element={<Home />}/>
      <Route  path="/jiji" element={<p> JIJIJI </p>}/>
      <Route  path="/pepo" element={<Pepo />}/>
    </Routes>
  );
}

export default Routing;
