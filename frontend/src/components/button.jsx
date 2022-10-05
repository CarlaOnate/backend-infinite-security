import React from 'react';

const Button = (props) => {
  return <button type='submit' className={props.class}>{props.children}</button>
};

export default Button;
