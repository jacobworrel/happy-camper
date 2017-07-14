import React from 'react';
import Item from './Item.jsx'

const Checklist = (props) => {
  const items = [];
  for (let i = 0; i < props.items.length; i += 1) {
    items.push(<Item item={props.items[i]} removeItem={props.removeItem} category={props.category}/>)
  }
  return (
    <ul>
      <h3>{props.category}:</h3>
      {items}
    </ul>
 );
}

export default Checklist;
