import React from 'react';
import Item from './Item.jsx'

export default class Checklist extends React.Component {

  render() {
    let items = [];
    for (let i = 0; i < this.props.items.length; i += 1) {
      items.push(<Item item={this.props.items[i]} removeItem={this.props.removeItem} category={this.props.category}/>)
    }
    return (
      <ul>
        <h3>{this.props.category}:</h3>
        {items}
      </ul>
   );
  }
}
