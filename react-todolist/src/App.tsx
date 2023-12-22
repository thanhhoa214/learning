import { useEffect, useState } from 'react';
import { TodoItem, TodoItemProps } from './components/TodoItem/TodoItem';
import {
  CustomRadio,
  StyledTodoItem,
} from './components/TodoItem/TodoItem.style';
import useTodos from './hooks/useTodos';
import './App.css';

type InputEventHandler = React.ChangeEventHandler<HTMLInputElement>;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [newTodoText, setNewTodoText] = useState('');
  const [mode, setMode] = useState<'input' | 'edit' | null>(null);
  const [todos, addTodo, updateTodo, deleteTodo] = useTodos();

  const searchedTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAddTodo: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key !== 'Enter') return;
    addTodo(event.currentTarget.value);
    setNewTodoText('');
  };

  const handleBlur = () => {
    setNewTodoText('');
    setMode(null);
  };

  const handleSearchChange: InputEventHandler = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleNewTodoTextChange: InputEventHandler = (event) => {
    setNewTodoText(event.currentTarget.value);
  };

  const handleUpdateTodo: TodoItemProps['onUpdateTodo'] = (
    todo,
    willReorder
  ) => {
    updateTodo(todo, willReorder);
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

    window.addEventListener('keyup', onEnter);
    return () => window.removeEventListener('keyup', onEnter);
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
        onChange={handleSearchChange}
      />

      <ul>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
            onToggleEdittingMode={handleToggleEdittingMode}
          />
        ))}

        {mode === 'input' && (
          <StyledTodoItem>
            <CustomRadio />
            <input
              autoFocus
              value={newTodoText}
              onChange={handleNewTodoTextChange}
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
