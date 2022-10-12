import React from "react";
import Button from "../components/Button";
import CajaNumeros from "../components/NumberBox"
import CajaImagen from "../components/ImageBox";
import '../Estilos/Pantallaprincipal.css'
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Pantallaprincipal = ()=>{

    const navigate = useLocation()

    const paths = {
        home: navigate.pathname === 'reserves'
    };

    return(
        <div>
            <div className="PrimeraSeccion">
                <section className="ContenedorInicial1">
                    
                    <div className="ContenedorInicio">
                        HUB de Ciberseguridad Campus Santa Fe

                        <section className="Subtitulo">
                            Primera institución especializada en la ciberseguridad mexicana
                        </section>
                        
                        <button className="CodigoPeque">
                            <NavLink to="reserves" className={paths.home}>Descubre más</NavLink> 
                        </button>
                        {/* <Button texto = "Descubre más" clase = 'CodigoPeque'/> */}
                    </div>

                </section>
            </div>

            <div className="ContenedorCajaNaranja">
                <section className="CajaNaranja">
                    <div>Porque la seguridad siempre es lo primero.</div>
                    <div>Descubre porque somos la mejor institución en ciberseguridad.</div>
                </section>
            </div>
            
            <div className="SegundaSeccion">
                <div className="CajaTexto">
                    <section className="Titulo">
                        ¿Porque nosotros?
                    </section>
                    <section className="Subtitulo2">
                        Somos una organización líder en ciberseguridad.
                    </section>
                    <section className="Txt">
                        Apoyamos a crear una sociedad más segura
                    </section>
                </div>

                <div className="Numeros">
                    <div className="Numeritos1">
                        <CajaNumeros texto = "Impulsamos el desarrollo del primer ecosistema de este tipo en México y Latinoamérica." numero = '1'/>
                        <CajaNumeros texto = "Brindamos soporte para que cualquier organización o empresa salvaguarde información estratégica." numero = '2'/>
                    </div>
                    <div className="Numeritos">
                        <CajaNumeros texto = "Creamos programas de difusión y concientización sobre la necesidad permanente de contar con herramientas, personal capacitado y los servicios alrededor de la ciberseguridad." numero = '3'/>
                        <CajaNumeros texto = "Buscamos el florecimiento humano a través del liderazgo, el emprendimiento y la innovación." numero = '4'/>
                    </div>
                </div>
            </div>
                
            <img src = "../Imagenes/ImagenPantallaPrincipal1.png" alt = "Imagen del Tec pantalla 1" />

            <div className="TerceraSeccion">

                <div className="CajaTexto">
                    ¿Porque nosotros?
                </div> 

                <div className="Cajitas">

                    <div className="Cajitasseccion3">
                        <CajaImagen ruta = '../Imagenes/Candado.jpg' txt = "Ayudamos a crear una cultura de ciberseguridad"/>
                        <CajaImagen ruta = '../Imagenes/Candado.jpg' txt = "Creamos profesionales competentes"/>
                    </div>

                    <div className="Cajitasseccion3">
                        <CajaImagen ruta = '../Imagenes/Candado.jpg' txt = "Diseñamos estrategias para empresas"/>
                        <CajaImagen ruta = '../Imagenes/Candado.jpg' txt = "Asesoramos empresas"/>
                    </div>

                    <div className="Cajitasseccion3">
                        <CajaImagen ruta = '../Imagenes/Candado.jpg' txt = "Diseñamos el mañana hoy"/>
                        <CajaImagen ruta = '../Imagenes/Candado.jpg' txt = "Creamos lo inimaginable con ayuda de los profesionistas del mañana"/>
                    </div>

                </div>   
            </div>

            <div className="CuartaSeccion">
                <div className="Contenedorflexcuartaseccion">
                    <div className="CajaTexto2">
                        Descubre la app
                    </div>
                    <div className="subtituloCuartaseccion">
                        Bajala de la App Store y descrubre su potencial
                    </div>
                    <Button texto = "Descarga aquí" clase = 'CodigoPeque'/>
                </div>

                <div className="Prueba">
                    <img src='../Imagenes/IOS.jpg' alt="Imagen IOS"/> 
                </div>
            </div>

        </div>

    )
}

export default Pantallaprincipal