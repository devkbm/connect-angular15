import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

import { MenuService } from './menu.service';
import { Menu } from './menu.model';
import { MenuHierarchy } from './menu-hierarchy.model';
import { MenuGroup } from './menu-group.model';
import { existingMenuValidator } from './menu-duplication-validator.directive';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('menuCode') menuCode!: NzInputTextComponent;
  @Input() menuGroupId: any;

  programList: any;
  menuGroupList: any;
  menuTypeList: any;

  /**
   * 상위 메뉴 트리
   */
  menuHiererachy: MenuHierarchy[] = [];

  override fg = this.fb.group({
      menuGroupId       : new FormControl<string | null>(null, { validators: Validators.required }),
      menuId            : new FormControl<string | null>(null, {
        validators: Validators.required,
        asyncValidators: [existingMenuValidator(this.menuService)],
        updateOn: 'blur'
      }),
      menuCode          : new FormControl<string | null>(null, { validators: Validators.required }),
      menuName          : new FormControl<string | null>(null, { validators: Validators.required }),
      menuType          : new FormControl<string | null>(null, { validators: Validators.required }),
      parentMenuId      : new FormControl<string | null>(null),
      sequence          : new FormControl<number | null>(null),
      appUrl            : new FormControl<string | null>(null, { validators: Validators.required })
    });

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) {
    super();
  }

  ngOnInit() {
    this.getMenuTypeList();
    this.getMenuGroupList();
  }

  ngAfterViewInit(): void {
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.getMenuHierarchy(this.menuGroupId);

    this.fg.controls.menuGroupId.setValue(this.menuGroupId);
    this.fg.controls.menuId.disable();
    this.fg.controls.menuCode.valueChanges.subscribe(x => {
      if (x) {
        const menuGroupId = this.fg.controls.menuGroupId.value;
        this.fg.controls.menuId.setValue(menuGroupId + x);
        this.fg.controls.menuId.markAsTouched();
      } else {
        this.fg.controls.menuId.setValue(null);
      }
    });

    this.menuCode.focus();
  }

  modifyForm(formData: Menu): void {
    this.formType = FormType.MODIFY;

    this.getMenuHierarchy(formData.menuGroupId!);
    this.fg.controls.menuId.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(menuId: string) {

    this.menuService
        .getMenu(menuId)
        .subscribe(
          (model: ResponseObject<Menu>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save() {
    if (this.fg.invalid) {
      this.checkForm()
      return;
    }

    this.menuService
        .registerMenu(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Menu>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove(): void {
    this.menuService
        .deleteMenu(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Menu>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  getMenuHierarchy(menuGroupId: string): void {
    if (!menuGroupId) return;

    this.menuService
        .getMenuHierarchy(menuGroupId)
        .subscribe(
          (model: ResponseList<MenuHierarchy>) => {
            if ( model.total > 0 ) {
              this.menuHiererachy = model.data;
            } else {
              this.menuHiererachy = [];
            }
          }
        );
  }

  getMenuGroupList(): void {
    this.menuService
        .getMenuGroupList()
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
            if (model.total > 0) {
              this.menuGroupList = model.data;
            } else {
              this.menuGroupList = [];
            }
          }
        );
  }

  getMenuTypeList(): void {
    this.menuService
        .getMenuTypeList()
        .subscribe(
          (model: ResponseList<any>) => {
            if (model.total > 0) {
              this.menuTypeList = model.data;
            } else {
              this.menuTypeList = [];
            }
          }
        );
  }

  selectMenuGroup(menuGroupId: any): void {
    if (!menuGroupId) return;

    this.getMenuHierarchy(menuGroupId);
  }

}
