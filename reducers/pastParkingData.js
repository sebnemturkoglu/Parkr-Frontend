let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAST_PARKING_DATA":
      return action.payload;
    default:
      return state;
  }
};
