import * as API from "../api/places";

export const getNearbyPlaces = (req) => async (dispatch) => {
  try {
    const { data } = await API.getNearbyPlaces(req);
    console.log("Get Nearby Places Action");
    dispatch({ type: "GET_NEARBY_PLACES", payload: data });
  } catch (error) {
    console.error("getNearbyError", error, req);
  }

  dispatch({ type: "NEARBY_LOADED" });
};

export const getSearchPlaces = (req) => async (dispatch) => {
  try {
    const { data } = await API.getNearbyPlaces(req);
    console.log("Get Search Places Action");
    dispatch({ type: "GET_PLACES_NEAR_SEARCH_POINT", payload: data });
  } catch (error) {
    console.error("getSearchPlaces Error", error, req);
  }
};

export const getPlaceDetails = (req) => async (dispatch) => {
  try {
    const { data } = await API.getPlaceDetails(req);
    console.log("action getPlaceDetails", data);
    dispatch({ type: "GET_PLACE_DETAILS", payload: data });
  } catch (error) {
    console.error("getPlaceDetails Error", error, req);
  }
};

export const getRecentPlaces = () => async (dispatch) => {
  try {
    const { data } = await API.getRecentPlaces();
    dispatch({ type: "GET_RECENT_PLACES", payload: data });
  } catch (error) {
    console.error("getRecentPlaces Error", error, req);
  }

  dispatch({ type: "RECENT_LOADED" });
};

export const makeSearchFalse = () => async (dispatch) => {
  try {
    dispatch({ type: "MAKE_SEARCH_FALSE" });
  } catch (error) {
    console.error("getPlaceDetails Error", error, req);
  }
};
