import React from "react";
import Boton from "./Boton"
import CajaNumeros from "./CajasNumeros"
import CajaImagen from "./CajaImagen";
import '../Estilos/Pantallaprincipal.css'

const Pantallaprincipal = ()=>{
    return(
        <div>
            <div className="PrimeraSeccion">
                <section className="ContenedorInicial1">
                    
                    <div className="ContenedorInicio">
                        HUB de Ciberseguridad Campus Santa Fe

                        <section className="Subtitulo">
                            Primera intitución especializada en la ciberseguridad mexicana
                        </section>
                        
                        <Boton texto = "Descubre más" clase = 'CodigoPeque'/>
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
                        Porque nosotros?
                    </section>
                    <section className="Subtitulo2">
                        Somos una organización líder en ciberseguridad.
                    </section>
                    <section className="Txt">
                        Apoyamos a crear una sociendad más segura
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
                
            <img src = "../Imagenes/ImagenPantallaPrincipal1.png" alt = "Imagen del Tec" />

            <div className="TerceraSeccion">
                <div className="Titulo">
                    ¿Porque nosotros?
                </div> 

                <div className="Cajitas">
                    <CajaImagen ruta = "" txt = ""/>
                    <CajaImagen ruta = "" txt = ""/>
                    <CajaImagen ruta = "" txt = ""/>
                    <CajaImagen ruta = "" txt = ""/>
                    <CajaImagen ruta = "" txt = ""/>
                    <CajaImagen ruta = "" txt = ""/>
                </div>   
            </div>

            <div className="CuartaSeccion">
                <div>
                    <div className="Titulo">
                        Descubre la app
                    </div>
                    <div className="Subtitulo">
                        Bajala de la App Store y descrubre su potencial
                    </div>
                    <Boton texto = "Descarga aquí" clase = 'Botones'/>
                </div>

                <div>
                    <img src="" alt="Imagen IOS"/>
                </div>
            </div>

        </div>

    )
}

export default Pantallaprincipal