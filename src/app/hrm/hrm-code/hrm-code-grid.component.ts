import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { HrmCodeService } from './hrm-code.service';
import { HrmCode } from './hrm-code.model';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/core/grid/renderer/checkbox-renderer.component';

@Component({
  standalone: true,
  selector: 'app-hrm-code-grid',
  imports: [CommonModule, AgGridModule],
  template: `
    <ag-grid-angular
        [ngStyle]="style"
        class="ag-theme-balham-dark"
        [rowSelection]="'single'"
        [rowData]="_list"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [getRowId]="getRowId"
        (gridReady)="onGridReady($event)"
        (selectionChanged)="selectionChanged($event)"
        (rowDoubleClicked)="rowDbClicked($event)">
    </ag-grid-angular>
  `
})
export class HrmCodeGridComponent extends AggridFunction implements OnInit {

  _list: HrmCode[] = [];

  @Input() appointmentCode: any = '';

  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private hrmCodeService: HrmCodeService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
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
      { headerName: '??????',         field: 'code',        width: 150, filter: 'agTextColumnFilter' },
      { headerName: '?????????',       field: 'codeName',    width: 200, filter: 'agTextColumnFilter' },
      { headerName: '??????',         field: 'comment',     width: 200, filter: 'agTextColumnFilter' },
      {
        headerName: '????????????',
        field: 'useYn',
        width: 80,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: CheckboxRendererComponent,
        cellRendererParams: {
          label: '',
          disabled: true
        }
      },
      { headerName: '??????',         field: 'sequence',    width: 80,  filter: 'agNumberColumnFilter' }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(params: any) {
      return params.data.typeId + params.data.code;
    };
  }

  ngOnInit() {
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(typeId: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if (model.total > 0) {
              this._list = model.data;
            } else {
              this._list = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

}
