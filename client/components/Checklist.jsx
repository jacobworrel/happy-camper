import React from 'react';
import Item from './Item.jsx'

const Checklist = (props) => {
  const items = props.items.map((item, i) => {
    return <Item
              key={item.id}
              id={item.id}
              index={i}
              item={item.name}
              removeItem={props.removeItem}
              markAsChecked={props.markAsChecked}
              category={props.category}
            />
  });
  return (
    <ul>
      <h3>{props.category}:</h3>
      {items}
    </ul>
 );
}

export default Checklist;
