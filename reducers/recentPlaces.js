initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
      
      case "GET_RECENT_PLACES":
        return action.payload;
      default:
        return state;
    }
  };