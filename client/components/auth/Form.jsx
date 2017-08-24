import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
  return (
        <form className='add-form' onSubmit={props.handleSubmit}>
          <input
            className="search-bar"
            type="text"
            placeholder="username"
            name="username"
            value={props.username}
            onChange={(e) => props.updateField(e.target.name, e.target.value)} />
          <input
            className="search-bar"
            type="text"
            placeholder="password"
            name="password"
            value={props.password}
            onChange={(e) => props.updateField(e.target.name, e.target.value)} />
          <button>{props.buttonText}</button>
          {/* <Link to="/checklist"></Link> */}
        </form>
  );
}

export default Form;
