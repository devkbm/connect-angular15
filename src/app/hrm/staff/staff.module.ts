import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';

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
  NzRadioModule,
  NzIconModule,
  NzCollapseModule,
  NzDescriptionsModule,
  NzListModule
]

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';
/* SHARE MODULE */
import { SharedModule } from 'src/app/shared/shared.module';

import { StaffRegistFormComponent } from './staff-regist-form.component';
import { StaffAppointmentRecordFormComponent } from './staff-appointment-record/staff-appointment-record-form.component';
import { StaffAppointmentRecordGridComponent } from './staff-appointment-record/staff-appointment-record-grid.component';
import { NewStaffFormComponent } from './new-staff-form/new-staff-form.component';
import { StaffGridComponent } from './staff-grid.component';
import { StaffManagementComponent } from './staff-management.component';
import { StaffCurrentAppointmentDescriptionComponent } from './staff-current-appointment-description.component';
import { StaffDutyResponsibilityFormComponent } from './staff-duty-responsibility/staff-duty-responsibility-form.component';
import { StaffDutyResponsibilityListComponent } from './staff-duty-responsibility/staff-duty-responsibility-list.component';
import { StaffContactFormComponent } from './staff-contact/staff-contact-form.component';
import { StaffFamilyFormComponent } from './staff-family/staff-family-form.component';
import { StaffFamilyGridComponent } from './staff-family/staff-family-grid.component';
import { StaffLicenseFormComponent } from './staff-license/staff-license-form.component';
import { StaffLicenseGridComponent } from './staff-license/staff-license-grid.component';
import { StaffSchoolCareerFormComponent } from './staff-school-career/staff-school-career-form.component';
import { StaffSchoolCareerGridComponent } from './staff-school-career/staff-school-career-grid.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StaffCardListComponent } from './staff-card/staff-card-list.component';



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
    StaffRegistFormComponent,
    StaffAppointmentRecordFormComponent,
    StaffAppointmentRecordGridComponent,
    NewStaffFormComponent,
    StaffGridComponent,
    StaffCurrentAppointmentDescriptionComponent,
    StaffDutyResponsibilityFormComponent,
    StaffDutyResponsibilityListComponent,
    StaffContactFormComponent,
    StaffManagementComponent,
    StaffFamilyFormComponent,
    StaffFamilyGridComponent,
    StaffLicenseFormComponent,
    StaffLicenseGridComponent,
    StaffSchoolCareerFormComponent,
    StaffSchoolCareerGridComponent,
    StaffCardListComponent,
    StaffCardComponent
  ],
  exports: [
    StaffRegistFormComponent,
    StaffAppointmentRecordFormComponent,
    StaffManagementComponent
  ]
})
export class StaffModule { }
