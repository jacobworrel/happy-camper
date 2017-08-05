import React from 'react';

const Item = (props) => {
  const checked = props.item.checked;
  return (
    <li className='item'>
      <input type='checkbox' checked={checked} onChange={(e) => props.markAsChecked(props.index, props.category, props.item.id, e)}/>
      <span className='item-name' onClick={props.editItem}>{props.item.name}</span>
      <button className='delete-btn' onClick={() => props.removeItem(props.index, props.category, props.item.id)}>delete</button>
    </li>
 );
}

export default Item;
