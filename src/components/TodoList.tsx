import { useContext, useEffect, useRef, useState } from 'react';
import { ShowModalContext } from '../context/ShowModalContext';
import { TodoData } from '../types/todo';
import Todo from './Todo';
import { MdClose } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

const TodoList = () => {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState<TodoData[]>(
    JSON.parse(localStorage.getItem('todoList') ?? '')
  );
  const { showModal, setShowModal } = useContext(ShowModalContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleTodo = () => {
    if (showModal) {
      setShowModal({
        links: showModal.links,
        weather: showModal.weather,
        todo: !showModal?.todo,
      });
    }
    // モーダルを開く時のみinputにフォーカスする
    if (showModal?.todo) {
      inputRef.current?.focus();
    }
  };

  const handleDeleteCompletedTodos = () => {
    setTodoList(todoList.filter((todo) => !todo.isCompleted));
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
    <div className="absolute top-0 left-0 ml-4 mt-4">
      <button
        className="drop-shadow-one text-xl block ml-auto"
        onClick={handleToggleTodo}
      >
        Todo
      </button>

      <div
        className={`absolute top-0 left-0 min-w-[350px] bg-black  rounded-md ${
          showModal?.todo
            ? '[clip-path:circle(1000px_at_0%_0%)]'
            : '[clip-path:circle(0_at_0%_0%)]'
        } transition-[clip-path] duration-700`}
      >
        <div className="flex items-center justify-between p-2">
          <button
            className={`transition duration-1000  ${
              showModal?.todo ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleToggleTodo}
          >
            <MdClose className="w-7 h-7" />
          </button>
          {todoList.some((todo) => todo.isCompleted) && (
            <button onClick={handleDeleteCompletedTodos}>
              <AiOutlineDelete className="w-7 h-7 text-orange-400" />
            </button>
          )}
        </div>
        <div className="p-4 pt-0">
          <ul className="space-y-1 pb-2">
            {todoList.map((todo) => (
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
          {todoList.length < 10 ? (
            <form onSubmit={(e) => handleAddTodo(e)}>
              <input
                type="text"
                placeholder="Todoを追加"
                className="w-full rounded-md p-1 outline-none bg-[#4c4c4c]"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          ) : (
            <div className="text-red-500">TODOの上限は10個です</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
