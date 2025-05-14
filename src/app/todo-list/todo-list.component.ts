import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, removeTodo, updateTodo } from './store/actions/todo.actions';
import { Todo } from './store/models/todo.model';
import { selectTodos } from './store/selectors/todo.selectors';

@Component({
  selector: 'todo-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  todos$: Observable<Todo[]> = this.store.select(selectTodos);
  todoForm: FormGroup;
  editingTodo: Todo | null = null;

  constructor() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  saveTodo() {
    const title = this.todoForm.value.title;

    if (this.editingTodo) {
      const updatedTodo = { ...this.editingTodo, title };
      this.store.dispatch(updateTodo({ todo: updatedTodo }));
      this.editingTodo = null;
    } else {
      const newTodo: Todo = { id: Date.now(), title, completed: false };
      this.store.dispatch(addTodo({ todo: newTodo }));
    }

    this.todoForm.reset();
  }

  editTodo(todo: Todo) {
    this.editingTodo = todo;
    this.todoForm.patchValue({ title: todo.title });
  }

  markAsDone(todo: Todo) {
    const updatedTodo = { ...todo, completed: true };
    this.store.dispatch(updateTodo({ todo: updatedTodo }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(removeTodo({ id }));
  }
}
