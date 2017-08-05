import React from 'react';

const ItemText = (props) => {
  if (props.editing) {
    return (
      <input type='text' className='hidden' name='editInput'></input>
    );
  }
  else {
    return (
      <span className='item-name' onClick={props.editItem}>{props.item.name}</span>
    );
  }
}

export default Item;
