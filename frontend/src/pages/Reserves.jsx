import React from "react";
import Button from "../components/Button";
import '../Estilos/Reservas.css'
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Reservas = () => {

    const navigate = useLocation()

    const paths = {
        home: navigate.pathname === '/login'
    };
    
    return (
        <div>

            <div className="Seccion1">

                <section className="ContenedorInicial2">

                    <div className="ContenedorInicio">
                        Reserva espacios o equipo dentro del Hub CSF

                        <section className="Subtitulo">
                            Desarrolla tus habilidades al máximo
                        </section>
                        
                        {/* <Button texto = "Registrate y reserva ya" clase = 'CodigoPeque'/> */}

                        <button className="CodigoPeque">
                            <NavLink to="/login" className={paths.home}>Registrate y reserva ya!!</NavLink> 
                        </button>

                    </div>

                </section>

            </div>
            
            <div className="Seccion2">
                <div className="ContenidoSeccion2Reservas">
                    
                    <div className="TextosReservas">
                        <div className="TituloSeccion2">Puedes Reservar</div>
                        <div className="SubtituloSeccion2">Somos una organización líder en Ciberseguridad</div>
                        <div className="TextoSeccion2">Al ser parte del hub puedes reservar espacios o equipos físicos</div>
                    </div>

                    <div className="ListasReservas">
                        <ul className="Listadesordenada">
                            <li>Equipos de computo</li>
                            <li>Equipos de redes</li>
                            <li>Equipos de electronica</li>
                            <li>Licencias de software</li>
                        </ul>
                    </div>
                </div>

                <div className="ImagenSeccion2Reservas">
                    <img src='../Imagenes/Cubito.png' alt="Esta el la imagen del cubito"/>
                </div>

            </div>

            <div className="Seccion3">
                
                <div className="ImageSeccion3">
                    <img src="../Imagenes/imagenSeccion2Reservas.png" alt="Imagen seccion 3 Reservas"/>
                </div>

                <div className="TextoSeccion3">

                    <div className="TituloSeccion2">Revisa tus reservas</div>

                    <div className="Subtitulo2Seccion2">Puedes ver tus reservas y el historial de reservas</div>

                    <ul>
                        <li>Revisa tus reservas actuales</li>
                        <li>Encuentra la ubicación de tus reservas</li>
                        <li>Ponte en contacto con los administradores del HUB</li>
                    </ul>

                </div>

            </div>

        </div>
    )
}

export default Reservas