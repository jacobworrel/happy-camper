import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Item extends React.Component {

  render() {
    return (
      <li className='item'>
        <input type="checkbox" />
        <span className='item-name'>{this.props.item}</span>
        <button className='delete-btn' onClick={() => this.props.removeItem(this.props.item, this.props.category)}>delete</button>
      </li>
   );
  }
}
