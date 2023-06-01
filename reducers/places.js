let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_NEARBY_PLACES":
      return action.payload;
    default:
      return state;
  }
};
