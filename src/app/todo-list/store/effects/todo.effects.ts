import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  addTodo,
  allTodoLoaded,
  loadTodoList,
  operationFailure,
  operationSuccess,
  removeTodo,
  updateTodo,
} from '../actions/todo.actions';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoList),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todoList) => allTodoLoaded({ todoList })),
          catchError((error) => of(operationFailure({ error: error.message })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ todo }) =>
        this.todoService.createTodo(todo).pipe(
          map((savedTodo: Todo) => operationSuccess({ todo: savedTodo })),
          catchError((error) => of(operationFailure({ error: error.message })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map((updatedTodo: Todo) => operationSuccess({ todo: updatedTodo })),
          catchError((error) => of(operationFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() =>
            operationSuccess({ todo: { id, title: '', completed: false } })
          ),
          catchError((error) => of(operationFailure({ error: error.message })))
        )
      )
    )
  );
}
