let initialState = { loaded: false, data: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROUTES":
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
};
