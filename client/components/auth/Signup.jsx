import React from 'react';

const Signup = (props) => {
  return (
   <div>
    <div className='header'>
      <h1>Signup</h1>
      <img src="./assets/logo.jpg" height="67.5" width="85" />
      <form className='add-form' onSubmit={this.handleSubmit}>
        <input
          className="search-bar"
          type="text"
          placeholder="username"
          value={this.props.username}
          onChange={(e) => this.props.updateUsername(e.target.value)} />
          <input
            className="search-bar"
            type="text"
            placeholder="password"
            value={this.props.password}
            onChange={(e) => this.props.updatePassword(e.target.value)} />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Item;
