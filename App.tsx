import { Main } from './src/Main';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isFontsLoaded] = useFonts({
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
  });

  if (!isFontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />

      <Main />
    </>
  );
}
