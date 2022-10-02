import React from "react";
import tecLogo from '../../images/tecLogo.png';
import Navbar from "../Componentes/navbar/Navbar";

const Header = ( props ) => {

    return(
        <header className="header">
            <img className="header__logo" src = {tecLogo} alt="Tecnológic de Monterrey Logo"/>
            <Navbar />
            <div className="header__profile"></div>
        </header>
    )
}

export default Header;