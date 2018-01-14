import React from 'react';
import styles from './Button.module.css';

const Button = props => (
  <button
    type={props.type}
    className={props.className ? styles[props.className] : styles.btn}
    onClick={props.handleClick}
    disabled={props.isLoading}
  >
    {props.children}
  </button>
  );

export default Button;
