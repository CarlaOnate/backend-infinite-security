import React, { useState } from "react";
import './pepo.css'

const Pepo = ({ edad }) => {
  const [ estado, setEstado ] = useState('pepo');

  const [ estado2, setEstado2 ] = useState({ nombre: 'nombre' });

  const setNombre = (a) => setEstado('ivan');
  const a = estado == 'pepo' ? 'si' : 'no';

  const rederearLolaxo = () => <p>LOLAXO</p>
  const rederear2 = () => <p> 2</p>

  return (
    <>
      <div className="rojito" onClick={() => setNombre('a')}>
        <p>{estado}</p>
        {estado == 'pepo' ? rederearLolaxo() : rederear2()}
      </div>
    </>
  )
}

export default Pepo;
