import { Component, HostListener, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoItem } from './model';
import { FormsModule } from '@angular/forms';

const idGeneratorFunc = () => {
  let index = 1;
  return () => {
    index++;
    return index;
  };
};
const idGenerator = idGeneratorFunc();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  search = signal('');
  inputtingMode = false;
  inputValue = '';

  edittingId = -1;

  todos = signal<TodoItem[]>([
    { id: idGenerator(), status: 'pending', text: 'Task 1' },
    { id: idGenerator(), status: 'pending', text: 'Task 2' },
    { id: idGenerator(), status: 'completed', text: 'Task 8' },
  ]);

  filteredTodos = computed(() =>
    this.todos().filter((t) => t.text.toLowerCase().includes(this.search()))
  );

  @HostListener('document:keydown.enter')
  onHitEnter() {
    if (this.edittingId === -1) this.inputtingMode = true;
  }

  onChangeSearch(element: EventTarget | null) {
    if (!element) return;
    this.search.set((element as HTMLInputElement).value);
  }

  addTodo(text: string) {
    if (text === '') return;
    this.todos.set([
      ...this.todos(),
      { id: idGenerator(), status: 'pending', text },
    ]);
    this.inputValue = '';
  }

  editTodo(id: TodoItem['id']) {
    this.edittingId = id;
  }

  updateTodo(value: string, element: EventTarget | null) {
    const item = this.todos().find((t) => t.id === this.edittingId);
    if (!item || !element) return;

    item.text = value;
    this.todos.set(this.todos());
    (element as HTMLInputElement).blur();
    this.skipEdittingMode(element);
  }

  cancelEditting(element: EventTarget | null) {
    const item = this.todos().find((t) => t.id === this.edittingId);
    if (!item || !element) return;

    (element as HTMLInputElement).value = item.text;
    this.skipEdittingMode(element);
  }

  updateTodoStatus(id: TodoItem['id']) {
    const itemIndex = this.todos().findIndex((t) => t.id === id);
    if (itemIndex === -1) return;
    const [item] = this.todos().splice(itemIndex, 1);
    const isPending = item.status === 'pending';
    item.status = isPending ? 'completed' : 'pending';
    this.todos.set(
      isPending ? [...this.todos(), item] : [item, ...this.todos()]
    );
  }

  deleteTodo(id: TodoItem['id']) {
    if (this.todos().length === 1)
      return alert('Task list should have at least 1 task');
    this.todos.set(this.todos().filter((t) => t.id !== id));
  }

  private skipEdittingMode(element: EventTarget | null) {
    if (!element) return;
    (element as HTMLInputElement).blur();
    setTimeout(() => (this.edittingId = -1), 0);
  }
}
