import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.css';

const NavBar = (props) => {
  return (
    <div className={styles.container}>
      <NavLink to='/profile' className={styles.link}>Profile</NavLink>
      <NavLink to={'/profile/checklist'} className={styles.link}>Checklists</NavLink>
      <NavLink to='/profile/map' className={styles.link}>Map</NavLink>
      <NavLink to='/profile/itinerary' className={styles.link}>Itinerary</NavLink>
    </div>
  )
}

export default NavBar;
