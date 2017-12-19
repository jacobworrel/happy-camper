/* eslint-disable no-undef */

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

/**
* @function saveState
* @param {Object} - current redux state tree with relevant auth and trip/checklist data
* @description saves state to local storage
* This function subscribes to redux store state changes so
* it gets invoked any time redux store changes.
*/

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ignore write errors.
  }
}


/**
* @function removeState
* @description removes state from local storage
* NOTE: must happen asynchronously since state is saved to local storage
* whenever redux store is changed.
*/

export function removeState() {
  Promise.resolve().then(() => localStorage.removeItem('state'));
}
