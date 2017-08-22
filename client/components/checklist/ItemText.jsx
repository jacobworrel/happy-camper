import React from 'react';

const ItemText = (props) => {
  if (props.item.editing) {
    return (
        <input
          type='text'
          name='editInput'
          autoFocus
          onKeyPress={(e) => props.handleKeyPress(props.index, props.category, props.item.editing, props.item.id, e)}
          onBlur={(e) => props.handleBlur(props.index, props.category, props.item.editing, props.item.id, e)}>
        </input>
    );
  }
  else {
    return (
      <span className='item-name' onClick={() => props.toggleEditing(props.index, props.category, props.item.editing)}>{props.item.name}</span>
    );
  }
}

export default ItemText;
