import React from 'react';
import { Link } from 'react-router-dom';

const TextFieldGroup = (props) => {
  const { field } = props;
  const { errors } = props;
  let autofocus = false;
  let type = 'text';
  if (field === 'username') autofocus = true;
  if (field === 'password') type = 'password';
  return (
    <div>
      <label>{props.label}</label>
      <input
        autoFocus={autofocus}
        className="search-bar"
        type={type}
        name={field}
        value={props.value}
        onChange={(e) => props.updateField(e.target.name, e.target.value)} />
      {errors[field] && <span className="error">{errors[field]}</span>}
    </div>
  );
}

export default TextFieldGroup;
