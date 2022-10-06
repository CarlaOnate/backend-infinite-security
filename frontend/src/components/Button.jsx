import React from 'react';

const Button = (props) => {
  return <button type='submit' className={props.clase}>{props.texto}</button>
};

export default Button;
