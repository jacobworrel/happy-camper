import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocompleteValue: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tripId, participantId } = this.props;
    this.props.addParticipantAsync(tripId, participantId)
  }

  render() {
    const users = this.props.users.map(user => <li key={user._id}>{user.username}</li>);
    return (
      <li>
        <div>
          <h4>{this.props.tripName}</h4>
          <Link
            to="/profile/checklist"
            onClick={() => this.props.updateSelectedTrip(this.props.tripId)}>
            Checklist
          </Link>
          <form onSubmit={this.handleSubmit}>
            <Autocomplete
              getItemValue={(item) => item.label}
              items={this.props.autocompleteItems}
              value={this.state.autocompleteValue}
              renderItem={(item, isHighlighted) => (
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.label}
                </div>
              )}
              onChange={(e) => {
                if (e.target.value) this.props.getMatchingUsers(e.target.value);
                this.setState({ autocompleteValue: e.target.value });
              }}
              onSelect={(value, item) => {
                this.setState({ autocompleteValue: value });
                this.props.updateParticipantId(item.id);
              }}
            />
            <button>Add participant</button>
          </form>
          <p>Participants:</p>
          <ul>
            {users}
          </ul>
        </div>
      </li>
    );
  }
}

export default Trip;
