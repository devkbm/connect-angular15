import { SessionManager } from 'src/app/core/session-manager';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ResponseObject } from 'src/app/core/model/response-object';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';

import { WorkGroupService } from './workgroup.service';
import { WorkGroup } from './workgroup.model';
import { WorkGroupMember } from './workgroup-member.model';

import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
selector: 'app-workgroup-form',
templateUrl: './workgroup-form.component.html',
styleUrls: ['./workgroup-form.component.css']
})
export class WorkGroupFormComponent extends FormBase implements OnInit, AfterViewInit {

  workGroupList: any;
  memberList: any;
  color: any;
  preset_colors = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)'];

  @ViewChild('workGroupName') workGroupName?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private workGroupService: WorkGroupService) {
    super();

    this.fg = this.fb.group({
      workGroupId     : new FormControl<number | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      workGroupName   : new FormControl<string | null>(null, { validators: [Validators.required] }),
      color           : new FormControl<string | null>(null),
      memberList      : new FormControl<any | null>(null),
  });
  }

  ngOnInit(): void {
    this.getAllMember();

    this.newForm();
  }

  ngAfterViewInit(): void {
    this.workGroupName?.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.get('memberList')?.setValue([SessionManager.getUserId()]);
  }

  modifyForm(formData: WorkGroup): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: number): void {
    this.workGroupService.getWorkGroup(id)
        .subscribe(
          (model: ResponseObject<WorkGroup>) => {
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
            (model: ResponseObject<WorkGroup>) => {
              this.formSaved.emit(this.fg.getRawValue());
            }
        );
  }

  remove(id: number): void {
    this.workGroupService.deleteWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
              this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }  

  getAllMember(): void {
    this.workGroupService.getMemberList()
        .subscribe(
            (model: ResponseList<WorkGroupMember>) => {
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
