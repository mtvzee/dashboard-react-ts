import Background from './components/Background';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <Background>
      <Clock />
      <SearchBar />
    </Background>
  );
};

export default App;
