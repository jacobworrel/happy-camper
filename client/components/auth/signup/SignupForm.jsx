import React from 'react';
// import { Link } from 'react-router-dom';
import TextFieldGroup from './TextFieldGroup';

const SignupForm = (props) => {
  const fields = ['username', 'email', 'password', 'passwordConfirmation'];
  const labels = ['Username', 'Email', 'Password', 'Password Confirmation'];
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
          <button disabled={props.isLoading}>{props.buttonText}</button>
          {/* <Link to="/checklist"></Link> */}
        </form>
  );
}

export default SignupForm;
