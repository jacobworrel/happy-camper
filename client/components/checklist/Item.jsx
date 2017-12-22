import React from 'react';
import ItemText from './ItemText';
import Button from './../Button';
import styles from './Item.css';

const Item = props => {
  const { checked } = props.item;
  return (
    <li className={styles.item}>
      <div>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={checked}
          onChange={e =>
            props.markAsChecked(props.index, props.category, props.item.id, e)
          }
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
        <span> ({props.item.owner})</span>
      </div>
      <Button
        className="deleteBtn"
        handleClick={() =>
          props.removeItem(props.index, props.category, props.item.id)
        }
      >
        delete
      </Button>
    </li>
  );
};

export default Item;
