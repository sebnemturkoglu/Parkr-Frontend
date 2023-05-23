import * as API from "../api/routes";

export const getRoutes = (req) => async (dispatch) => {
  try {
    const { data } = await API.getRoutes(req);
    console.log("action getRoutes", data);
    dispatch({ type: "GET_ROUTES", payload: data });
  } catch (error) {
    console.error("getRoutes", error, req);
  }
};
