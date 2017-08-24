import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = (props) => {
  return (
        <form className='add-form' onSubmit={props.handleSubmit}>
          <label>Username</label>
          <input
            className="search-bar"
            type="text"
            placeholder="username"
            name="username"
            value={props.username}
            onChange={(e) => props.updateField(e.target.name, e.target.value)} />
          <label>Email</label>
          <input
            className="search-bar"
            type="text"
            placeholder="email"
            name="email"
            value={props.email}
            onChange={(e) => props.updateField(e.target.name, e.target.value)} />
          <label>Password</label>
          <input
            className="search-bar"
            type="text"
            placeholder="password"
            name="password"
            value={props.password}
            onChange={(e) => props.updateField(e.target.name, e.target.value)} />
          <label>Password Confirmation</label>
          <input
            className="search-bar"
            type="text"
            placeholder="password"
            name="passwordConfirmation"
            value={props.passwordConfirmation}
            onChange={(e) => props.updateField(e.target.name, e.target.value)} />
          <button>{props.buttonText}</button>
          {/* <Link to="/checklist"></Link> */}
        </form>
  );
}

export default SignupForm;
