import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from './Dropdown.jsx';
import Checklist from './Checklist.jsx';
import axios from 'axios';

export default class ChecklistContainer extends React.Component {

  componentDidMount() {
    this.getItems();
  }

  //CHILD COMPONENT EVENT HANDLERS
  //Item Event Handlers

  markAsChecked = (index, category, id, e) => {
    //update redux store
    this.props.toggleChecked(index, category, e.target.checked);
    //make patch request
    const obj = e.target.checked ? { checked: true } : { checked: false };
    this.patchItem(obj, id);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //make post request to server/db
    this.postItem();
  }

  removeItem = (index, category, id) => {
    //update redux store
    this.props.removeItem(index, category);
    //make delete request to server/db
    this.deleteItem(id);
  }

  //ItemText Event Handlers

  handleKeyPress = (index, category, editing, id, e) => {
    if (e.key === 'Enter') {
      this.changeItemName(index, category, editing, id, e);
    }
  }

  handleBlur = (index, category, editing, id, e) => {
    if (!e.target.value) {
      alert('please enter an item');
      return;
    }
    this.changeItemName(index, category, editing, id, e);
  }

  //helper function invoked in handleBlur() and handleKeyPress()
  changeItemName(index, category, editing, id, e) {
    //update redux store
    this.props.updateItemName(index, category, editing, e.target.value);
    //make patch request to server/db
    this.patchItem({ name: e.target.value }, id);
  }

  //GET/POST/PATCH/DELETE REQUESTS

  getItems() {
    axios.get('/items')
      .then((response) => {
        //populate redux store with data from server/db
        this.props.populateStore(response.data);
      });
  }

  postItem() {
    axios.post('/items', { category: this.props.checklists.selectedCategory,
                           name: this.props.checklists.itemInput })
      .then(response => {
        //update redux store
        this.props.addItem(response.data.id);
      });
  }

  patchItem(obj, id) {
    axios.patch('/items', obj, { params: { _id: id }})
      .then((response) => {
        console.log(response.data);
      });
  }

  deleteItem(id) {
    axios.delete('/items', { params: { _id: id }})
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    const checklists = Object.keys(this.props.checklists.categories).map((category, i) => {
      return <Checklist
                        key={i}
                        className='checklist'
                        items={this.props.checklists.categories[category]}
                        category={category}
                        removeItem={this.removeItem}
                        markAsChecked={this.markAsChecked}
                        toggleEditing={this.props.toggleEditing}
                        handleBlur={this.handleBlur}
                        handleKeyPress={this.handleKeyPress}
                      />
    });
    return (
     <div>
      <div className='header'>
        <h1>Happy Camper</h1>
        <img src="./assets/logo.jpg" height="67.5" width="85" />
        <form className='add-form' onSubmit={this.handleSubmit}>
          <Dropdown updateSelectedCategory={(e) => this.props.updateSelectedCategory(e.target.value)}/>
          <input
            className="search-bar"
            type="text"
            placeholder="item"
            value={this.props.checklists.itemInput}
            onChange={(e) => this.props.updateInput(e.target.value)} />
          <button type="submit">Add item</button>
        </form>
      </div>
      <div className='checklist-container'>
        {checklists}
      </div>
    </div>);
  }
}
