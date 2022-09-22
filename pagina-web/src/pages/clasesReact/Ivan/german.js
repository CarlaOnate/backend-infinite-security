import React from 'react';

/* export const German = props => {
  const { butonChiquito } = props;

  return (
    <button onClick={butonChiquito}>
      HUEVOS
    </button>
  )
} */

export const German = props => {
  const { butonChiquito, text } = props;

  return (
    <button onClick={butonChiquito} className="radio">
      {text}
    </button>
  )
}




