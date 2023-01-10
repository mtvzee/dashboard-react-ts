import Background from './components/Background';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

const App = () => {
  return (
    <Background>
      <Weather />
      <Clock />
      <SearchBar />
    </Background>
  );
};

export default App;
