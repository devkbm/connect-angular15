import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormType, FormBase } from '../../core/form/form-base';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { ResponseList } from '../../core/model/response-list';
import { ResponseObject } from '../../core/model/response-object';

import { UserService } from './user.service';
import { User } from './user.model';
import { Authority } from '../authority/authority.model';
import { MenuGroup } from '../menu/menu-group.model';
import { existingUserValidator } from './user-duplication-validator.directive';

import { DeptHierarchy } from '../dept/dept-hierarchy.model';
import { DeptService } from '../dept/dept.service';
import { GlobalProperty } from 'src/app/core/global-property';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  public authList: any;
  public menuGroupList: any;
  public deptHierarchy: DeptHierarchy[] = [];

  passwordConfirm: string = '';
  popup: boolean = false;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: false
  };

  previewImage: string | undefined = '';
  previewVisible = false;
  uploadUrl: string = GlobalProperty.serverUrl + '/api/system/user/image/';
  imageUploadHeader: any = {
    Authorization: sessionStorage.getItem('token')
    //'x-auth-token': sessionStorage.getItem('token')
    //'Content-Type': 'multipart/form-data'
  };
  uploadParam: any = {};

  imageBase64: any;

  @ViewChild('staffNo') staffNoField!: NzInputTextComponent;

  override fg = this.fb.group({
    userId: new FormControl<string | null>(null, {
      validators: Validators.required,
      asyncValidators: [existingUserValidator(this.userService)],
      updateOn: 'blur'
    }),
    organizationCode: new FormControl<string | null>({ value: null, disabled: true }, { validators: Validators.required }),
    staffNo: new FormControl<string | null>(null),
    name: new FormControl<string | null>({ value: null, disabled: false }, { validators: Validators.required }),
    enabled: new FormControl<boolean>(true),
    deptId: new FormControl<string | null>(null),
    mobileNum: new FormControl<string | null>(null),
    email: new FormControl<string | null>({ value: null, disabled: false }, { validators: Validators.email }),
    imageBase64: new FormControl<string | null>(null),
    authorityList: new FormControl<string[] | null>({ value: null, disabled: false }, { validators: Validators.required }),
    menuGroupList: new FormControl<string[] | null>(null)
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit(): void {
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }

    this.getAuthorityList();
    this.getMenuGroupList();
    this.getDeptHierarchy();
  }

  ngAfterViewInit(): void {
    this.staffNoField.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  newForm(): void {
    this.formType = FormType.NEW;
    this.imageBase64 = null;
    this.previewImage = '';

    this.fg.reset();

    this.fg.controls.userId.setAsyncValidators(existingUserValidator(this.userService));
    this.fg.controls.organizationCode.setValue(sessionStorage.getItem('organizationCode'));
    this.fg.controls.staffNo.valueChanges.subscribe(x => {
      if (x === null) return;
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.controls.userId.setValue(organizationCode + x);
      this.fg.controls.userId.markAsTouched();
    });
    this.fg.controls.enabled.setValue(true);
  }

  modifyForm(formData: User): void {
    this.formType = FormType.MODIFY;

    this.fg.controls.userId.setAsyncValidators(null);

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.value);
  }

  get(userId: string): void {
    this.userService
        .getUser(userId)
        .subscribe(
          (model: ResponseObject<User>) => {
            if (model.total > 0) {
              if (model.data.userId == null) {
                this.newForm();
              } else {
                this.modifyForm(model.data);
              }

              if (model.data.imageBase64 != null) {
                //this.imageBase64 = 'data:image/jpg;base64,' + model.data.imageBase64;
                this.imageBase64 = model.data.imageBase64;
              } else {
                this.imageBase64 = '';
              }

            } else {
              this.fg.reset();
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

    this.userService
        .registerUser(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<User>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.userService
        .deleteUser(this.fg.controls.userId.value!)
        .subscribe(
          (model: ResponseObject<User>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getAuthorityList(): void {
    this.userService
        .getAuthorityList()
        .subscribe(
          (model: ResponseList<Authority>) => {
            if (model.total > 0) {
              this.authList = model.data;
            }
          }
        );
  }

  getMenuGroupList(): void {
    this.userService
        .getMenuGroupList()
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
            if (model.total > 0) {
              this.menuGroupList = model.data;
            }
          }
        );
  }

  getDeptHierarchy(): void {
    this.deptService
        .getDeptHierarchyList()
        .subscribe(
          (model: ResponseList<DeptHierarchy>) => {
            if (model.total > 0) {
              this.deptHierarchy = model.data;
            } else {
              this.deptHierarchy = [];
            }
          }
        );
  }

}
