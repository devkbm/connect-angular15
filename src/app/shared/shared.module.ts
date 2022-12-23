import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG MODULES */
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

/* Angular Material */
import { MatListModule } from '@angular/material/list';

import { NzInputTextComponent } from './nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from './nz-input-textarea/nz-input-textarea.component';
import { NzInputNumberCustomComponent } from './nz-input-number-custom/nz-input-number-custom.component';
import { NzSelectCustomComponent } from './nz-select-custom/nz-select-custom.component';
import { NzCrudButtonGroupComponent } from './nz-crud-button-group/nz-crud-button-group.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeSelectCustomComponent } from './nz-tree-select-custom/nz-tree-select-custom.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputDateComponent } from './nz-input-date/nz-input-date.component';
import { NzInputSelectComponent } from './nz-input-select/nz-input-select.component';
import { NzInputTreeSelectComponent } from './nz-input-tree-select/nz-input-tree-select.component';
import { NzInputColorPickerComponent } from './nz-input-color-picker/nz-input-color-picker.component';
import { NzInputCkeditorComponent } from './nz-input-ckeditor/nz-input-ckeditor.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { ColorPickerModule } from 'ngx-color-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzFileUploadComponent } from './nz-file-upload/nz-file-upload.component';
import { NzDeptTreeSelectComponent } from './nz-dept-tree-select/nz-dept-tree-select.component';
import { DeptHierarchyService } from './nz-dept-tree-select/dept-hierarchy.service';
import { NzInputSwitchComponent } from './nz-input-switch/nz-input-switch.component';
import { NzInputCheckboxComponent } from './nz-input-checkbox/nz-input-checkbox.component';
import { NzSearchAreaComponent } from './nz-search-area/nz-search-area.component';
import { NzPageHeaderCustomComponent } from './nz-page-header-custom/nz-page-header-custom.component';
import { NzButtonsComponent } from './nz-buttons/nz-buttons.component';
import { NzInputDateTimeComponent } from './nz-input-datetime/nz-input-datetime.component';
import { NzInputDeptSelectComponent } from './nz-input-dept-select/nz-input-dept-select.component';
import { RouterModule } from '@angular/router';


import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask'
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null

import { NzInputRregnoComponent } from './nz-input-rregno/nz-input-rregno.component';
import { NzListRoadAddressComponent } from './nz-list-road-address/nz-list-road-address.component';
import { RoadAddressService } from './nz-list-road-address/road-address.service';
import { NzInputSelectStaffComponent } from './nz-input-select-staff/nz-input-select-staff.component';
import { NzInputMobileComponent } from './nz-input-mobile/nz-input-mobile.component';
import { NzInputRadioGroupComponent } from './nz-input-radio-group/nz-input-radio-group.component';
import { NzInputDeptTreeSelectComponent } from './nz-input-dept-tree-select/nz-input-dept-tree-select.component';

const nzModules = [
  NzPageHeaderModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzSelectModule,
  NzButtonModule,
  NzDividerModule,
  NzPopconfirmModule,
  NzIconModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzUploadModule,
  NzSwitchModule,
  NzCheckboxModule,
  NzDropDownModule,
  NzBreadCrumbModule,
  NzMessageModule,
  NzListModule,
  NzTypographyModule,
  NzPaginationModule,
  NzRadioModule
]

const matModules = [
  MatListModule
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    matModules,
    ColorPickerModule,
    CKEditorModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  declarations: [
    NzPageHeaderCustomComponent,
    NzSearchAreaComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzInputNumberCustomComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent,
    NzTreeSelectCustomComponent,
    NzInputDateComponent,
    NzInputDateTimeComponent,
    NzInputSelectComponent,
    NzInputTreeSelectComponent,
    NzFileUploadComponent,
    NzInputColorPickerComponent,
    NzInputCkeditorComponent,
    NzDeptTreeSelectComponent,
    NzInputSwitchComponent,
    NzInputCheckboxComponent,
    NzButtonsComponent,
    NzInputDeptSelectComponent,
    NzInputRregnoComponent,
    NzListRoadAddressComponent,
    NzInputSelectStaffComponent,
    NzInputMobileComponent,
    NzInputRadioGroupComponent,
    NzInputDeptTreeSelectComponent
   ],
  providers: [
    DeptHierarchyService,
    RoadAddressService,
    provideNgxMask()
  ],
  exports: [
    NzSearchAreaComponent,
    NzPageHeaderCustomComponent,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzInputNumberCustomComponent,
    NzSelectCustomComponent,
    NzCrudButtonGroupComponent,
    NzTreeSelectCustomComponent,
    NzInputDateComponent,
    NzInputDateTimeComponent,
    NzInputSelectComponent,
    NzInputTreeSelectComponent,
    NzFileUploadComponent,
    NzInputColorPickerComponent,
    NzInputCkeditorComponent,
    NzDeptTreeSelectComponent,
    NzInputSwitchComponent,
    NzInputCheckboxComponent,
    NzButtonsComponent,
    NzInputDeptSelectComponent,
    NzInputRregnoComponent,
    NzListRoadAddressComponent,
    NzInputSelectStaffComponent,
    NzInputMobileComponent,
    NzInputRadioGroupComponent,
    NzInputDeptTreeSelectComponent
  ]
})
export class SharedModule { }
