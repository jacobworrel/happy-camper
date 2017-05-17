import React, { Component } from 'react'
import { render } from 'react-dom'
import Checklist from './Checklist.jsx'
import $ from 'jquery';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: {
        Sleeping: [],
        Cooking: [],
        Shelter: []
      }
    }
  }

//get data from server/db and store it in this.state
  componentDidMount() {
    $.ajax({
      url: '/items',
      type: 'GET',
      success: function(data) {
        const sleepingItems = [];
        data.sleepingItems.forEach(obj => {
          sleepingItems.push(obj.item);
        });
        const cookingItems = [];
        data.cookingItems.forEach(obj => {
          cookingItems.push(obj.item);
        });
        const shelterItems = [];
        data.shelterItems.forEach(obj => {
          shelterItems.push(obj.item);
        });
        this.setState({ categories: {
                                    Sleeping: sleepingItems,
                                    Cooking: cookingItems,
                                    Shelter: shelterItems
                                    }
                      });
        }.bind(this)
    });//end $.ajax
  }//end componentDidMount

  render() {
    let checkLists = [];
    for (let prop in this.state.categories) {
      //console.log(this.state.categories[prop])
      checkLists.push(<Checklist className='checklist' items={this.state.categories[prop]} category={prop}/>);
    }
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Happy Camper</h1>
        <form action="/items" method="POST">
           <input type="text" placeholder="category" name="category" />
           <input type="text" placeholder="item" name="item" />
           <button type="submit">Add item</button>
         </form>
        {checkLists}
      </div>);
  }
}
