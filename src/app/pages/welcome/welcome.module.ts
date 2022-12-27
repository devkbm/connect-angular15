import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import ko from '@angular/common/locales/ko';
registerLocaleData(ko);
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';
import { DutyDateListComponent } from './duty-date-list.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzButtonsComponent } from 'src/app/shared/nz-buttons/nz-buttons.component';
import { NzInputCheckboxComponent } from 'src/app/shared/nz-input-checkbox/nz-input-checkbox.component';
import { NzInputCkeditorComponent } from 'src/app/shared/nz-input-ckeditor/nz-input-ckeditor.component';
import { NzInputDateComponent } from 'src/app/shared/nz-input-date/nz-input-date.component';
import { NzInputDateTimeComponent } from 'src/app/shared/nz-input-datetime/nz-input-datetime.component';
import { NzInputDeptSelectComponent } from 'src/app/shared/nz-input-dept-select/nz-input-dept-select.component';
import { NzInputMobileComponent } from 'src/app/shared/nz-input-mobile/nz-input-mobile.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';
import { NzInputRadioGroupComponent } from 'src/app/shared/nz-input-radio-group/nz-input-radio-group.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { NzInputTreeSelectComponent } from 'src/app/shared/nz-input-tree-select/nz-input-tree-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    NzCheckboxModule,
    WelcomeRoutingModule,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzButtonsComponent,
    NzInputCheckboxComponent,
    NzInputCkeditorComponent,
    NzInputDateComponent,
    NzInputDateTimeComponent,
    NzInputDeptSelectComponent,
    NzInputMobileComponent,
    NzInputNumberCustomComponent,
    NzInputRadioGroupComponent,
    NzInputSelectComponent,
    NzInputTreeSelectComponent
  ],
  declarations: [
    WelcomeComponent,
    DutyDateListComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR }
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
