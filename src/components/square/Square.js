import React from 'react';
import './Square.css';

export const Square = (props) => {
  return (
    <button className={"square " + props.value} onClick={props.onClick} id={"" + props.x + props.y}>
      {props.value}
    </button>
  );
}