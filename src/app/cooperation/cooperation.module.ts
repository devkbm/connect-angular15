import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CooperationRoutingModule } from './cooperation-routing.module';

import { BoardModule } from './board/board.module';
import { SurveyModule } from './survey/survey.module';
import { TeamModule } from './team/team.module';
import { TodoModule } from './todo/todo.module';
import { WorkgroupModule } from './workgroup/workgroup.module';

@NgModule({
  imports: [
    CommonModule,
    CooperationRoutingModule,
    BoardModule,
    SurveyModule,
    TeamModule,
    TodoModule,
    WorkgroupModule
  ]
})
export class CooperationModule { }
