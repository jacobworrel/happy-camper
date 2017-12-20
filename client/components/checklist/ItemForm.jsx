import React from 'react';
import Dropdown from './Dropdown';
import Button from './../Button';
import TextInput from './../TextInput';
import styles from './ItemForm.css';

const ItemForm = props => (
  <div className={styles.formContainer}>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Dropdown
        updateSelectedCategory={e =>
          props.updateSelectedCategory(
            'selectedChecklist',
            e.target.value,
          )
        }
        categories={[
          'Select Category',
          ...props.categories,
        ]}
      />
      <TextInput
        className={styles.textInput}
        placeholder="item"
        value={props.itemInput}
        handleChange={e =>
          props.updateInput('itemInput', e.target.value)
        }
      />
      <Button type="submit">Add item</Button>
    </form>
  </div>
);

export default ItemForm;
