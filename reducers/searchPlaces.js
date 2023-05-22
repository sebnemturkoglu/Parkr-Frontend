let initialState = {isSearch: false, data: []};

export default (state = initialState, action) => {
    switch (action.type) {
      
      case "GET_PLACES_NEAR_SEARCH_POINT":
        console.log("payload:", action.payload);
        return {isSearch: true, data: action.payload};
      default:
        return state;
    }
  };