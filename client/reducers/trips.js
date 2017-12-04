import * as types from './../actions/trips/tripsActionTypes';

const initialState = {
  trips: [],
  selectedTrip: '',
  participantId: '',
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_TRIPS: {
      return { ...state, trips: [...action.data] };
    }
    case types.UPDATE_SELECTED_TRIP: {
      return { ...state, selectedTrip: action.selectedTrip };
    }
    case types.ADD_TRIP: {
      return { ...state, trips: [...state.trips, action.trip] };
    }
    case types.UPDATE_PARTICIPANT_ID: {
      return { ...state, participantId: action.participantId };
    }
    case types.ADD_PARTICIPANT: {
      return { ...state }
    }
    default:
      return state;
  }
};

export default trips;
