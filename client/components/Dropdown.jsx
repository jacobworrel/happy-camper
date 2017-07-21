import React from 'react';

const Dropdown = (props) => {
  return (
    <select name="days" onChange={props.handleDropDownChange}>
      <option value="Select Day">Select Category</option>
      <option value="Sleeping">Sleeping</option>
      <option value="Cooking">Cooking</option>
      <option value="Shelter">Shelter</option>
      <option value="Clothing">Clothing</option>
      <option value="Miscellaneous">Miscellaneous</option>
      <option value="Food">Food</option>
    </select>
 );
}

export default Dropdown;
