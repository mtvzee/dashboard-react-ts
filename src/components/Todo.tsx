import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { TodoData } from '../types/todo';

type Props = {
  id: number;
  text: string;
  isCompleted: boolean;
  todoList: TodoData[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoData[]>>;
};

const Todo = ({ id, text, isCompleted, todoList, setTodoList }: Props) => {
  const [editedText, setEditedText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 編集ボタンを押した時にそのtodoにフォーカスする
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  // todoを完了した時
  const handleComplete = (id: number) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      })
    );
  };

  // 削除ボタンを押した時
  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  // todoを編集してエンターキーを押した時
  const handleEnterKey = (
    id: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setTodoList(
        todoList.map((todo) => {
          if (todo.id === id) {
            setIsEditing(false);
            return {
              ...todo,
              text: editedText,
            };
          }
          return todo;
        })
      );
    }
  };
  return (
    <li className="flex items-center" onClick={() => handleComplete(id)}>
      <input
        type="text"
        className={`flex-auto outline-none bg-transparent ${
          isCompleted && 'line-through decoration-2 text-[#cbcbcb]'
        }`}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        disabled={!isEditing}
        onKeyDown={(e) => handleEnterKey(id, e)}
        ref={inputRef}
      />
      <div onClick={(e) => e.stopPropagation()}>
        <button className="" onClick={() => handleDelete(id)}>
          <AiOutlineDelete />
        </button>
        <button onClick={() => setIsEditing(!isEditing)}>
          <AiOutlineEdit />
        </button>
      </div>
    </li>
  );
};

export default Todo;
