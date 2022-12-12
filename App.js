import { Provider as PaperProvider } from 'react-native-paper';
import MainContainer from './navigation/MainContainer';

export default function App() {
  return (
    <PaperProvider>
      <MainContainer />
    </PaperProvider>
  );
}
