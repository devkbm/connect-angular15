import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ResponseList } from 'src/app/core/model/response-list';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { TermService } from './term.service';
import { Term } from './term.model';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';


@Component({
  selector: 'app-term-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="termList"
      [columnDefs]="columnDefs"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedFunc($event)"
      (rowDoubleClicked)="rowDbClickedFunc($event)">
  </ag-grid-angular>
  `
})
export class TermGridComponent extends AggridFunction implements OnInit {

  termList: Term[] = [];

  @Output() rowClickedEvent = new EventEmitter();
  @Output() rowDoubleClickedEvent = new EventEmitter();
  @Output() editButtonClickedEvent = new EventEmitter();

  constructor(private termService: TermService,
              private appAlarmService: AppAlarmService) {

    super();

    this.defaultColDef = { resizable: true, sortable: true };

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
      {headerName: '용어ID',      field: 'termId',            width: 200 },
      {headerName: '시스템',      field: 'system',            width: 100 },
      {headerName: '용어',        field: 'term',              width: 200 , tooltipField: 'term'},
      {headerName: '용어(영문)',  field: 'termEng',           width: 150 },
      {headerName: '컬럼명',      field: 'columnName',        width: 200 },
      {headerName: '도메인명',    field: 'dataDomainName',    width: 100 },
      {headerName: '설명',        field: 'description',       width: 400 },
      {headerName: '비고',        field: 'comment',           width: 400 }
    ];

    this.getRowId = function(params: any) {
        return params.data.termId;
    };
  }

  ngOnInit() {
    this.getList();
  }

  getList(params?: any): void {
    this.termService
        .getTermList(params)
        .subscribe(
          (model: ResponseList<Term>) => {
            if (model.total > 0) {
              this.termList = model.data;
            } else {
              this.termList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedFunc(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.rowClickedEvent.emit(selectedRows[0]);
  }

  onEditButtonClick(event: any) {
    this.editButtonClickedEvent.emit(event.rowData);
  }

  rowDbClickedFunc(event: any) {
    this.rowDoubleClickedEvent.emit(event.data);
  }

}