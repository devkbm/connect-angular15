import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodosComponent } from './todos.component';
import { AddTodoComponent } from './add-todo.component';
import { TodoGroupListComponent } from './todo-group-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TodoComponent,
    TodosComponent,
    AddTodoComponent,
    TodoGroupListComponent
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }
