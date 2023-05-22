import * as API from "../api/user";

export const getPastParkingData = () => async (dispatch) => {
	try {
		const { data } = await API.getPastParking();
		console.log("action getPastParkingData", data);
		dispatch({ type: "GET_PAST_PARKING_DATA", payload: data });
	} catch (error) {
		console.error("getPastParkingData Error",error);
	}
};

export const getCurrentParkingData = () => async (dispatch) => {
	try {
		const { data } = await API.getCurrentParking();
		console.log("action getCurrentParkingData", data);
		dispatch({ type: "GET_CURRENT_PARKING_DATA", payload: data });
	} catch (error) {
		console.error("getCurrentParkingData Error",error);
	}
};