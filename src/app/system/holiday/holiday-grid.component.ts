import { Holiday } from './holiday.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { HolidayService } from './holiday.service';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';

@Component({
  selector: 'app-holiday-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="gridList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class HolidayGridComponent extends AggridFunction implements OnInit {

  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  gridList: Holiday[] = [];

  constructor(private appAlarmService: AppAlarmService,
              private holidayService: HolidayService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '일자',     field: 'date',                width: 110,   cellStyle: {'text-align': 'center'} },
      { headerName: '요일',     field: 'dayOfWeek',           width: 50,    cellStyle: {'text-align': 'center'} },
      { headerName: '휴일명',   field: 'holiday.holidayName', width: 150 },
      { headerName: '비고',     field: 'holiday.comment',     width: 200 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = (params: any) => {
      return params.data.date;
    };
  }

  ngOnInit(): void {
    //this.getGridList();
  }

  getGridList(fromDate: string, toDate: string): void {

    this.holidayService
        .getHolidayList(fromDate, toDate)
        .subscribe(
          (model: ResponseList<Holiday>) => {
            if (model.total > 0) {
              this.gridList = model.data;
            } else {
              this.gridList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  onEditButtonClick(e: any): void {
    this.editButtonClicked.emit(e.rowData);
  }

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

}
