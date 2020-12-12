import { SortableElement } from 'react-sortable-hoc';
import TodoCompleteButton from './TodoCompleteButton';
import TodoDeleteButton from './TodoDeleteButton';

const TodoItem = SortableElement(
  ({ todoId, completed, task, toggleTodo, removeTodo }) => {
    return (
      <div className="px-4 py-3 group flex items-center justify-between">
        <div className="flex flex-1 truncate">
          <span className="flex-shrink-0">
            <TodoCompleteButton
              todoId={todoId}
              completed={completed}
              toggleTodo={toggleTodo}
            />
          </span>
          <p
            className={`ml-4 truncate select-none cursor-pointer ${
              completed && 'line-through opacity-75'
            }`}
            onClick={() => toggleTodo(todoId)}
          >
            {task}
          </p>
        </div>
        <div className="ml-4 opacity-0 group-hover:opacity-100 flex flex-shrink-0">
          <TodoDeleteButton todoId={todoId} removeTodo={removeTodo} />
        </div>
      </div>
    );
  }
);

export default TodoItem;
