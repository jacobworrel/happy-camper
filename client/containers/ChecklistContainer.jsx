import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dropdown from './../components/checklist/Dropdown';
import Checklist from './../components/checklist/Checklist';
import Button from './../components/Button';
import TextInput from './../components/TextInput';

import {
  addItem,
  getChecklistData,
  postItem,
  removeItem,
  toggleChecked,
  toggleEditing,
  updateItemName,
} from '../actions/checklist/checklistActionCreators';

import {
  clearInput,
  updateInput,
  updateSelectedCategory,
} from '../actions/forms/formsActionCreators';

import styles from './ChecklistContainer.css';

class ChecklistContainer extends Component {
  componentDidMount() {
    // get data from server/db and populate redux store
    if (this.props.selectedTrip) this.props.getChecklistData(this.props.selectedTrip);
  }

  // CHILD COMPONENT EVENT HANDLERS
  // Item Event Handlers

  markAsChecked = (index, category, id, e) => {
    // update redux store
    this.props.toggleChecked(index, category, e.target.checked);
    // make patch request
    const checkedStatus = e.target.checked
      ? { checked: true }
      : { checked: false };
    this.patchItem(checkedStatus, id);
  };

  handleSubmit = e => {
    e.preventDefault();
    // update redux store and make post request to server/db
    const {
      selectedChecklist,
      selectedTrip,
      itemInput,
      userId,
      username,
    } = this.props;
    this.props.postItem(
      selectedTrip,
      selectedChecklist,
      itemInput,
      userId,
      username,
    );
    this.props.clearInput('itemInput');
  };

  removeItem = (index, category, id) => {
    // update redux store
    this.props.removeItem(index, category);
    // make delete request to server/db
    this.deleteItem(id);
  };

  // ItemText Event Handlers

  handleKeyPress = (index, category, editing, id, e) => {
    if (e.key === 'Enter') {
      this.changeItemName(index, category, editing, id, e);
    }
  };

  handleBlur = (index, category, editing, id, e) => {
    if (!e.target.value) {
      alert('please enter an item');
      return;
    }
    this.changeItemName(index, category, editing, id, e);
  };

  // helper function invoked in handleBlur() and handleKeyPress()
  changeItemName(index, category, editing, id, e) {
    // update redux store
    this.props.updateItemName(index, category, editing, e.target.value);
    // make patch request to server/db
    this.patchItem({ name: e.target.value }, id);
  }

  // PATCH/DELETE REQUESTS

  patchItem(payload, id) {
    axios.patch('/items', payload, { params: { _id: id } }).then(response => {
      console.log(response.data);
    });
  }

  deleteItem(_id) {
    const { selectedTrip } = this.props;
    axios.delete('/items', { data: { _id, selectedTrip } }).then(response => {
      console.log(response.data);
    });
  }

  render() {
    const checklists = Object.keys(this.props.checklists).map((category, i) => (
      <Checklist
        key={i}
        className="checklist"
        items={this.props.checklists[category]}
        category={category}
        removeItem={this.removeItem}
        markAsChecked={this.markAsChecked}
        toggleEditing={this.props.toggleEditing}
        handleBlur={this.handleBlur}
        handleKeyPress={this.handleKeyPress}
      />
      ));

    return !this.props.isAuthenticated ? (
      <Redirect to="/login" />
    ) : (
      <div>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <Dropdown
              updateSelectedCategory={e =>
                this.props.updateSelectedCategory(
                  'selectedChecklist',
                  e.target.value,
                )
              }
              categories={[
                'Select Category',
                ...this.props.categories,
              ]}
            />
            <TextInput
              className={styles.textInput}
              placeholder="item"
              value={this.props.itemInput}
              behavior={e =>
                this.props.updateInput('itemInput', e.target.value)
              }
            />
            <Button type="submit">Add item</Button>
          </form>
        </div>
        <div className={styles.container}>{checklists}</div>
      </div>
    );
  }
}

const getCategories = (state) => Object.keys(state.checklists);

// makes state.checklists in redux store accessible as props at componenent level
// called whenever store is updated
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    checklists: state.checklists,
    categories: getCategories(state),
    itemInput: state.forms.itemInput,
    selectedChecklist: state.forms.selectedChecklist,
    userId: state.auth.userId,
    username: state.auth.username,
    selectedTrip: state.trips.selectedTrip,
  };
}

// wraps actionCreators in dispatch() call and merges them into component's props
// action creators can be invoked at component level without needing to call dispatch()
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addItem,
    getChecklistData,
    postItem,
    removeItem,
    toggleChecked,
    toggleEditing,
    updateItemName,
    clearInput,
    updateInput,
    updateSelectedCategory,
  }, dispatch);
}

// connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ChecklistContainer);
