import React from 'react';
import Item from './Item.jsx'

export default class Checklist extends React.Component {

  render() {
    let items = [];
    //console.log(this.props.items);
    for (let i = 0; i < this.props.items.length; i += 1) {
      console.log(this.props.items[i]);
      items.push(<Item item={this.props.items[i]} />)
    }
    return (
      <ul>
        <span>{this.props.category}</span>
        {items}
      </ul>
   );
  }
}
