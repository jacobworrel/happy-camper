import * as types from './tripsActionTypes';
import axios from 'axios';

export function populateTrips(data) {
  return {
    type: types.POPULATE_TRIPS,
    data
  }
}

export function addTrip(trip) {
  console.log('trip -->', trip)
  return {
    type: types.ADD_TRIP,
    trip
  }
}

//THUNKS

export function getTrips(userId) {
  return (dispatch) => {
    axios.get(`/trips/${userId}`)
      .then((response) => {
        dispatch(populateTrips(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function postTrip(tripName, userId) {
  return (dispatch) => {
    axios.post('/trips', { tripName, userId })
      .then((response) => {
        dispatch(addTrip(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
