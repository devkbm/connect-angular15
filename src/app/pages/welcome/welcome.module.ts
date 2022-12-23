import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import ko from '@angular/common/locales/ko';
registerLocaleData(ko);
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';
import { DutyDateListComponent } from './duty-date-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule,
    NzCheckboxModule,
    WelcomeRoutingModule
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
