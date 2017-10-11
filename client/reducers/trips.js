import * as types from './../actions/trips/tripsActionTypes';

const initialState = [];

const trips = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_TRIPS_STORE : {
      return action.data;
    }
    default:
      return state;
  }
}

export default trips;
