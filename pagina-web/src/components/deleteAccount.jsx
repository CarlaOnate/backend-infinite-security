import React from "react";
import Button from './Button.jsx';

const deleteAccount = () =>{
  return(
      <div className="deleteAccount">
        <h1 className="deleteAccount__tittle"> Borrar una cuenta </h1>
        <h2 className="deleteAccount__content"> ¿Estás seguro de eliminar esta cuenta? </h2>
        <div className="deleteAccount__button">
          <Button texto = "Borrar cuenta" clase = 'deleteAccount__button--confirm'/>
          <Button texto = "Cancelar" clase = 'deleteAccount__button--cancel'/>
        </div>
      </div>
    )
}

export default deleteAccount;