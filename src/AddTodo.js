import { v4 as uuid } from 'uuid';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/userInputState';
import TodoCompleteButton from './TodoCompleteButton';

function AddTodo({ addNewTodo }) {
  const [isCompleted, toggleTodo] = useToggle(false);
  const [todoText, setTodoText, resetTodoText] = useInputState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      id: uuid(),
      task: todoText,
      completed: isCompleted,
    };

    addNewTodo(todo);
    resetTodoText();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <span
          className={`absolute left-4 top-2 rounded-full ${isCompleted && ''}`}
        >
          <TodoCompleteButton completed={isCompleted} toggleTodo={toggleTodo} />
        </span>
        <input
          type="text"
          className="pl-14 pr-4 py-2 w-full text-gray-800 dark:text-gray-100 tracking-wide bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 rounded"
          placeholder="Create a new todo..."
          onChange={setTodoText}
          value={todoText}
        />
      </div>
    </form>
  );
}

export default AddTodo;
