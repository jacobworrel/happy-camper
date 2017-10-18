import React from 'react';

const TextInput = (props) => {
  return (
    <input
      className={props.className}
      type='text'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.behavior} />
  )
}

export default TextInput;
