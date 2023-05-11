// export const createUser = (user) => async (dispatch) => {
// 	try {
// 		const { data } = await api.createUser(user);
// 		dispatch({ type: "CREATE_USER", payload: data });
// 		dispatch({ type: 'CRE_USER_SUCC', payload: "Successfully created the user."});
// 	} catch (e) {
// 		switch(e.response.status){
// 			case 400:
// 			  dispatch({type: 'CRE_USER_FAIL', payload: e.response.data.errors[0].msg});
// 			  break;
// 			case 500:
// 			  dispatch({type: 'CRE_USER_FAIL', payload: "Error: ".concat(e.response.data)});
// 			  break;
// 			default:
// 			  break;
// 		  }
// 		console.log(e.response);
// 	}
// };

// export const getUsers = () => async (dispatch) => {
// 	try {
// 		const { data } = await api.fetchUsers();
// 		dispatch({ type: "FETCH_ALL_USERS", payload: data });
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };