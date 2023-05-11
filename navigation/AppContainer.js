import MainContainer from "./MainContainer";
import SignUpScreen from "../screens/SignUpScreen";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const AppContainer = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
            isAuthenticated
            ? <MainContainer/>
            : <SignUpScreen />
    );
}


export default AppContainer;