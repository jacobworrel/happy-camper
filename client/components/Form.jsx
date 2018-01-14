import React from 'react';
import styles from './Form.module.css';

const Form = props => (
  <div className={styles.formContainer}>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  </div>
);

export default Form;
