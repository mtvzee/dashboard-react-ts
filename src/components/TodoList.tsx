import { useEffect, useRef, useState } from 'react';
import { TodoData } from '../types/todo';
import Todo from './Todo';

const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todoForm, setTodoForm] = useState('');
  const [todoList, setTodoList] = useState<TodoData[]>(
    JSON.parse(localStorage.getItem('todoList') ?? '')
  );
  const todoFormRef = useRef<HTMLInputElement>(null);

  const handleShowTodo = () => {
    setIsOpen(!isOpen);
    todoFormRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoForm) return;
    setTodoList([
      ...todoList,
      {
        id: Math.floor(Math.random() * 1000),
        text: todoForm,
        isCompleted: false,
      },
    ]);
    setTodoForm('');
  };

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="absolute bottom-0 right-0 mr-4 mb-4">
      <button
        className="drop-shadow-one text-xl block ml-auto"
        onClick={handleShowTodo}
      >
        Todo
      </button>
      <div
        className={`absolute bottom-0 right-0 min-w-[300px] bg-black  rounded-md ${
          isOpen
            ? '[clip-path:circle(1000px_at_100%_100%)]'
            : '[clip-path:circle(0_at_100%_100%)]'
        } transition-[clip-path] duration-700`}
      >
        <div className="p-2">
          <ul>
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Todoを追加"
              className="w-full rounded-md p-1 outline-none bg-[#4c4c4c]"
              ref={todoFormRef}
              value={todoForm}
              onChange={(e) => setTodoForm(e.target.value)}
            />
          </form>
        </div>

        <button
          className={`drop-shadow-one text-xl block ml-auto pr-2 duration-1000 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoList;
