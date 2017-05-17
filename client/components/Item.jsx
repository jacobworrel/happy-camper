import React from 'react';

export default class Item extends React.Component {

  render() {
    return (
      <li>
        <input type="checkbox" />
        <span>{this.props.item}</span>
      </li>
   );
  }
}
