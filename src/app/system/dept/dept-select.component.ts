import { Component, Self, Optional, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DeptService } from './dept.service';
import { Dept } from './dept.model';
import { ResponseList } from '../../core/model/response-list';

@Component({
  selector: 'app-dept-select',
  templateUrl: './dept-select.component.html',
  styleUrls: ['./dept-select.component.css']
})
export class DeptSelectComponent implements ControlValueAccessor, OnInit {

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() itemId: string = '';
  @Input() options!: any[];

  @Input() errorTpl: any;

  deptList: Dept[] = [];

  onChange: any = (_:any) => {};
  onTouched: any = () => {};

  _value: any ='';

  constructor(@Self()  @Optional() private ngControl: NgControl,
              private deptService: DeptService) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.getDeptList();
  }

  writeValue(obj: any): void {
    this._value = obj;
    this.onChange(this._value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeFn(obj: any) {
    this.onChange(obj);
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getDeptList(): void {
    const params = {isEnabled: true};

    this.deptService
         .getDeptList(params)
         .subscribe(
          (model: ResponseList<Dept>) => {
            this.deptList = model.data;
          }
      );
  }

}
