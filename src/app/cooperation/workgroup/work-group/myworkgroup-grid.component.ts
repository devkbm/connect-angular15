import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from '../../../core/grid/aggrid-function';
import { ResponseList } from '../../../core/model/response-list';
import { AppAlarmService } from '../../../core/service/app-alarm.service';

import { WorkGroupService } from './workgroup.service';
import { WorkGroup } from './workgroup.model';

@Component({
  selector: 'app-myworkgroup-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'multiple'"
      [rowData]="workGroupList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class MyWorkGroupGridComponent extends AggridFunction implements OnInit {

  workGroupList: WorkGroup[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private workGroupService: WorkGroupService) {
    super();

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 40,
          cellStyle: {'text-align': 'center'},
          suppressSizeToFit: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
      },
      {
          headerName: 'Id',
          field: 'id',
          width: 40,
          suppressSizeToFit: true,
          hide: true
      },
      {
        headerName: '작업그룹명',
        field: 'name',
        width: 140
      }
    ];

    this.getRowId = (data: any) => {
        return data.data.id;
    };
  }

  ngOnInit(): void {
    this.sizeToFit();
  }

  getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkGroup>) => {
              if (model.total > 0) {
                  this.workGroupList = model.data;
              } else {
                  this.workGroupList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    let ids = selectedRows.map((v: { id: any; }) => v.id)   // id 추출
                          .join(',');       // 콤마 구분자로 분리함
    this.rowSelected.emit(ids);
    // console.log('ids ' + ids);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

}
