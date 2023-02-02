import { useContext, useEffect, useRef, useState } from 'react';
import { ShowModalContext } from '../context/ShowModalContext';
import { TodoData } from '../types/todo';
import Todo from './Todo';
import { MdClose } from 'react-icons/md';
import { BsListTask } from 'react-icons/bs';
import TodoHeader from './TodoHeader';

const TodoList = () => {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState<TodoData[]>(
    JSON.parse(localStorage.getItem('todoList') ?? '')
  );
  const [isDone, setIsDone] = useState(false);
  const { showModal, setShowModal } = useContext(ShowModalContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleTodoModal = () => {
    if (showModal) {
      setShowModal({
        weather: showModal.weather,
        todo: !showModal?.todo,
      });
    }
    // モーダルを開く時のみinputにフォーカスする
    if (!showModal?.todo) {
      inputRef.current?.focus();
    }
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    setTodoList([
      ...todoList,
      {
        id: Math.floor(Math.random() * 1000),
        text: input,
        isCompleted: false,
      },
    ]);
    setInput('');
  };

  // ローカルストレージにTODOリストの配列を文字列に変換して保存
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="absolute top-4 left-4">
      <div
        className={`absolute top-0 left-0 min-w-[350px] bg-black/20 backdrop-blur-xl rounded-xl ${
          showModal?.todo
            ? '[clip-path:circle(1000px_at_22px_22px)]'
            : '[clip-path:circle(20px_at_22px_22px)]'
        } transition-[clip-path] duration-700`}
      >
        <button
          className="absolute top-[9px] left-[9px] z-10"
          onClick={handleToggleTodoModal}
        >
          {showModal.todo ? (
            <BsListTask className="w-7 h-7" />
          ) : (
            <MdClose className="w-7 h-7" />
          )}
        </button>
        <TodoHeader
          todoList={todoList}
          isDone={isDone}
          setTodoList={setTodoList}
          setIsDone={setIsDone}
        />
        <div className="p-4 pt-0">
          <ul className="space-y-1 pb-2">
            {todoList
              .filter((todo) => (isDone ? todo.isCompleted : !todo.isCompleted))
              .map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  isCompleted={todo.isCompleted}
                  todoList={todoList}
                  setTodoList={setTodoList}
                />
              ))}
          </ul>
          {!isDone &&
            (todoList.length < 10 ? (
              <form onSubmit={(e) => handleAddTodo(e)}>
                <input
                  type="text"
                  placeholder="Todoを追加"
                  className="w-full rounded-md py-1 px-3 outline-none bg-black/60"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
            ) : (
              <div className="text-red-500">Todoの上限は10個です</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
