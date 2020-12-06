function TodoDeleteButton({ todoId, removeTodo }) {
  return (
    <svg
      className="h-6 w-6 text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => removeTodo(todoId)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default TodoDeleteButton;
