import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import ko from '@angular/common/locales/ko';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalProperty } from './core/global-property';
import { AppInjector } from './core/app/app-injector.service';

import { BoardModule } from './cooperation/board/board.module';
import { CommunicationModule } from './cooperation/communication/communication.module';
import { SurveyModule } from './cooperation/survey/survey.module';
import { WorkgroupModule } from './cooperation/workgroup/workgroup.module';
import { StaffModule } from './hrm/staff/staff.module';
import { TodoModule } from './cooperation/todo/todo.module';
import { HrmCodeModule } from './hrm/hrm-code/hrm-code.module';
import { DutyApplicationModule } from './hrm/duty-application/duty-application.module';
import { TeamModule } from './cooperation/team/team.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';

registerLocaleData(ko);

/*
import * as AllIcons from '@ant-design/icons-angular/icons';
const antDesignIcons = AllIcons as {
     [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
*/

import { AccountBookFill, AlertFill, AlertOutline, MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill, MenuFoldOutline, MenuUnfoldOutline ];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NzIconModule.forRoot(icons),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'}),
    BrowserAnimationsModule,
    CoreModule,
    NzLayoutModule,
    LoginModule,
    NzMenuModule,
    AppRoutingModule
    /*
    BoardModule,
    CommunicationModule,
    SurveyModule,
    WorkgroupModule,
    HrmCodeModule,
    StaffModule,
    TodoModule,
    DutyApplicationModule,
    TeamModule
    */
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    GlobalProperty
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}
