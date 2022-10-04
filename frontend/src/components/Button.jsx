import React from 'react';

const Button = (props) => {
  return <button type='submit' className={props.class}>{props.text}</button>
};

export default Button;
