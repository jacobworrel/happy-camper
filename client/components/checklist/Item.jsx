import React from 'react';
import ItemText from './ItemText';
import Button from './../Button';

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
        handleKeyPress={props.handleKeyPress}
      />
      <Button
        className='delete-btn'
        behavior={() => props.removeItem(props.index, props.category, props.item.id)}
        text='delete'
      />
    </li>
 );
}

export default Item;
