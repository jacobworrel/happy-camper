import React from 'react';

const Dropdown = (props) => {
  const options = props.categories.map((category, i) => {
    return <option key={i} value={category}>{category}</option>
  });
  return (
    <select name="categories" onChange={props.updateSelectedCategory}>
      {options}
    </select>
 );
}

export default Dropdown;
