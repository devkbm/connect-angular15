import { SessionManager } from 'src/app/core/session-manager';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ResponseObject } from 'src/app/core/model/response-object';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';

import { WorkCalendar } from './work-calendar.model';
import { WorkCalendarMember } from './work-calendar-member.model';
import { WorkCalendarService } from './work-calendar.service';

import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';


@Component({
  selector: 'app-work-calendar-form',
  templateUrl: './work-calendar-form.component.html',
  styleUrls: ['./work-calendar-form.component.css']
})
export class WorkCalendarFormComponent extends FormBase implements OnInit, AfterViewInit {

  workGroupList: any;
  memberList: any;
  color: any;
  preset_colors = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)'];

  @ViewChild('workCalendarName') workCalendarName?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private workGroupService: WorkCalendarService) {
    super();

    this.fg = this.fb.group({
      workCalendarId    : new FormControl<number | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      workCalendarName  : new FormControl<string | null>(null, { validators: [Validators.required] }),
      color             : new FormControl<string | null>(null),
      memberList        : new FormControl<any | null>(null),
  });
  }

  ngOnInit(): void {
    this.getAllMember();

    this.newForm();
  }

  ngAfterViewInit(): void {
    this.workCalendarName?.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.get('memberList')?.setValue([SessionManager.getUserId()]);
  }

  modifyForm(formData: WorkCalendar): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: number): void {
    this.workGroupService.getWorkGroup(id)
        .subscribe(
          (model: ResponseObject<WorkCalendar>) => {
            if (model.data) {
              this.modifyForm(model.data);
              this.color = model.data.color;
            } else {
              this.newForm();
            }
          }
        );
  }

  save(): void {
    this.workGroupService
        .saveWorkGroup(this.fg.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkCalendar>) => {
              this.formSaved.emit(this.fg.getRawValue());
            }
        );
  }

  remove(id: number): void {
    this.workGroupService.deleteWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkCalendar>) => {
              this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  getAllMember(): void {
    this.workGroupService.getMemberList()
        .subscribe(
            (model: ResponseList<WorkCalendarMember>) => {
              if (model.data) {
                  this.memberList = model.data;
              } else {
                  this.memberList = [];
              }
          }
        );
  }

  selectColor(color: any): void {
    this.fg.get('color')?.setValue(color);
  }

}
