import React from 'react';
import styles from './TextInput.css';

const TextInput = (props) => {
  return (
    <input
      className={styles.textInput}
      type='text'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange} />
  )
}

export default TextInput;
