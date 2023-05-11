import * as API from '../api/auth';

export const signUp = (data) => async (dispatch) => {

    try {
        const res  = await API.signUp(data);
        const value = res.data.data;
        return value;

    } catch (error) {
        console.log("ERROR:", error);
    }
}

export const signIn = (data) => async (dispatch) => {

    try {
        const res  = await API.signIn(data);
        const value = res.data.data;
        return value;

    } catch (error) {
        console.log("singIn error",error.response);
    }
}

// export const logout = () => async (dispatch) => {

//     try {
//         const res  = await API.logout({});
//         return value;

//     } catch (error) {
//         console.log("singIn error",error.response);
//     }
// }