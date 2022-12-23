import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { HolidayGridComponent } from './holiday-grid.component';
import { HolidayService } from './holiday.service';
import { Holiday } from './holiday.model';


@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent extends AppBase implements OnInit {

  @ViewChild('holidayGrid') grid!: HolidayGridComponent;  
    
  query: { key: string, value: string, list: {label: string, value: string}[], year: Date } = {
    key: 'resourceCode',
    value: '',
    list: [
      {label: '휴일명', value: 'resourceCode'},
      {label: '비고', value: 'description'}      
    ],
    year: new Date()
  }  

  drawerHoliday: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  constructor(location: Location,
              private service: HolidayService,
              private appAlarmService: AppAlarmService,
              private datePipe: DatePipe) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerHoliday.visible = true;
  }

  closeDrawer(): void {
    this.drawerHoliday.visible = false;
  }

  getHolidayList(): void {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    const date: Date = this.query.year;    

    this.closeDrawer();
    this.grid.getGridList(date.getFullYear()+'0101', date.getFullYear()+'1231');
  }

  newHoliday(): void {
    this.drawerHoliday.initLoadId = null;
    this.openDrawer();    
  }
  
  deleteHoliday(): void {    
    const date = this.grid.getSelectedRows()[0].date;    
    this.delete(date);
  }

  delete(date: Date): void {
    const id = this.datePipe.transform(date, 'yyyyMMdd') as string;
    if (id === null) return;

    this.service
        .deleteHoliday(id)
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);            
            this.getHolidayList();
          }
        );
  }

  holidayGridRowClicked(item: any): void {
    this.drawerHoliday.initLoadId = item.date;
  }

  edit(item: any): void {
    this.drawerHoliday.initLoadId = item.date;
    this.openDrawer();        
  }
}
