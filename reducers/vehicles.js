let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_VEHICLES":
      console.log("payload:", action.payload);
      return action.payload;

    case "ADD_VEHICLES":
      console.log("payload:", action.payload);
      return action.payload;

    case "DELETE_VEHICLES":
      console.log("payload:", action.payload);
      return action.payload;

    case "EDIT_VEHICLES":
      console.log("payload:", action.payload);
      return action.payload;

    default:
      return state;
  }
};
