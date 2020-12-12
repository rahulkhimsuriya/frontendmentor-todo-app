import { useState, useEffect } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import useToggle from './hooks/useToggle';
import bgLight from './assets/images/bg-desktop-light.jpg';
import bgDark from './assets/images/bg-desktop-dark.jpg';
import iconSun from './assets/images/icon-sun.svg';
import iconMoon from './assets/images/icon-moon.svg';

function App() {
  const initialTodos = [
    { id: 1, task: 'Complete online javascript course', completed: true },
    { id: 2, task: 'Jog around the park 3x', completed: false },
    { id: 3, task: '10 minutes meditation', completed: false },
    { id: 4, task: 'Read for 1 hour', completed: false },
    { id: 5, task: 'Pick up groceries', completed: false },
    { id: 6, task: 'Complete Todo App on Frontend Mentor', completed: false },
  ];

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) &&
      JSON.parse(localStorage.getItem('todos')).length
      ? JSON.parse(localStorage.getItem('todos'))
      : initialTodos
  );
  const [isDarkTheme, toggleTheme] = useToggle(
    JSON.parse(localStorage.getItem('theme')) === 'dark' && true
  );
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filterBy, setFilterBy] = useState('all');

  const bgImage = isDarkTheme ? bgDark : bgLight;
  const iconTheme = isDarkTheme ? iconSun : iconMoon;

  const activeTodosCount = todos.filter((todo) => todo.completed !== true)
    .length;

  useEffect(() => {
    setFilteredTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(
      'theme',
      JSON.stringify(isDarkTheme ? 'dark' : 'light')
    );
  }, [isDarkTheme]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const updatedTodos = arrayMove(todos, oldIndex, newIndex);
    setTodos(updatedTodos);
  };

  const addNewTodo = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const toggleTodo = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    if (filterBy !== 'all') {
      setFilterBy('all');
    }

    setTodos(updatedTodos);
  };

  const removeCompletedTodo = () => {
    const updatedTodos = todos.filter((todo) => todo.completed !== true);

    if (filterBy === 'completed') {
      setFilterBy('all');
    }

    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const filterTodos = (filterBy = 'all') => {
    setFilterBy(filterBy);

    return {
      all: () => setFilteredTodos(todos),
      active: () => {
        const activeTodos = todos.filter((todo) => todo.completed !== true);
        setFilteredTodos(activeTodos);
      },
      completed: () => {
        const completedTodos = todos.filter((todo) => todo.completed === true);
        setFilteredTodos(completedTodos);
      },
    }[filterBy]();
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? 'dark bg-gray-800' : 'bg-white'
      }`}
    >
      <header
        className="h-60 w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="mx-auto px-4 md:px-0 max-w-md">
          <div className="pt-12 flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-widest text-gray-100">
              TODO
            </h1>
            <button
              className="focus:outline-none focus:ring-2"
              onClick={toggleTheme}
            >
              <img className="h-6 w-6" src={iconTheme} alt="theme icon" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto -mt-28 px-4 md:px-0 max-w-md">
        <AddTodo addNewTodo={addNewTodo} />
        <TodoList
          activeTodosCount={activeTodosCount}
          filteredTodos={filteredTodos}
          filterBy={filterBy}
          toggleTodo={toggleTodo}
          filterTodos={filterTodos}
          removeTodo={removeTodo}
          removeCompletedTodo={removeCompletedTodo}
          onSortEnd={onSortEnd}
          axis="y"
          distance={10}
          useWindowAsScrollContainer={true}
        />

        <p className="pt-8 pb-2 text-center text-sm text-gray-400 dark:text-gray-500">
          Drag and drop to reorder list
        </p>
      </main>
    </div>
  );
}

export default App;
