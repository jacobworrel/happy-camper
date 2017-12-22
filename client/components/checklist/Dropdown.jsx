import React from 'react';
import styles from './Dropdown.css';

const Dropdown = props => {
  const options = props.categories.map((category, i) => (
    <option className={styles.dropdown} key={i} value={category}>
      {category}
    </option>
    ));
  return (
    <select
      className={styles.dropdown}
      name="categories"
      onChange={props.updateSelectedCategory}
    >
      {options}
    </select>
  );
};

export default Dropdown;
