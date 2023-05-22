import * as API from "../api/places";

export const getNearbyPlaces = (req) => async (dispatch) => {
	try {
		const { data } = await API.getNearbyPlaces(req);
		console.log("action", data);
		dispatch({ type: "GET_NEARBY_PLACES", payload: data });
	} catch (error) {
		console.error("getNearbyError", error, req);
	}
};

export const getSearchPlaces = (req) => async (dispatch) => {
	try {
		const { data } = await API.getNearbyPlaces(req);
		console.log("action getSearchPlaces", data);
		dispatch({ type: "GET_PLACES_NEAR_SEARCH_POINT", payload: data });
	} catch (error) {
		console.error("getSearchPlaces Error",error, req);
	}
};

export const getPlaceDetails = (req) => async (dispatch) => {
	try {
		const { data } = await API.getPlaceDetails(req);
		console.log("action getPlaceDetails", data);
		dispatch({ type: "GET_PLACE_DETAILS", payload: data });
	} catch (error) {
		console.error("getPlaceDetails Error",error, req);
	}
};
