let initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
      
      case "GET_PLACE_DETAILS":
        return action.payload;
      default:
        return state;
    }
  };