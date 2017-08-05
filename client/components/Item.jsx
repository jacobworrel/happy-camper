import React from 'react';
import ItemText from './ItemText.jsx';

const Item = (props) => {
  const checked = props.item.checked;
  return (
    <li className='item'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => props.markAsChecked(props.index, props.category, props.item.id, e)}
      />
      <ItemText
        item={props.item}
        index={props.index}
        category={props.category}
        editing={props.editing}
        toggleEditing={props.toggleEditing}
        handleBlur={props.handleBlur}
      />
      <button
        className='delete-btn'
        onClick={() => props.removeItem(props.index, props.category, props.item.id)}>delete</button>
    </li>
 );
}

export default Item;
