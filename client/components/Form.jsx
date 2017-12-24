import React from 'react';
import styles from './Form.css';

const Form = props => (
  <div className={styles.formContainer}>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  </div>
);

export default Form;
