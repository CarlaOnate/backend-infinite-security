import React from "react";

const ImageBox = (props) =>{
  return(
    <div className="imageBox">
      <img className="imageBox__image" src = {props.path} alt = "Images Box"/>
      <p className="imageBox__text">{props.text}</p>
    </div>
  );
};

export default ImageBox;