import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
  return (
        <form className='add-form' onSubmit={props.handleSubmit}>
          <input
            className="search-bar"
            type="text"
            placeholder="username"
            value={props.username}
            onChange={(e) => props.updateUsername(e.target.value)} />
          <input
            className="search-bar"
            type="text"
            placeholder="password"
            value={props.password}
            onChange={(e) => props.updatePassword(e.target.value)} />
          <button>{props.buttonText}</button>
          {/* <Link to="/checklist"></Link> */}
        </form>
  );
}

export default Form;
