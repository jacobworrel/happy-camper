import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div className='nav-container'>
      <NavLink to='/profile' className='nav-link'><img src="./assets/logo.jpg" height="67.5" width="85" /></NavLink>
      <NavLink to={'/profile/checklist'} className='nav-link'>Checklists</NavLink>
      <NavLink to='/map' className='nav-link'>Map</NavLink>
      <NavLink to='/itinerary' className='nav-link'>Itinerary</NavLink>
    </div>
  )
}

export default NavBar;
