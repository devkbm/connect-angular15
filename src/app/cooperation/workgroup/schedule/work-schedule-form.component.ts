import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';

import { WorkGroupSchedule } from './workgroup-schedule.model';
import { WorkScheduleService } from './work-schedule.service';
import { WorkGroup } from '../work-group/workgroup.model';

import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { TimeFormat } from 'src/app/shared/nz-input-datetime/nz-input-datetime.component';

import * as dateFns from "date-fns";
import { WorkGroupService } from '../work-group/workgroup.service';


export interface NewFormValue {
  workGroupId: number;
  start: Date;
  end: Date;
}

@Component({
selector: 'app-work-schedule-form',
templateUrl: './work-schedule-form.component.html',
styleUrls: ['./work-schedule-form.component.css']
})
export class WorkScheduleFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('text', {static: true}) text!: NzInputTextareaComponent;
  @Input() override initLoadId: number = -1;
  @Input() newFormValue?: NewFormValue;

  timeFormat: TimeFormat = TimeFormat.HourMinute;

  workGroupList: WorkGroup[] = [];

  constructor(private fb: FormBuilder,
              private service: WorkScheduleService,
              private workGroupService: WorkGroupService) {
    super();

    this.fg = this.fb.group({
      id              : new FormControl<string | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      text            : new FormControl<string | null>(null, { validators: [Validators.required] }),
      start           : new FormControl<string | null>(null),
      end             : new FormControl<string | null>(null),
      allDay          : new FormControl<boolean | null>(null),
      workGroupId     : new FormControl<string | null>(null, { validators: [Validators.required] })
    });
  }

  ngOnInit(): void {
    this.getMyWorkGroupList();

    if (this.initLoadId > 0) {
      this.get(this.initLoadId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.newFormValue) {
      this.newForm(this.newFormValue);
    }
  }

  ngAfterViewInit(): void {
    this.text?.focus();
  }

  newForm(params: NewFormValue): void {
    this.formType = FormType.NEW;

    // 30분 단위로 입력받기 위해 초,밀리초 초기화
    params.start.setSeconds(0);
    params.start.setMilliseconds(0);
    params.end.setSeconds(0);
    params.end.setMilliseconds(0);

    this.fg.get('workGroupId')?.setValue(Number.parseInt(params.workGroupId.toString(),10));
    this.fg.get('start')?.setValue(dateFns.format(params.start, "yyyy-MM-dd HH:mm:ss"));
    this.fg.get('end')?.setValue(dateFns.format(params.end, "yyyy-MM-dd HH:mm:ss"));
  }

  modifyForm(formData: WorkGroupSchedule): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: number): void {
    this.service.getWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
              if (model.data) {
                console.log(model.data);
                this.modifyForm(model.data);
              }
            }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .saveWorkGroupSchedule(this.fg.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
              this.formSaved.emit(this.fg.getRawValue());
            }
        );
  }

  remove(id: number): void {
    this.service.deleteWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
              this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkGroup>) => {
            if (model.total > 0) {
                this.workGroupList = model.data;
            } else {
                this.workGroupList = [];
            }
            //this.appAlarmService.changeMessage(model.message);
          }
        );
  }
}
