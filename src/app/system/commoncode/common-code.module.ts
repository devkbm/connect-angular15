import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from '../../core/interceptor/custom-http-interceptor';
import { SharedModule } from 'src/app/shared/shared.module';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

/* Inner Component */
import { CommonCodeService } from './common-code.service';
import { CommonCodeComponent } from './common-code.component';
import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeGridComponent } from './common-code-grid.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';

const nzModules = [
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzInputNumberModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTreeSelectModule,
  NzButtonModule,
  NzIconModule,
  NzCheckboxModule,
  NzBreadCrumbModule,
  NzDatePickerModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    AgGridModule,
    ...nzModules,
    SharedModule
  ],
  declarations: [
    CommonCodeFormComponent,
    CommonCodeGridComponent,
    CommonCodeTreeComponent,
    CommonCodeComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    CommonCodeService
  ],
  exports: [
    CommonCodeComponent,
    CommonCodeTreeComponent
  ]
})
export class CommonCodeModule { }
