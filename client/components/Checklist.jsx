import React from 'react';
import Item from './Item.jsx'

const Checklist = (props) => {
  const items = props.items.map((item) => {
    return <Item item={item} removeItem={props.removeItem} category={props.category}/>
  });
  return (
    <ul>
      <h3>{props.category}:</h3>
      {items}
    </ul>
 );
}

export default Checklist;
