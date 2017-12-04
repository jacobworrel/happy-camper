import * as types from './../actions/trips/tripsActionTypes';

const initialState = {
  trips: [],
  selectedTrip: '',
  participantId: '',
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_TRIPS: {
      const trips = action.data.reduce((acc, curr) => (
        { ...acc, [curr._id]: curr }
      ), {});
      return { ...state, trips };
    }
    case types.UPDATE_SELECTED_TRIP: {
      return { ...state, selectedTrip: action.selectedTrip };
    }
    case types.ADD_TRIP: {
      const id = action.trip._id;
      return { ...state, trips: { ...state.trips, [id]: action.trip } };
    }
    case types.UPDATE_PARTICIPANT_ID: {
      return { ...state, participantId: action.participantId };
    }
    case types.ADD_PARTICIPANT: {
      const { tripId } = action;
      const trip = state.trips[tripId];
      return {
        ...state,
        trips: {
          ...state.trips,
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
