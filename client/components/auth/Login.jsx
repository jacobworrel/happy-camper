import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth/authActionCreators.js';

class Login extends React.Component {

  //CHILD COMPONENT EVENT HANDLERS

  handleSubmit = (e) => {
    e.preventDefault();
    //make post request to server/db
    this.postItem();
  }

  //GET/POST/PATCH/DELETE REQUESTS

  // getItems() {
  //   axios.get('/items')
  //     .then((response) => {
  //       //populate redux store with data from server/db
  //       this.props.populateStore(response.data);
  //     });
  // }
  //
  // postItem() {
  //   axios.post('/items', { category: this.props.checklists.selectedCategory,
  //                          name: this.props.checklists.itemInput })
  //     .then(response => {
  //       //update redux store
  //       this.props.addItem(response.data.id);
  //     });
  // }
  //
  // patchItem(obj, id) {
  //   axios.patch('/items', obj, { params: { _id: id }})
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }
  //
  // deleteItem(id) {
  //   axios.delete('/items', { params: { _id: id }})
  //     .then(response => {
  //       console.log(response.data);
  //     });
  // }

  render() {
    return (
     <div>
      <div className='header'>
        <h1>Happy Camper</h1>
        <img src="./assets/logo.jpg" height="67.5" width="85" />
        <form className='add-form' onSubmit={this.handleSubmit}>
          <input
            className="search-bar"
            type="text"
            placeholder="username"
            value={this.props.username}
            onChange={(e) => this.props.updateUsername(e.target.value)} />
            <input
              className="search-bar"
              type="text"
              placeholder="password"
              value={this.props.password}
              onChange={(e) => this.props.updatePassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>);
  }
}

//makes state.checklists in redux store accessible as props at componenent level
//called whenever store is updated
function mapStateToProps(state) {
  return { ...state.auth };
}

//wraps actionCreators in dispatch() call and merges them into component's props
//action creators can be invoked at component level without needing to call dispatch()
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Login);
