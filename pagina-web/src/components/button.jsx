import React from 'react';

export const Button = (props) => {
  return <button type='submit' className={props.class}>{props.text}</button>
};
