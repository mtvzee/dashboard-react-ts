import Background from './components/Background';
import Clock from './components/Clock';
import Memo from './components/Memo';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';
import Weather from './components/Weather';

const App = () => {
  return (
    <Background>
      <TodoList />
      <Weather />
      <Clock />
      <SearchBar />
      <Memo />
    </Background>
  );
};

export default App;
