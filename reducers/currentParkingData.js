let initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
      
      case "GET_CURRENT_PARKING_DATA":
        console.log("payload:", action.payload);
        return action.payload;
      default:
        return state;
    }
  };