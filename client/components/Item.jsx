import React from 'react';

const Item = (props) => {
  return (
    <li className='item'>
      <input type="checkbox" />
      <span className='item-name'>{props.item}</span>
      <button className='delete-btn' onClick={() => props.removeItem(props.item, props.category)}>delete</button>
    </li>
 );
}

export default Item;
