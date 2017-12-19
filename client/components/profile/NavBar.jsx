import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from './../Button';
import { logout } from './../../actions/auth/authActionCreators';
import styles from './NavBar.css';

const NavBar = props => (
  <div className={styles.container}>
    <NavLink to="/profile" className={styles.link}>
      Profile
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
