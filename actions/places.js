import * as API from "../api/places";

export const getNearbyPlaces = (req) => async (dispatch) => {
	try {
		const { data } = await API.getNearbyPlaces(req);
		console.log("action", data);
		dispatch({ type: "GET_NEARBY_PLACES", payload: data });
	} catch (error) {
		console.error("getNearbyError",error, req);
	}
};
