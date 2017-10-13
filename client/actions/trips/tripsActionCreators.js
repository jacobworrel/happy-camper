import * as types from './tripsActionTypes';
import axios from 'axios';

export function populateTrips(data) {
  return {
    type: types.POPULATE_TRIPS,
    data
  }
}

//THUNKS

export function getTrips(username) {
  return (dispatch) => {
    axios.get(`/trips/${username}`)
      .then((response) => {
        dispatch(populateTrips(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
