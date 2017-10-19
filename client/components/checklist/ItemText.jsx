import React from 'react';
import styles from './ItemText.css';

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
      <span className={styles.name} onClick={() => props.toggleEditing(props.index, props.category, props.item.editing)}>{props.item.name}</span>
    );
  }
}

export default ItemText;
