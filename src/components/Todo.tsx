import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
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

  // todoを完了状態にする
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

  const handleDeleteBtn = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  // todoを編集してエンターキーを押したときに、TODOリストの内容を変更する
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
    <li className="flex items-center group" onClick={() => handleComplete(id)}>
      <button className="mr-2">
        {isCompleted ? (
          <MdRadioButtonChecked className="text-orange-400" />
        ) : (
          <MdRadioButtonUnchecked />
        )}
      </button>
      <input
        type="text"
        className={`flex-auto outline-none bg-transparent cursor-pointer  focus:border-b ${
          isCompleted && 'line-through decoration-2 text-[#777777]'
        }`}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        disabled={!isEditing}
        onKeyDown={(e) => handleEnterKey(id, e)}
        ref={inputRef}
      />
      <div
        className="invisible opacity-0 transition duration-300  group-hover:visible group-hover:opacity-100 text-[#777777]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => handleDeleteBtn(id)}>
          <AiOutlineDelete className="w-6 h-6 hover:text-white" />
        </button>
        <button onClick={() => setIsEditing(!isEditing)}>
          <AiOutlineEdit className="w-6 h-6 hover:text-white" />
        </button>
      </div>
    </li>
  );
};

export default Todo;
