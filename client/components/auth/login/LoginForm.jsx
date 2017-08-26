import React from 'react';
import TextFieldGroup from './../TextFieldGroup';

const LoginForm = (props) => {
  const fields = ['username', 'password'];
  const labels = ['Username', 'Password'];
  const textFieldGroups = fields.map((field, i) => {
    return <TextFieldGroup
            key={i}
            label={labels[i]}
            field={field}
            updateField={props.updateField}
            errors={props.errors}
            value={props[field]} />
  });
  return (
        <form className='add-form' onSubmit={props.handleSubmit}>
          {textFieldGroups}
          <button>Login</button>
          {props.errors.invalid && <span>{props.errors.invalid}</span>}
        </form>
  );
}

export default LoginForm;
