import { createFeatureSelector } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const selectTodos = createFeatureSelector<Todo[]>('todos');
