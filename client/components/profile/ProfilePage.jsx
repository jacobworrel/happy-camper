import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/profile/profileActionCreators';
import { Route, Redirect, Switch } from 'react-router-dom';

class ProfilePage extends React.Component {
  render() {
    console.log(this.props.match.url);
    return !this.props.auth.isAuthenticated
      ? <Redirect to='/login'/>
      : (
        <div>
          <h1>Profile Page</h1>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
