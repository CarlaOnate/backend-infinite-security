import React from "react";
import tecLogo from '../../images/tecLogo.png';
import Navbar from "./navbar/Navbar";

export const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" src = {tecLogo} alt="Tecnológic de Monterrey Logo"/>
      <Navbar />
    </header>
  );
};