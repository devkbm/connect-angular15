import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ResponseList } from 'src/app/core/model/response-list';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { WordService } from './word.service';
import { Word } from './word.model';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';

@Component({
  selector: 'app-word-grid',
  template: `
   <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="list"
      [columnDefs]="columnDefs"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedFunc($event)"
      (rowDoubleClicked)="rowDbClickedFunc($event)">
  </ag-grid-angular>
  `,
  styles: []
})
export class WordGridComponent extends AggridFunction implements OnInit {

  list: Word[] = [];

  @Output() rowClickedEvent = new EventEmitter();
  @Output() rowDoubleClickedEvent = new EventEmitter();
  @Output() editButtonClickedEvent = new EventEmitter();

  constructor(private service: WordService,
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
      {headerName: '논리명',        field: 'logicalName',     width: 100 },
      {headerName: '물리명',        field: 'physicalName',    width: 100 },
      {headerName: '논리명(영문)',  field: 'logicalNameEng',  width: 100 },
      {headerName: '비고',          field: 'comment',         width: 400 }
    ];

    this.getRowId = function(params: any) {
      return params.data.logicalName;
    };
  }

  ngOnInit() {
    this.getList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClickedEvent.emit(e.rowData);
  }

  getList(params?: any): void {
    this.service
        .getList()
        .subscribe(
          (model: ResponseList<Word>) => {
            if (model.total > 0) {
              this.list = model.data;
            } else {
              this.list = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedFunc(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowClickedEvent.emit(selectedRows[0]);
  }

  rowDbClickedFunc(event: any) {
    this.rowDoubleClickedEvent.emit(event.data);
  }

}
