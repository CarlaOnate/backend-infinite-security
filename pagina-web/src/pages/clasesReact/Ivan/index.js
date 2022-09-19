import React, { useState } from 'react';
import { German } from './german';

export const Ivan = () => {
  const [ listo, setListo ] = useState(true)
  const [ listo2, setListo2 ] = useState({
    id: {

    },
    nombre: {
      lentes: "rojos"
    }
  })

  const soyObj = {
    mochon: "CHI"
  }

  const cambiarListo = e => {
    /* const { target } = e;
    if (e.target.id == "botonhuevos") {
      target.text = "HUEVOSX2"
    } */

/*     const german = ["b", "b"]
    const nuevoArray = [...german]

    setListo2(prev => {
      return {
        ...prev, // para cambiar estado y no perder data
        nombre: {
          lentes: "verdes"
        }
      }
    })

    const a = () => {
      return "lol"
    }

    const b = () => ("lol") */

/*     setListo(false);
    setListo(!listo); */
    console.log("CAMBIAR LISTO")
    setListo(!listo);
    /* setListo(prev => !prev); */
  }

  console.log(listo)

  return (
    <div>
      <img />
      <p>{listo ? "CHUPAS" : "NO CHUPAS"}</p>
      {/* {listo && <p>CHUPAS</p>} */}
      {/* <button id="botonhuevos" onClick={cambiarListo}>HUEVOS</button> */}
      <German
        text={"HUEVOS"}
        butonChiquito={cambiarListo}
        setState={setListo}
        obj={soyObj}
      />
    </div>
  )
}



