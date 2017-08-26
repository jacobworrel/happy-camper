import React from 'react';
import { Link } from 'react-router-dom';

const TextFieldGroup = (props) => {
  const { field } = props;
  const { errors } = props;
  return (
    <div>
      <label>{props.label}</label>
      <input
        className="search-bar"
        type="text"
        name={field}
        value={props.value}
        onChange={(e) => props.updateField(e.target.name, e.target.value)} />
      {errors[field] && <span className="error">{errors[field]}</span>}
    </div>
  );
}

export default TextFieldGroup;
