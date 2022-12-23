import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';

const nzModules = [
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTabsModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule,
  NzAvatarModule,
  NzCardModule,
  NzUploadModule,
  NzRadioModule
]

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

import { SharedModule } from 'src/app/shared/shared.module';

import { BizCodeComponent } from './biz-code.component';
import { BizCodeTypeFormComponent } from './biz-code-type-form.component';
import { BizCodeTypeGridComponent } from './biz-code-type-grid.component';
import { BizCodeFormComponent } from './biz-code-form.component';
import { BizCodeGridComponent } from './biz-code-grid.component';
import { BizCodeTypeService } from './biz-code-type.service';
import { BizCodeService } from './biz-code.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    AgGridModule,
    SharedModule
  ],
  declarations: [
    BizCodeTypeFormComponent,
    BizCodeTypeGridComponent,
    BizCodeFormComponent,
    BizCodeGridComponent,
    BizCodeComponent
  ],
  providers: [
    BizCodeTypeService,
    BizCodeService
  ],
  exports: [
    BizCodeComponent
  ]
})
export class BizCodeModule { }
