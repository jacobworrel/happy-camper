import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from './Dropdown.jsx';
import Checklist from './Checklist.jsx';
import axios from 'axios';

export default class ChecklistContainer extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   categories: {
    //     Sleeping: [],
    //     Cooking: [],
    //     Shelter: [],
    //     Clothing: [],
    //     Miscellaneous: [],
    //     Food: []
    //   },
    //   selectedCategory: '',
    //   itemInput: ''
    // }
  }

  componentDidMount() {
    this.getItems();
  }

  //CHILD COMPONENT EVENT HANDLERS

  //Item Event Handlers

  markAsChecked = (index, category, id, e) => {
    //set state
    const categories = this.state.categories;
    this.setState({
      ...this.state,
      categories: { ...categories,
                    [category]: [...categories[category].slice(0, index),
                                 { ... categories[category][index], checked: e.target.checked },
                                 ...categories[category].slice(index + 1)]
                  }
    })
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

  toggleEditing = (index, category, editing) => {
    const categories = this.state.categories;
    this.setState({
      ...this.state,
      categories: { ...categories,
                    [category]: [...categories[category].slice(0, index),
                                 { ... categories[category][index], editing: !editing },
                                 ...categories[category].slice(index + 1)]
                  }
    })
  }

  //helper function invoked in handleBlur() and handleKeyPress()
  changeItemName(index, category, editing, id, e) {
    const categories = this.state.categories;
    this.setState({
      ...this.state,
      categories: { ...categories,
                    [category]: [...categories[category].slice(0, index),
                                 { ... categories[category][index], name: e.target.value, editing: !editing },
                                 ...categories[category].slice(index + 1)]
                  }
    });
    this.patchItem({ name: e.target.value }, id);
  }

  //GET/POST/PATCH/DELETE REQUESTS

  getItems() {
    axios.get('/items')
      .then((response) => {
        this.props.populateStore(response.data);
      });
  }

  postItem() {
    axios.post('/items', { category: this.props.checklists.selectedCategory, name: this.props.checklists.itemInput })
      .then(response => {
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
                        toggleEditing={this.toggleEditing}
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
