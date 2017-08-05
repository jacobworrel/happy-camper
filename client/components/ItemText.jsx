import React from 'react';

const ItemText = (props) => {
  if (props.item.editing) {
    return (
      <input type='text' name='editInput' autoFocus onBlur={(e) => props.handleBlur(props.index, props.category, props.item.editing, e)}></input>
    );
  }
  else {
    return (
      <span className='item-name' onClick={() => props.toggleEditing(props.index, props.category, props.item.editing)}>{props.item.name}</span>
    );
  }
}

export default ItemText;
