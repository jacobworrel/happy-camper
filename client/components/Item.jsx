import React from 'react';

const Item = (props) => {
  return (
    <li className='item'>
      <input type="checkbox" onChange={() => props.markAsChecked(props.id)}/>
      <span className='item-name'>{props.item}</span>
      <button className='delete-btn' onClick={() => props.removeItem(props.index, props.category, props.id)}>delete</button>
    </li>
 );
}

export default Item;
