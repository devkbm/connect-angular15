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

import { TeamComponent } from './team.component';
import { TeamFormComponent } from './team-form.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzCrudButtonGroupComponent } from 'src/app/shared/nz-crud-button-group/nz-crud-button-group.component';
import { NzInputSelectComponent } from 'src/app/shared/nz-input-select/nz-input-select.component';
import { TeamGridComponent } from './team-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    nzModules,
    AgGridModule,
    NzInputTextComponent,
    NzCrudButtonGroupComponent,
    NzInputSelectComponent,
    TeamGridComponent
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
