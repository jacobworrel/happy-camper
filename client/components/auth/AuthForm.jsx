import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import Button from './../Button';
import styles from './AuthForm.css';

const AuthForm = props => {
  const { fields } = props;
  const { labels } = props;
  const textFieldGroups = fields.map((field, i) => (
    <TextFieldGroup
      key={i}
      label={labels[i]}
      field={field}
      updateField={props.updateField}
      errors={props.errors}
      value={props[field]}
    />
  ));
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      {textFieldGroups}
      <Button type="submit" className="loginBtn" isLoading={props.isLoading}>{props.buttonText}</Button>
    </form>
  );
};

export default AuthForm;
