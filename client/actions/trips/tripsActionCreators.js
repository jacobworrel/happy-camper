import * as types from './tripsActionTypes';
import axios from 'axios';

export function populateTripsStore(data) {
  return {
    type: types.POPULATE_TRIPS_STORE,
    data
  }
}

//THUNKS

export function getTrips(username) {
  return (dispatch) => {
    axios.get(`/trips/${username}`)
      .then((response) => {
        dispatch(populateTripsStore(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
