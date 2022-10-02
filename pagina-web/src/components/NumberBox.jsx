import React from "react";

const NumberBox = (props) =>{
  return(
    <div className="imageBox">
      <div className="imageBox__number">
        {props.number}
      </div>
      <div className="imageBox__text">
        {props.text}
      </div>
    </div>
  );
};

export default NumberBox;