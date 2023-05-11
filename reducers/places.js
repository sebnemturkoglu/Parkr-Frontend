initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
      
      case "GET_NEARBY_PLACES":
        console.log("payload:", action.payload);
        return action.payload;
      default:
        return state;
    }
  };