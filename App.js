import { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainContainer from './navigation/MainContainer';
import SignUpScreen from './screens/SignUpScreen';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <PaperProvider>
      {
        isLoggedIn
        ? <MainContainer/>
        : <SignUpScreen setIsLoggedIn={setIsLoggedIn} />
      }
    </PaperProvider>
  );
}
