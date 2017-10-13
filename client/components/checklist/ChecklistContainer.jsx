import React, { Component } from 'react';
import { render } from 'react-dom';
import Dropdown from './Dropdown';
import Checklist from './Checklist';
import Button from './../Button';
import TextInput from './../TextInput';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as checklistActionCreators from '../../actions/checklist/checklistActionCreators';
import * as formsActionCreators from '../../actions/forms/formsActionCreators';

const actionCreators = {...checklistActionCreators, ...formsActionCreators };

class ChecklistContainer extends React.Component {

  componentDidMount() {
    //get data from server/db and populate redux store
    this.props.getChecklistData();
  }

  //CHILD COMPONENT EVENT HANDLERS
  //Item Event Handlers

  markAsChecked = (index, category, id, e) => {
    //update redux store
    this.props.toggleChecked(index, category, e.target.checked);
    //make patch request
    const obj = e.target.checked ? { checked: true } : { checked: false };
    this.patchItem(obj, id);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //update redux store and make post request to server/db
    this.props.postItem(this.props.selectedChecklist, this.props.itemInput);
    this.props.clearInput('itemInput');
  }

  removeItem = (index, category, id) => {
    //update redux store
    this.props.removeItem(index, category);
    //make delete request to server/db
    this.deleteItem(id);
  }

  //ItemText Event Handlers

  handleKeyPress = (index, category, editing, id, e) => {
    if (e.key === 'Enter') {
      this.changeItemName(index, category, editing, id, e);
    }
  }

  handleBlur = (index, category, editing, id, e) => {
    if (!e.target.value) {
      alert('please enter an item');
      return;
    }
    this.changeItemName(index, category, editing, id, e);
  }

  //helper function invoked in handleBlur() and handleKeyPress()
  changeItemName(index, category, editing, id, e) {
    //update redux store
    this.props.updateItemName(index, category, editing, e.target.value);
    //make patch request to server/db
    this.patchItem({ name: e.target.value }, id);
  }

  //PATCH/DELETE REQUESTS

  patchItem(obj, id) {
    axios.patch('/items', obj, { params: { _id: id }})
      .then((response) => {
        console.log(response.data);
      });
  }

  deleteItem(id) {
    axios.delete('/items', { params: { _id: id }})
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    const checklists = Object.keys(this.props.categories).map((category, i) => {
      return <Checklist
                        key={i}
                        className='checklist'
                        items={this.props.categories[category]}
                        category={category}
                        removeItem={this.removeItem}
                        markAsChecked={this.markAsChecked}
                        toggleEditing={this.props.toggleEditing}
                        handleBlur={this.handleBlur}
                        handleKeyPress={this.handleKeyPress}
                      />
    });
    return (
     <div>
      <div className='checklist-form-container'>
        <form className='checklist-form' onSubmit={this.handleSubmit}>
          <Dropdown
            updateSelectedCategory={(e) => this.props.updateSelectedCategory('selectedChecklist', e.target.value)}
            categories={['Select Category', ...Object.keys(this.props.categories)]}
          />
          <TextInput
            className='search-bar'
            placeholder='item'
            value={this.props.itemInput}
            behavior={(e) => this.props.updateInput('itemInput', e.target.value)}
          />
          <Button type='submit' className='add-btn' text='Add Item'/>
        </form>
      </div>
      <div className='checklist-container'>
        {checklists}
      </div>
    </div>);
  }
}

//makes state.checklists in redux store accessible as props at componenent level
//called whenever store is updated
function mapStateToProps(state) {
  return {
    ...state.checklists,
    itemInput: state.forms.itemInput,
    selectedChecklist: state.forms.selectedChecklist
  };
}

//wraps actionCreators in dispatch() call and merges them into component's props
//action creators can be invoked at component level without needing to call dispatch()
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ChecklistContainer);
