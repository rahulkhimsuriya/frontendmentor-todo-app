function TodoCompleteButton({ todoId, completed, toggleTodo }) {
  return (
    <svg
      className={`h-6 w-6 cursor-pointer rounded-full ${
        completed
          ? 'todo-completed text-white dark:text-gray-100'
          : 'border-2 border-gray-300 dark:border-gray-600'
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => toggleTodo(todoId)}
    >
      {completed && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      )}
    </svg>
  );
}

export default TodoCompleteButton;
