import { useState } from 'react';
import { TodoItemModel, TodoItemModels } from '../models/TodoItem';

const idGeneratorFunc = () => {
  let index = 1;
  return () => ++index;
};
const idGenerator = idGeneratorFunc();

export default function useTodos() {
  const [todos, setTodos] = useState<TodoItemModels>([
    { id: idGenerator(), isCompleted: false, text: 'Drink 2L water' },
    { id: idGenerator(), isCompleted: false, text: 'Interview engineers' },
    { id: idGenerator(), isCompleted: true, text: 'Practice Guitar' },
  ]);

  const addTodo = (text: TodoItemModel['text']) => {
    setTodos([...todos, { id: idGenerator(), text, isCompleted: false }]);
  };

  const updateTodo = (todo: TodoItemModel, willReorder: boolean) => {
    const todoIndex = todos.findIndex((t) => t.id === todo.id);
    if (todoIndex == -1) return;
    if (todo.isCompleted) {
      const filteredTodos = todos.filter((t) => t.id !== todo.id);
      if (willReorder) setTodos([...filteredTodos, todo]);
    } else {
      todos[todoIndex] = todo;
      setTodos([...todos]);
    }
  };

  const deleteTodo = (todoId: TodoItemModel['id']) => {
    setTodos(todos.filter((t) => t.id !== todoId));
  };

  return [todos, addTodo, updateTodo, deleteTodo] as const;
}
