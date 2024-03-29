import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { TeamService } from './team.service';
import { TeamJoinableUserModel, TeamModel } from './team.model';
import { ResponseList } from 'src/app/core/model/response-list';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-team-form',
  template: `
    <form nz-form [formGroup]="fg" nzLayout="vertical">
      <!-- 폼 오류 메시지 템플릿 -->
      <ng-template #errorTpl let-control>
        <ng-container *ngIf="control.hasError('required')">
          필수 입력 값입니다.
        </ng-container>
        <ng-container *ngIf="control.hasError('exists')">
          기존 코드가 존재합니다.
        </ng-container>
      </ng-template>

      <div nz-row nzGutter="8">
        <div nz-col nzSpan="8">
          <app-nz-input-text
            formControlName="teamId" itemId="teamId"
            placeholder="팀ID는 자동으로 생성됩니다."
            [required]="true" [readonly]="true" [nzErrorTip]="errorTpl">팀ID
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="8">
          <app-nz-input-text #teamName
            formControlName="teamName" itemId="teamName"
            placeholder="팀 이름을 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">팀명
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="8">
          <app-nz-input-select
            formControlName="memberList" itemId="memberList"
            [options]="members" [opt_value]="'id'" [opt_label]="'name'" [mode]="'multiple'"
            placeholder="팀원을 선택해주세요."
            [nzErrorTip]="errorTpl">팀원
          </app-nz-input-select>
        </div>
      </div>
    </form>

    <div class="footer">
      <app-nz-crud-button-group
        [searchVisible]="false"
        [isSavePopupConfirm]="false"
        (closeClick)="closeForm()"
        (saveClick)="save()"
        (deleteClick)="remove()">
      </app-nz-crud-button-group>
    </div>
  `,
  styles: [`
    [nz-button] {
      margin-right: 8px;
    }

    .footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-top: 1px solid rgb(232, 232, 232);
      padding: 10px 16px;
      text-align: right;
      left: 0px;
      /*background: #fff;*/
    }
  `]
})
export class TeamFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('teamName') teamName?: NzInputTextComponent;

  override fg = this.fb.group({
    teamId      : new FormControl<string | null>(null, { validators: [Validators.required] }),
    teamName    : new FormControl<string | null>(null, { validators: [Validators.required] }),
    memberList  : new FormControl<string[] | null>(null)
  });

  members: TeamJoinableUserModel[] = [];

  constructor(private fb: FormBuilder,
              private service: TeamService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {
    this.getMembers();

    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    if (this.formType === FormType.NEW) {
      this.teamName?.focus();
    } else {
      this.teamName?.focus();
    }


  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  newForm(): void {
    this.formType = FormType.NEW;
    this.fg.reset();

    this.fg.controls.teamId.disable();

  }

  modifyForm(formData: TeamModel): void {
    this.formType = FormType.MODIFY;
    this.fg.controls.teamId.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<TeamModel>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<TeamModel>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .remove(this.fg.getRawValue().teamId!)
        .subscribe(
          (model: ResponseObject<TeamModel>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getMembers() {
    this.service
        .getAllUserList()
        .subscribe(
          (model: ResponseList<TeamJoinableUserModel>) => {
            if (model.total > 0) {
              this.members = model.data;
            }
          }
        )
  }

}
