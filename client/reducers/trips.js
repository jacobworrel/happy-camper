import * as types from './../actions/trips/tripsActionTypes';

const initialState = [];

const trips = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_TRIPS : {
      return action.data;
    }
    case types.ADD_TRIP : {
      return [...state, action.trip];
    }
    default:
      return state;
  }
}

export default trips;
