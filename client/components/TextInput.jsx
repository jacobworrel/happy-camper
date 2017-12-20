import React from 'react';

const TextInput = (props) => {
  return (
    <input
      className={props.className}
      type='text'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange} />
  )
}

export default TextInput;
