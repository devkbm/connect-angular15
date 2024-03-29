import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { ResponseList } from 'src/app/core/model/response-list';

import { DaypilotCalendarComponent, ModeChangedArgs } from 'src/app/shared/calendar/daypilot-calendar.component';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { WorkCalendarEventService } from '../event/work-calendar-event.service';
import { WorkCalendarEvent } from '../event/work-calendar-event.model';

export interface NewDateSelectedArgs {
  workCalendarId: number;
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-work-calendar-view',
  templateUrl: './work-calendar-view.component.html',
  styleUrls: ['./work-calendar-view.component.css']
})
export class WorkCalendarViewComponent implements AfterViewInit {

  @ViewChild(DaypilotCalendarComponent) calendar!: DaypilotCalendarComponent;
  @Input() fkWorkCalendar: number = 0;
  @Output() itemSelected = new EventEmitter();
  @Output() newDateSelected: EventEmitter<NewDateSelectedArgs> = new EventEmitter<NewDateSelectedArgs>();
  @Output() eventDataChanged = new EventEmitter();
  @Output() visibleRangeChanged: EventEmitter<{start: Date, end: Date, date: Date}> = new EventEmitter<{start: Date, end: Date, date: Date}>();
  @Output() modeChanged: EventEmitter<ModeChangedArgs> = new EventEmitter<ModeChangedArgs>();

  from!: string;
  to!: string;
  eventData: any[] = [];
  mode?: ModeChangedArgs;

  constructor(private service: WorkCalendarEventService) {
  }

  ngAfterViewInit(): void {
    //this.from = this.datePipe.transform(this.calendar.start.toDateLocal(),'yyyyMMdd') ?? '';
    //this.to = this.datePipe.transform(this.calendar.end.toDateLocal(),'yyyyMMdd') ?? '';

    this.from = formatDate(this.calendar.start.toDateLocal(),'YYYYMMdd','ko-kr') ?? '';
    this.to = formatDate(this.calendar.end.toDateLocal(),'YYYYMMdd','ko-kr') ?? '';
  }

  rangeChanged(e: any): void {
    this.visibleRangeChanged.emit({start: e.start, end: e.end, date: e.date});

    //this.from = this.datePipe.transform(e.start,'yyyyMMdd') ?? '';
    //this.to = this.datePipe.transform(e.end,'yyyyMMdd') ?? '';

    this.from = formatDate(e.start,'YYYYMMdd','ko-kr') ?? '';
    this.to = formatDate(e.end,'YYYYMMdd','ko-kr') ?? '';

    this.getWorkScheduleList();
  }

  getWorkScheduleList(): void {
    const workGroupId: string = this.fkWorkCalendar.toString();

    if (workGroupId === "" || workGroupId === null || workGroupId === undefined) {
      this.eventData = [];
      return;
    }
    const param = {
      fkWorkCalendar : this.fkWorkCalendar,
      fromDate: this.from,
      toDate: this.to
    };

    this.service
        .getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkCalendarEvent>) => {
              let data: any[] = [];

              model.data.forEach(e => data.push({
                id: e.id,
                text: e.text,
                start: new DayPilot.Date(e.start as string),
                end: new DayPilot.Date(e.end as string),
                barColor: e.color
              }));
              this.eventData = data;
              this.eventDataChanged.emit(this.eventData);
            }
        );
  }

  eventClicked(param: any): void {
    this.itemSelected.emit(param.id);
  }

  onDateClick(params: any): void {
    const eventArgs: NewDateSelectedArgs = {workCalendarId: this.fkWorkCalendar, start: params.start, end: params.end};
    this.newDateSelected.emit(eventArgs);
  }

  calendarModeChanged(params: ModeChangedArgs): void {
    this.mode = params;
    this.modeChanged.emit(this.mode);
  }

  calendarSetDate(date: DayPilot.Date) {
    this.calendar.rangeChangedEvent(date);
  }
}
