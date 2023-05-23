let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROUTES":
      console.log("payload routes:", action.payload);
      return action.payload;
    default:
      return state;
  }
};
