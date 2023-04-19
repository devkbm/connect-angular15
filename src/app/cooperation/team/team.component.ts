import { Component, OnInit, ViewChild } from '@angular/core';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { TeamGridComponent } from './team-grid.component';
import { TeamModel } from './team.model';
import { TeamService } from './team.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @ViewChild(TeamGridComponent) grid!: TeamGridComponent;

  gridList: TeamModel[] = [];

  constructor(private appAlarmService: AppAlarmService,
              private service: TeamService) { }

  ngOnInit() {
    this.getGridList('');
  }

  getGridList(typeId: string): void {
    const params = {
    //  typeId : typeId
    };

    this.service
        .getList(params)
        .subscribe(
          (model: ResponseList<TeamModel>) => {
            if (model.total > 0) {
              this.gridList = model.data;
            } else {
              this.gridList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

}
