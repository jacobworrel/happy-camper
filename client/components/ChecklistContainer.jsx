import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from './Dropdown.jsx';
import Checklist from './Checklist.jsx';
import axios from 'axios';

export default class ChecklistContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: {
        Sleeping: [],
        Cooking: [],
        Shelter: [],
        Clothing: [],
        Miscellaneous: [],
        Food: []
      },
      selectedCategory: '',
      itemInput: ''
    }
  }

  componentDidMount() {
    this.getItems();
  }

  //APP COMPONENT EVENT HANDLERS

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleDropDownChange = (e) => {
    this.setState({selectedCategory: e.target.value})
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
    //make post request
    this.postItem();
  }

  removeItem = (index, category, id) => {
    //set state
    const categories = this.state.categories;
    this.setState({
      ...this.state,
      categories: { ...categories, [category]: [...categories[category].slice(0, index),
                                                ...categories[category].slice(index + 1)]
                                              }
    })
    //make delete request
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
        // const data = response.data;
        // const state = {};
        // const categories = Object.keys(data);
        // categories.forEach((category) => {
        //   //get stored item properties and add editing: false property to every item
        //   state[category] = data[category].map((item) => ({ ...item, editing: false }));
        // })
        // this.setState({ categories: state });
      });
  }

  postItem() {
    axios.post('/items', { category: this.state.selectedCategory, name: this.state.itemInput })
      .then(response => {
        //store id in variable
        const id = response.data.id;
        //check for invalid input
        if (!this.state.itemInput || !this.state.selectedCategory) {
          alert('please choose a category and/or enter an item');
          return;
        }
        //set state
        const categories = this.state.categories;
        const category = this.state.selectedCategory;
        const item = { name: this.state.itemInput, checked: false, editing: false, id: id  };
        this.setState({
          ...this.state,
          itemInput: '',
          categories: { ...categories, [category]: [...categories[category], item] }
        });
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
          <Dropdown handleDropDownChange={this.handleDropDownChange}/>
          <input className="search-bar" type="text" placeholder="item" name="itemInput" value={this.props.checklists.itemInput} onChange={this.handleChange} />
          <button type="submit">Add item</button>
        </form>
      </div>
      <div className='checklist-container'>
        {checklists}
      </div>
    </div>);
  }
}
