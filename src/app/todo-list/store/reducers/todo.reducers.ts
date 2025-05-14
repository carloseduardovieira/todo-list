import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  allTodoLoaded,
  removeTodo,
  updateTodo,
} from '../actions/todo.actions';
import { Todo } from '../models/todo.model';

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(allTodoLoaded, (state, { todoList }) => [...todoList]),
  on(addTodo, (state, { todo }) => [...state, todo]),
  on(updateTodo, (state, { todo }) =>
    state.map((t) => (t.id === todo.id ? { ...todo } : t))
  ),
  on(removeTodo, (state, { id }) => state.filter((todo) => todo.id !== id))
);
