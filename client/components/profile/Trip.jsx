import React from 'react';
import { Link } from 'react-router-dom';

const Trip = (props) => {
  const users = props.users.map(user => <li>{user}</li>);
  return (
    <li>
      <div>
        <h4>{props.tripName}</h4>
        <Link to="/profile/checklist" onClick={() => props.updateSelectedTrip(props.tripId)}>Checklist</Link>
        <p>Participants:</p>
        <form>
          <input type="text" placeholder="Search username"/>
          <button>Add participant</button>
        </form>
        <ul>
          {users}
        </ul>
      </div>
    </li>
  );
};

export default Trip;
