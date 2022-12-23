import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmRoutingModule } from './hrm-routing.module';
import { DutyApplicationModule } from './duty-application/duty-application.module';
import { HrmCodeModule } from './hrm-code/hrm-code.module';
import { StaffModule } from './staff/staff.module';

@NgModule({
  imports: [
    CommonModule,
    HrmRoutingModule,
    DutyApplicationModule,
    HrmCodeModule,
    StaffModule
  ],
  declarations: []
})
export class HrmModule { }


