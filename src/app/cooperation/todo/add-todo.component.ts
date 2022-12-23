import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-add-todo',
  template: `
   <button (click)="addTodo(newText)">+</button>
   <input type="text" placeholder="할 일 추가" [(ngModel)]="newText" (keyup.enter)="addTodo(newText)">
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      background-color: white;
    }

    input {
      display: inline-block;
      font-size: 18px;
      border: none;
    }

    input:focus, botton:focus {
      outline: none;
    }

    button {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      color: white;
      line-height: 17px;
      border: 1px solid darkgray;
      background-color: darkblue;
    }
  `]
})
export class AddTodoComponent implements OnInit {

  @Input() pkTodoGroup: string = '';
  @Output() onTodoAdded = new EventEmitter<TodoModel>();
  newText: string;

  constructor() {
    this.newText = '';
  }

  ngOnInit() {
  }

  addTodo(newText: string) {
    const obj: TodoModel = {pkTodoGroup: this.pkTodoGroup, pkTodo: '', isCompleted: false, todo: newText};
    this.onTodoAdded.emit(obj);
    this.newText= '';
  }

}
