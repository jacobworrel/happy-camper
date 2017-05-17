import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Item extends React.Component {

  render() {
    return (
      <li>
        <input type="checkbox" />
        <span>{this.props.item}</span>
        <button onClick={() => this.props.removeItem(this.props.item, this.props.category)}>Delete</button>
      </li>
   );
  }
}
