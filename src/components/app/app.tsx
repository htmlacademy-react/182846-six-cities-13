import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  offers: number;
}

function App({offers}: AppProps): JSX.Element {
  return (
    <MainScreen offers={offers} />
  );
}

export default App;
