import * as API from "../api/user";

export const getPastParkingData = () => async (dispatch) => {
  try {
    const { data } = await API.getPastParking();
    console.log("action getPastParkingData", data);
    dispatch({ type: "GET_PAST_PARKING_DATA", payload: data });
  } catch (error) {
    console.error("getPastParkingData Error", error);
  }
};

export const getCurrentParkingData = () => async (dispatch) => {
  try {
    const { data } = await API.getCurrentParking();
    console.log("action getCurrentParkingData", data);
    dispatch({ type: "GET_CURRENT_PARKING_DATA", payload: data });
  } catch (error) {
    console.error("getCurrentParkingData Error", error);
  }
};

export const getVehicles = () => async (dispatch) => {
  try {
    const { data } = await API.getVehicles();
    console.log("action getVehicles", data);
    dispatch({ type: "GET_VEHICLES", payload: data });
  } catch (error) {
    console.error("getVehicles Error", error);
  }
};

export const addVehicle = (req) => async (dispatch) => {
  console.log("add vehicle", req);
  try {
    const res = await API.addVehicle(req);
    const { data } = await API.getVehicles();
    dispatch({ type: "ADD_VEHICLES", payload: data });
  } catch (error) {
    console.error("addVehicle Error", error);
  }
};

export const editVehicle = (req) => async (dispatch) => {
  try {
    const res = await API.editVehicle(req);
    const { data } = await API.getVehicles();
    dispatch({ type: "EDIT_VEHICLES", payload: data });
  } catch (error) {
    console.error("editVehicle Error", error);
  }
};

export const deleteVehicle = (req) => async (dispatch) => {
  try {
    const res = await API.deleteVehicle(req);
    const { data } = await API.getVehicles();
    dispatch({ type: "DELETE_VEHICLES", payload: data });
  } catch (error) {
    console.error("deleteVehicle Error", error);
  }
};
