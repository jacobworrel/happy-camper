import React from 'react';
import styles from './TextFieldGroup.css';

const TextFieldGroup = (props) => {
  const { field } = props;
  const { errors } = props;
  let autofocus = false;
  let type = 'text';
  if (field === 'username') autofocus = true;
  if (field === 'password' || field === 'passwordConfirmation') type = 'password';
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input
        autoFocus={autofocus}
        className={styles.input}
        type={type}
        name={field}
        value={props.value}
        onChange={(e) => props.updateField(e.target.name, e.target.value)} />
      {errors && errors[field] && <span className={styles.error}>{errors[field]}</span>}
    </div>
  );
}

export default TextFieldGroup;
