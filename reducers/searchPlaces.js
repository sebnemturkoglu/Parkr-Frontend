let initialState = { isSearch: false, data: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLACES_NEAR_SEARCH_POINT":
      return { isSearch: true, data: action.payload };
    case "MAKE_SEARCH_FALSE":
      return { ...state, isSearch: false };
    default:
      return state;
  }
};
