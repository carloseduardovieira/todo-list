import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTodoList } from './store/actions/todo.actions';

export const todoListResolver: ResolveFn<boolean> = () => {
  const store = inject(Store);
  store.dispatch(loadTodoList());
  return true;
};
