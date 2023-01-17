import Background from './components/Background';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';
import Weather from './components/Weather';

const App = () => {
  return (
    <Background>
      <Weather />
      <Clock />
      <SearchBar />
      <TodoList />
    </Background>
  );
};

export default App;
