import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from './Button';
import { logout } from './../actions/auth/authActionCreators';
import styles from './NavBar.css';
import logo from './../public/assets/logo.jpg';

const NavBar = props => (
  <div className={styles.container}>
    <NavLink to="/profile" className={styles.link}>
      <img src={logo} height={50} width={50} alt="Happy Camper Logo" />
    </NavLink>
    <Button handleClick={props.logout}>Logout</Button>
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
