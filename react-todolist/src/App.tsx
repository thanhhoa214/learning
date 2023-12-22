import { useEffect, useState } from 'react';
import { TodoItem, TodoItemProps } from './components/TodoItem/TodoItem';
import {
  CustomRadio,
  StyledTodoItem,
} from './components/TodoItem/TodoItem.style';
import useTodos from './hooks/useTodos';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [newTodoText, setNewTodoText] = useState('');
  const [mode, setMode] = useState<'input' | 'edit' | null>(null);
  const [todos, addTodo, updateTodo, deleteTodo] = useTodos();

  const searchedTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(searchValue.toLowerCase())
  );
  const pendingTodosCount = todos.filter((t) => !t.isCompleted).length;

  const handleAddTodo: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      addTodo(event.currentTarget.value);
      setNewTodoText('');
    }
  };

  const handleBlur = () => {
    setNewTodoText('');
    setMode(null);
  };

  const handleDeleteTodo: TodoItemProps['onDeleteTodo'] = (todo) => {
    if (todos.length === 1)
      return alert('Task list should have at least 1 task');
    deleteTodo(todo.id);
  };

  const handleToggleEdittingMode: TodoItemProps['onToggleEdittingMode'] = () =>
    setMode(mode === 'edit' ? null : 'edit');

  useEffect(() => {
    const onEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && mode === null) setMode('input');
    };

    window.addEventListener('keydown', onEnter);
    return () => window.removeEventListener('keydown', onEnter);
  });

  return (
    <section>
      <div className="alert">
        <img src="angular-logo.png" alt="React logo" width={50} />
        <p>
          Check out the Angular implementation here{' '}
          <a
            href="https://rintodolist.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://rintodolist.netlify.app/
          </a>
        </p>
      </div>

      <h2>
        React Todo List -{' '}
        <a href="https://github.com/thanhhoa214/learning/tree/main/react-todolist">
          Github
        </a>
      </h2>

      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />

      <div className="progress-wrapper">
        <progress
          value={todos.length - pendingTodosCount}
          max={todos.length}
        ></progress>
        <span>
          {pendingTodosCount === 0
            ? 'You did it! 🎁'
            : pendingTodosCount + ' more left 🔥'}
        </span>
      </div>

      <ul>
        {searchedTodos.length === 0 && (
          <p>
            Cannot find any results for "{searchValue}".
            <br />
            <button onClick={() => setSearchValue('')}>Clear</button>
          </p>
        )}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={updateTodo}
            onToggleEdittingMode={handleToggleEdittingMode}
          />
        ))}

        {mode === 'input' && (
          <StyledTodoItem>
            <CustomRadio />
            <input
              autoFocus
              value={newTodoText}
              onChange={(event) => setNewTodoText(event.currentTarget.value)}
              onKeyDown={handleAddTodo}
              onBlur={handleBlur}
            />
          </StyledTodoItem>
        )}
      </ul>
    </section>
  );
}

export default App;
