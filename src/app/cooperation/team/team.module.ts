import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

const nzModules = [
  NzFormModule,
  NzButtonModule
]

import { SharedModule } from 'src/app/shared/shared.module';

import { TeamComponent } from './team.component';
import { TeamFormComponent } from './team-form.component';

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
    TeamFormComponent,
    TeamComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
  ],
  exports: [
    TeamComponent
  ]
})
export class TeamModule { }
