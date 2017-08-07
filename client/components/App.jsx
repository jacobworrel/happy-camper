import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators.js';
import ChecklistContainer from './ChecklistContainer.jsx';

//makes state in redux store accessible as props at componenent level
//called whenever store is updated
function mapStateToProps(state) {
  return { ...state };
}

//wraps actionCreators in dispatch() call and merged into component's props
//action creators can be invoked at component level without needing to call dispatch()
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//connects component to redux store
const App = connect(mapStateToProps, mapDispatchToProps)(ChecklistContainer);

export default App;
