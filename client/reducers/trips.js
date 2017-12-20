/* eslint-disable no-underscore-dangle */

import * as types from './../actions/trips/tripsActionTypes';

const initialState = {
  byId: {},
  selectedTrip: '',
  participantId: '',
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TRIPS: {
      const byId = action.data.reduce((acc, curr) => (
        { ...acc, [curr._id]: curr }
      ), {});
      return { ...state, byId };
    }
    case types.UPDATE_SELECTED_TRIP: {
      return { ...state, selectedTrip: action.selectedTrip };
    }
    case types.ADD_TRIP: {
      const id = action.trip._id;
      return { ...state, byId: { ...state.byId, [id]: action.trip } };
    }
    case types.UPDATE_PARTICIPANT_ID: {
      return { ...state, participantId: action.participantId };
    }
    case types.ADD_PARTICIPANT: {
      const { tripId } = action;
      const trip = state.byId[tripId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [tripId]: {
            ...trip,
            users: action.users,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default trips;
