import React, { Component } from 'react'
import { render } from 'react-dom'
import Checklist from './Checklist.jsx'
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      categories: {
        Sleeping: [],
        Cooking: [],
        Shelter: [],
        Clothing: [],
        Miscellaneous: []
      }
    }
  }

//get data from server/db and store it in this.state
  componentDidMount() {
    axios.get('/items')
      .then((response) => {
        const sleepingItems = [];
        response.data.sleepingItems.forEach(obj => {
          sleepingItems.push(obj.item);
        });
        const cookingItems = [];
        response.data.cookingItems.forEach(obj => {
          cookingItems.push(obj.item);
        });
        const shelterItems = [];
        response.data.shelterItems.forEach(obj => {
          shelterItems.push(obj.item);
        });
        const clothingItems = [];
        response.data.clothingItems.forEach(obj => {
          clothingItems.push(obj.item);
        });
        const miscellaneousItems = [];
        response.data.miscellaneousItems.forEach(obj => {
          miscellaneousItems.push(obj.item);
        });
        this.setState({ categories: {
                                    Sleeping: sleepingItems,
                                    Cooking: cookingItems,
                                    Shelter: shelterItems,
                                    Clothing: clothingItems,
                                    Miscellaneous: miscellaneousItems
                                  },
                        categoryInput: '',
                        itemInput: '',
                        showError: false
                      });
      })
  }//end componentDidMount

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.showError);
    if (this.state.categoryInput === '' || this.state.itemInput === '') {
      this.setState({ showError: true });
    }
    else {
      const newArr = this.state.categories[this.state.categoryInput];
      newArr.push(this.state.itemInput);
      const newState = Object.assign({}, this.state);
      newState.categories[this.state.categoryInput] = newArr;
      newState.showError = false;
      console.log(newState);
      this.setState(newState);

      //post request to server/db
      axios.post('/items', { category: this.state.categoryInput, item: this.state.itemInput })
        .then(response => {
          console.log(response.data);
        });
    }
  }//end clickHandler

  removeItem(item, category) {
    let filtered = this.state.categories[category].filter(elem => {
      return elem !== item;
    });
    const newState = Object.assign({}, this.state);
    newState.categories[category] = filtered;
    this.setState(newState);

    //delete request to server/db
    axios.delete('/items', { params: { item: item }})
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    let checkLists = [];
    for (let prop in this.state.categories) {
      checkLists.push(<Checklist className='checklist' items={this.state.categories[prop]} category={prop} removeItem={this.removeItem} />);
    }
    return (
     <div>
      <div className='header'>
        <h1>Happy Camper</h1>
        <img src="https://img1.etsystatic.com/019/0/9202327/il_340x270.575075821_avr6.jpg" height="67.5" width="85"/>
        <form className='add-form' onSubmit={this.handleSubmit}>
           <input className="search-bar" type="text" placeholder="category" name="categoryInput" value={this.state.categoryInput} onChange={this.handleChange} />
           <input className="search-bar" type="text" placeholder="item" name="itemInput" value={this.state.itemInput} onChange={this.handleChange} />
           <button type="submit">Add item</button>
         </form>
         <p style={{ display: this.state.showError ? 'block' : 'none' }} className="error-msg">Please enter a valid category and item!</p>
        </div>
        <div className='checklist-container'>
          {checkLists}
        </div>
      </div>);
  }
}
