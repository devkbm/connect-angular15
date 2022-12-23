import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { TodoGroupModel } from './todo-group.model';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-group-list',
  template: `
    <button (click)="addTodoGroup()">add</button>

    <div *ngFor="let todoGroup of todoGroupList; index as i" (click)="selectTodoGroup(todoGroup)">
      <label>{{todoGroup.todoGroupName}}</label>
    </div>
  `,
  styles: []
})
export class TodoGroupListComponent implements OnInit {

  todoGroupList: TodoGroupModel[] = [];

  @Output() onSelectedTodoGroup = new EventEmitter();

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.getTodoGroupList();
  }

  addTodoGroup(): void {
    this.service.newTodoGroup()
                .subscribe(
                  (model: ResponseObject<TodoGroupModel>) => {
                    if (model === null || model === undefined) return;

                    this.todoGroupList.push(model.data);
                    this.onSelectedTodoGroup.emit(model.data);
                  });
  }

  getTodoGroupList(): void {
    this.service.getMyTodoGroupList()
                .subscribe(
                  (model: ResponseList<TodoGroupModel>) => {
                    if (model === null || model === undefined) return;
                    console.log(model);
                    this.todoGroupList = model.data;
                  }
                );
  }

  selectTodoGroup(e: TodoGroupModel): void {
    this.onSelectedTodoGroup.emit(e);
    console.log(e);
  }
}
