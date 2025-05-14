import { Routes } from '@angular/router';
import { todoListResolver } from './todo-list/todo-list.resolver';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      ),
    resolve: [todoListResolver],
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
