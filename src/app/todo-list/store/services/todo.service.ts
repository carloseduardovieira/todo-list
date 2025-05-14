import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {}

  getTodos(): Observable<Todo[]> {
    return of([
      { id: 1, title: 'Go shopping', completed: false },
      { id: 2, title: 'Save money', completed: true },
      { id: 3, title: 'Build a Todo App', completed: true },
    ]);
  }

  createTodo(todo: Todo): Observable<Todo> {
    const newTodo = { ...todo, id: Date.now() };
    this.todos.push(newTodo);
    return of(newTodo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    return of(todo);
  }

  deleteTodo(id: number): Observable<void> {
    this.todos = this.todos.filter((t) => t.id !== id);
    return of();
  }
}
