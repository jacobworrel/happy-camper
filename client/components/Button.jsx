import React from 'react';
import styles from './Button.css';

const Button = props => (
  <button
    type={props.type}
    className={props.className ? styles[props.className] : styles.btn}
    onClick={props.handleClick}
  >
    {props.children}
  </button>
  );

export default Button;
