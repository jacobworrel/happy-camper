import React from 'react';


const Button = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.behavior}
      >{props.text}</button>
  )
}

export default Button;
