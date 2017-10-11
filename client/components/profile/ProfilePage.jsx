import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/trips/tripsActionCreators';
import { Redirect } from 'react-router-dom';

class ProfilePage extends React.Component {

  componentDidMount() {
    this.props.getTrips(this.props.username);
  }

  render() {
    const trips = this.props.trips.map((trip) => (
      <li>{trip.name}</li>
    ))
    return !this.props.isAuthenticated
      ? <Redirect to='/login'/>
      : (
        <div>
          <h1>Profile Page</h1>
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
    username: state.auth.username,
    trips: [...state.trips]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
