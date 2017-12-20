import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as tripsActionCreators from '../actions/trips/tripsActionCreators';
import {
  updateInput,
  updateAutocompleteValue,
  getMatchingUsers,
} from '../actions/forms/formsActionCreators';
import Button from './../components/Button';
import TextInput from './../components/TextInput';
import Trip from './../components/profile/Trip';

class ProfilePage extends Component {
  componentDidMount() {
    // only fetch trips once userId comes back from server
    // without this check, userId will be an empty string and server will respond with index.html
    if (this.props.userId) {
      this.props.getTrips(this.props.userId);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { postTrip, tripInput, userId } = this.props;
    postTrip(tripInput, userId);
  };

  render() {
    const trips = this.props.trips.map(trip => (
      <Trip
        key={trip._id}
        tripName={trip.tripName}
        tripId={trip._id}
        users={trip.users}
        updateSelectedTrip={this.props.updateSelectedTrip}
        autocompleteItems={this.props.autocompleteItems}
        getMatchingUsers={this.props.getMatchingUsers}
        addParticipantAsync={this.props.addParticipantAsync}
        participantId={this.props.participantId}
        updateParticipantId={this.props.updateParticipantId}
      />
    ));
    return !this.props.isAuthenticated ? (
      <Redirect to="/login" />
    ) : (
      <div>
        <h1>Profile Page</h1>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            className="search-bar"
            type="text"
            placeholder="Trip Name"
            value={this.props.tripInput}
            handleChange={e => this.props.updateInput('tripInput', e.target.value)}
          />
          <Button type="submit">Add Trip</Button>
        </form>
        <h4>Upcoming Trips:</h4>
        <ul>{trips}</ul>
      </div>
    );
  }
}

const getTrips = (state) => Object.values(state.trips.byId);

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.userId,
    username: state.auth.username,
    trips: getTrips(state),
    tripInput: state.forms.tripInput,
    autocompleteItems: state.forms.autocompleteItems,
    participantId: state.trips.participantId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...tripsActionCreators,
    updateInput,
    updateAutocompleteValue,
    getMatchingUsers,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
