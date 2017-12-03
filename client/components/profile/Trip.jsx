import React from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';

const Trip = (props) => {
  const users = props.users.map(user => <li>{user}</li>);
  return (
    <li>
      <div>
        <h4>{props.tripName}</h4>
        <Link
          to="/profile/checklist"
          onClick={() => props.updateSelectedTrip(props.tripId)}>
          Checklist
        </Link>
        <p>Participants:</p>
        <form>
          <Autocomplete
            getItemValue={(item) => item.label}
            items={props.autocompleteItems}
            value={props.autocompleteValue}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
              </div>
            }
            onChange={(e) => {
              props.getMatchingUsers(e.target.value);
              props.updateAutocompleteValue(e.target.value);
            }}
            onSelect={value => updateAutocompleteValue(value)}
          />
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
