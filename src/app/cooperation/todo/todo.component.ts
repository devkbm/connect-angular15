import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-todo',
  template: `
    <input type="checkbox" [checked]="todo?.isCompleted"> <label> {{ todo?.todo }} </label>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      color: darkgray;
      background-color: white;
    }

    input {
      position: relative;
    }

    input:before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 20px;
      position: absolute;
      top: -3px;
      left: -6px;
      border: 1px solid darkgray;
    }

    input:checked:after {
      content: '\\2713';
      display: inline-block;
      font-size: 12px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      top: -3px;
      left: -6px;
      border: 1px solid darkgray;
      backgroud-color: darkgray;
      text-align: center;
      color: white;
    }

    input:checked + label {
      text-decoration: line-through;
    }
  `]
})
export class TodoComponent implements OnInit {

  @Input()todo?: TodoModel;

  constructor() {}

  ngOnInit() {

  }

}
