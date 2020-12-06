import TodoItem from './TodoItem';

function TodoList({
  activeTodosCount,
  filteredTodos,
  filterTodos,
  filterBy,
  toggleTodo,
  removeTodo,
  removeCompletedTodo,
}) {
  const Button = ({ children, className, onClick }) => {
    return (
      <button
        className={`text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none ${
          className && className
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const ButtonFilters = ['all', 'active', 'completed'];

  const firstLetterUppercase = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-700 rounded shadow-2xl">
      <div className="max-h-80 py-1 text-gray-600 dark:text-gray-300 divide-y dark:divide-gray-600 overflow-y-auto">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todoId={todo.id}
              completed={todo.completed}
              task={todo.task}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          ))
        ) : (
          <div className="px-4 py-3 flex items-center justify-between">
            No Todos..
          </div>
        )}
      </div>

      <div className="border-t border-gray-300 dark:border-gray-600">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{`${activeTodosCount} items left`}</p>
          </div>

          <div className="space-x-3">
            {ButtonFilters.map((buttonText) => {
              return (
                <Button
                  key={buttonText}
                  onClick={() => filterTodos(buttonText)}
                >
                  <span
                    className={`${filterBy === buttonText && 'text-blue-400'}`}
                  >
                    {firstLetterUppercase(buttonText)}
                  </span>
                </Button>
              );
            })}
          </div>

          <div>
            <Button onClick={removeCompletedTodo}>
              <span>Clear Completed</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
