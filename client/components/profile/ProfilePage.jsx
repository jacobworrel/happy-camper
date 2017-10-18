import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tripsActionCreators from '../../actions/trips/tripsActionCreators';
import { updateInput } from '../../actions/forms/formsActionCreators';
import { Redirect } from 'react-router-dom';
import Button from './../Button';
import TextInput from './../TextInput';

const actionCreators = {...tripsActionCreators, updateInput };

class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.getTrips(this.props.userId);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postTrip(this.props.tripInput, this.props.userId);
  }

  render() {
    const trips = this.props.trips.map((trip) => (
      <li>{trip.tripName}</li>
    ))
    return !this.props.isAuthenticated
      ? <Redirect to='/login'/>
      : (
        <div>
          <h1>Profile Page</h1>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              className='search-bar'
              type='text'
              placeholder='Trip Name'
              value={this.props.tripInput}
              behavior={(e) => this.props.updateInput('tripInput', e.target.value)}
            />

            <Button
              text='Add Trip'
              className='add-btn'
              type='submit'
            />
          </form>
          <h4>Upcoming Trips:</h4>
          <ul>
            {trips}
          </ul>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.userId,
    username: state.auth.username,
    trips: [...state.trips],
    tripInput: state.forms.tripInput
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
