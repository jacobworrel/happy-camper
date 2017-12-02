import React from 'react';
import { Link } from 'react-router-dom';

const Trip = props => (
  <li>
    <span>{props.tripName} | </span>
    <span onClick={() => props.updateSelectedTrip(props.tripId)}>
      <Link to="/profile/checklist">Checklist</Link>
    </span>
  </li>
);

export default Trip;
