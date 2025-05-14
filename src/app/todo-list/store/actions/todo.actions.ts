import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const loadTodoList = createAction('[Todo] Load Todo List');

export const allTodoLoaded = createAction(
  '[Todo]  All Todo List Loaded',
  props<{ todoList: Todo[] }>()
);

export const addTodo = createAction('[Todo] Add', props<{ todo: Todo }>());

export const updateTodo = createAction(
  '[Todo] Update',
  props<{ todo: Todo }>()
);

export const removeTodo = createAction(
  '[Todo] Remove',
  props<{ id: number }>()
);

export const operationSuccess = createAction(
  '[Todo] Operation Success',
  props<{ todo: Todo }>()
);
export const operationFailure = createAction(
  '[Todo] Operation Failure',
  props<{ error: string }>()
);
