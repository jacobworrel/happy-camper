import axios from 'axios';
import * as types from './tripsActionTypes';

export function populateTrips(data) {
  return {
    type: types.POPULATE_TRIPS,
    data,
  };
}

export function addTrip(trip) {
  return {
    type: types.ADD_TRIP,
    trip,
  };
}

export function updateSelectedTrip(selectedTrip) {
  return {
    type: types.UPDATE_SELECTED_TRIP,
    selectedTrip,
  };
}

export function updateParticipantId(participantId) {
  return {
    type: types.UPDATE_PARTICIPANT_ID,
    participantId,
  };
}

export function addParticipant(user) {
  return {
    type: types.ADD_PARTICIPANT,
    user,
  };
}

// THUNKS

export function getTrips(userId) {
  return (dispatch) => {
    axios.get(`/trips/${userId}`)
      .then((response) => {
        dispatch(populateTrips(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
  };
}

export function addParticipantAsync(tripId, userId) {
  return (dispatch) => {
    axios.post('/trips/participants', { tripId, userId })
      .then((response) => {
        console.log(response.data)
        // dispatch(addParticipant(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
