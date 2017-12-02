import React from 'react';
import TextFieldGroup from './../TextFieldGroup';

const SignupForm = (props) => {
  const fields = ['username', 'email', 'password', 'passwordConfirmation'];
  const labels = ['Username', 'Email', 'Password', 'Password Confirmation'];
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
    <form className="add-form" onSubmit={props.handleSubmit}>
      {textFieldGroups}
      <button disabled={props.isLoading}>Sign Up</button>
    </form>
  );
};

export default SignupForm;
