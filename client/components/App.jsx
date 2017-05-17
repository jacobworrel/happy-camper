import React, { Component } from 'react'
import { render } from 'react-dom'
import Checklist from './Checklist.jsx'
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      categories: {
        Sleeping: [],
        Cooking: [],
        Shelter: [],
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
        const miscellaneousItems = [];
        response.data.miscellaneousItems.forEach(obj => {
          miscellaneousItems.push(obj.item);
        });
        this.setState({ categories: {
                                    Sleeping: sleepingItems,
                                    Cooking: cookingItems,
                                    Shelter: shelterItems,
                                    Miscellaneous: miscellaneousItems
                                  }
                      });
      })
  }//end componentDidMount

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.categoryInput === '' || this.state.itemInput === '') {
      this.setState({showError: true});
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
    axios.delete('/items', { params: { item: item }});
  }

  render() {
    let checkLists = [];
    for (let prop in this.state.categories) {
      checkLists.push(<Checklist className='checklist' items={this.state.categories[prop]} category={prop} removeItem={this.removeItem} />);
    }
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Happy Camper</h1>
        <form action="/items" method="POST" >
           <input type="text" placeholder="category" name="category"  />
           <input type="text" placeholder="item" name="item" />
           <button type="submit">Add item</button>
         </form>
         <p style={{display: this.state.showError ? 'block' : 'none'}} className="error-msg">Please enter a category and item!</p>
        {checkLists}
      </div>);
  }
}

// onSubmit={this.handleSubmit}

//value={this.state.categoryInput}
// value={this.state.itemInput}

// categoryInput: '',
// itemInput: '',
// showError: false
