import React from "react";

const ImageBox = (props) =>{
  return(
    <div className="imageBox">
      <img className="imageBox__image" src = {props.ruta} alt = "Images Box"/>
      <p className="imageBox__text">{props.txt}</p>
    </div>
  );
};

export default ImageBox;