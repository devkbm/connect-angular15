import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { AppAlarmService } from '../core/service/app-alarm.service';
import { AuthGuardService } from '../core/service/auth-guard.service';

import { AppLayoutComponent } from './app-layout.component';
import { UserPopupComponent } from '../system/user/user-popup.component';
import { UserProfileComponent } from './../system/user/user-profile.component';
import { UserModule } from '../system/user/user.module';

import { AppLayoutService } from './app-layout.service';
import { RouterModule } from '@angular/router';

const nzModules = [
  NzLayoutModule,
  NzMenuModule,
  NzAvatarModule,
  NzIconModule,
  NzSelectModule,
  NzDropDownModule,
  NzBreadCrumbModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserModule,
    nzModules
  ],
  declarations: [
    AppLayoutComponent
  ],
  entryComponents: [
    UserPopupComponent,
    UserProfileComponent
  ],
  providers: [
    AppLayoutService,
    AppAlarmService,
    AuthGuardService
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
