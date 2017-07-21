import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from './Dropdown.jsx';
import Checklist from './Checklist.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.markAsChecked = this.markAsChecked.bind(this);

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

//get request to server/db
  componentDidMount() {
    axios.get('/items')
      .then((response) => {
        console.log(response.data);
        const state = { ...response.data };
        this.setState({ categories: state });
      })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleDropDownChange(e) {
    this.setState({selectedCategory: e.target.value})
  }

  markAsChecked(item) {
    console.log('checked')
    // axios.put('/items', )
    //   .then((response) => {
    //
    //   });
  }

  handleSubmit(e) {
    e.preventDefault();
    const categories = this.state.categories;
    const category = this.state.selectedCategory;
    const item = { name: this.state.itemInput, checked: false };
    this.setState({ ...this.state,
                    categories: { ...categories, [category]: [...categories[category], item] }});

    //post request to server/db
    axios.post('/items', { category: this.state.selectedCategory, name: this.state.itemInput })
      .then(response => {
        console.log(response.data);
      });
  }

  removeItem(item, category) {
    let filtered = this.state.categories[category].filter(elem => {
      return elem !== item;
    });
    const newState = Object.assign({}, this.state);
    newState.categories[category] = filtered;
    this.setState(newState);

    //delete request to server/db
    axios.delete('/items', { params: { name: item }})
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    const checkLists = [];
    for (let key in this.state.categories) {
      checkLists.push(<Checklist
                        className='checklist'
                        items={this.state.categories[key]}
                        category={key}
                        removeItem={this.removeItem}
                        markAsChecked={this.markAsChecked}
                      />);
    }
    return (
     <div>
      <div className='header'>
        <h1>Happy Camper</h1>
        <img src="./assets/logo.jpg" height="67.5" width="85" />
        <form className='add-form' onSubmit={this.handleSubmit}>
          <Dropdown handleDropDownChange={this.handleDropDownChange}/>
          <input className="search-bar" type="text" placeholder="item" name="itemInput" value={this.state.itemInput} onChange={this.handleChange} />
          <button type="submit">Add item</button>
        </form>
      </div>
      <div className='checklist-container'>
        {checkLists}
      </div>
    </div>);
  }
}
