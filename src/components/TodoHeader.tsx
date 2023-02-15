import { AiOutlineDelete } from "react-icons/ai";
import { TodoData } from "../types/todo";

type Props = {
  todoList: TodoData[];
  isDone: boolean;
  setTodoList: React.Dispatch<React.SetStateAction<TodoData[]>>;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoHeader = ({ todoList, isDone, setTodoList, setIsDone }: Props) => {
  const handleDeleteCompletedTodoList = () => {
    setTodoList(todoList.filter((todo) => !todo.isCompleted));
  };
  return (
    <header className="relative flex items-center justify-center p-2">
      <div className="relative flex items-center">
        <button
          className={`todoHeaderBtn w-[100px] h-[24px] rounded-md z-10 ${
            !isDone
              ? "text-orange-400 active"
              : " text-[#dddddd] hover:text-white"
          }`}
          onClick={() => setIsDone(false)}
        >
          Todo
        </button>
        <button
          className={`todoHeaderBtn w-[100px] h-[24px] rounded-md z-10 ${
            isDone
              ? "text-orange-400 active"
              : " text-[#dddddd] hover:text-white"
          }`}
          onClick={() => setIsDone(true)}
        >
          Done
        </button>
        <div className="indicator absolute top-0 left-0 w-[100px] h-[24px] rounded-md bg-[#333333] transition duration-300" />
      </div>
      {todoList.some((todo) => todo.isCompleted) && isDone && (
        <button
          className="absolute top-2 right-2"
          onClick={handleDeleteCompletedTodoList}
        >
          <AiOutlineDelete className="w-7 h-7 text-orange-400" />
        </button>
      )}
    </header>
  );
};

export default TodoHeader;
