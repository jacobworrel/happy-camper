import axios from 'axios';
import * as types from './tripsActionTypes';

export function requestTrips() {
  return {
    type: types.REQUEST_TRIPS,
  }
}

export function receiveTrips(data) {
  return {
    type: types.RECEIVE_TRIPS,
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

export function addParticipant(tripId, users) {
  return {
    type: types.ADD_PARTICIPANT,
    tripId,
    users,
  };
}

// THUNKS

export function getTrips(userId) {
  return dispatch => {
    dispatch(requestTrips());
    axios
      .get(`/trips/${userId}`)
      .then(response => {
        dispatch(receiveTrips(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function postTrip(tripName, userId) {
  return dispatch => {
    axios
      .post('/trips', { tripName, userId })
      .then(response => {
        dispatch(addTrip(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function addParticipantAsync(tripId, userId) {
  return dispatch => {
    axios
      .post('/trips/participants', { tripId, userId })
      .then(response => {
        const { users } = response.data;
        dispatch(addParticipant(tripId, users));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
