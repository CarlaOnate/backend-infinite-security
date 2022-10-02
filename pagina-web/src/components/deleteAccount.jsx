import React from "react";
import Button from './Button.jsx';

export const DeleteAccount = () =>{
  return(
    <div className="deleteAccount">
      <h1 className="deleteAccount__tittle"> Borrar una cuenta </h1>
      <h2 className="deleteAccount__text"> ¿Estás seguro de eliminar esta cuenta? </h2>
      <div className="deleteAccount__buttonsContainer">
        <Button texto = "Borrar cuenta" clase = 'standarButton'/>
        <Button texto = "Cancelar" clase = 'warningButton'/>
      </div>
    </div>
  );
};
