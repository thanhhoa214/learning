import { useRef, useState } from 'react';
import { TodoItemModel } from '../../models/TodoItem';
import { CustomRadio, EdittingInput, StyledTodoItem } from './TodoItem.style';

export interface TodoItemProps {
  todo: TodoItemModel;
  onDeleteTodo: (todo: TodoItemModel) => void;
  onUpdateTodo: (todo: TodoItemModel, willReorder: boolean) => void;
  onToggleEdittingMode: () => void;
}

export function TodoItem({
  todo,
  onDeleteTodo,
  onUpdateTodo,
  onToggleEdittingMode,
}: TodoItemProps) {
  const [text, setText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const exitEditMode = () => {
    inputRef.current?.blur();
    onToggleEdittingMode();
  };
  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setText(event.currentTarget.value);
  };
  const handleCheck = () => {
    if (inputRef.current?.value === '') return;
    todo.isCompleted = !todo.isCompleted;
    onUpdateTodo(todo, true);
  };
  const handleEdit = () => onToggleEdittingMode();
  const handleCancelEditting = () => {
    if (inputRef.current) inputRef.current.value = todo.text;
    exitEditMode();
  };

  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!inputRef.current) return;
    switch (event.key) {
      case 'Enter':
        onUpdateTodo({ ...todo, text: inputRef.current.value }, false);
        exitEditMode();
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'Escape':
        handleCancelEditting();
        break;
      case 'Backspace':
        if (inputRef.current.value === '') onDeleteTodo(todo);
        break;
    }
  };

  return (
    <StyledTodoItem>
      <CustomRadio onClick={handleCheck} $completed={todo.isCompleted}>
        <span>√</span>
      </CustomRadio>
      <EdittingInput
        ref={inputRef}
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeydown}
        onClick={handleEdit}
        onBlur={handleCancelEditting}
      />
    </StyledTodoItem>
  );
}
