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
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ColorPickerModule } from 'ngx-color-picker';
import { AgGridModule } from 'ag-grid-angular';

import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputCheckboxComponent } from 'src/app/shared/nz-input-checkbox/nz-input-checkbox.component';
import { NzInputColorPickerComponent } from 'src/app/shared/nz-input-color-picker/nz-input-color-picker.component';
import { NzInputDateTimeComponent } from 'src/app/shared/nz-input-datetime/nz-input-datetime.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';

import { WorkCalendarComponent } from './work-calendar.component';
import { WorkCalendarEventFormComponent } from './event/work-calendar-event-form.component';
import { WorkCalendarService } from './calendar/work-calendar.service';
import { WorkCalendarEventService } from './event/work-calendar-event.service';
import { WorkCalendarViewComponent } from './calendar-view/work-calendar-view.component';
import { MyWorkCalendarGridComponent } from './calendar/my-work-calendar-grid.component';
import { WorkCalendarFormComponent } from './calendar/work-calendar-form.component';

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
  NzTimePickerModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    AgGridModule,
    CKEditorModule,
    ColorPickerModule,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzCrudButtonGroupComponent,
    NzInputCheckboxComponent,
    NzInputColorPickerComponent,
    NzInputDateTimeComponent,
    NzInputSelectComponent,
    CalendarModule
  ],
  declarations: [
    WorkCalendarComponent,
    WorkCalendarEventFormComponent,
    WorkCalendarFormComponent,
    WorkCalendarViewComponent,
    MyWorkCalendarGridComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    WorkCalendarService,
    WorkCalendarEventService
  ],
  exports: [
    WorkCalendarComponent
  ]
})
export class WorkCalendarModule { }
