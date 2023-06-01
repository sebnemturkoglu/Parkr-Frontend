let initialState = { nearbyLoaded: false, recentLoaded: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEARBY_LOADED":
      return { ...state, nearbyLoaded: true };

    case "RECENT_LOADED":
      return { ...state, recentLoaded: true };

    default:
      return state;
  }
};
