import * as types from './actionTypes';

export function populateStore(data) {
  return {
    type: types.POPULATE_STORE,
    data
  }
}

// export function addTaskActionCreator(task) {
//   return {
//     type: types.ADD_TASK,
//     task
//   }
// }
//
// export function updateTaskActionCreator(taskName) {
//   return {
//     type: types.UPDATE_INPUT,
//     taskName
//   }
// }
//
// export function deleteTaskActionCreator(taskIndex) {
//   return {
//     type: types.DELETE_TASK,
//     taskIndex
//   }
// }
//
// export function markTaskActionCreator(taskIndex) {
//   return {
//     type: types.MARK_COMPLETED,
//     taskIndex
//   }
// }
