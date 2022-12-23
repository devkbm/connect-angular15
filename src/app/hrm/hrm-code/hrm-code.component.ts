import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { HrmCodeTypeGridComponent } from './hrm-code-type-grid.component';
import { HrmCodeGridComponent } from './hrm-code-grid.component';

@Component({
  selector: 'app-hrm-code',
  templateUrl: './hrm-code.component.html',
  styleUrls: ['./hrm-code.component.css']
})
export class HrmCodeComponent extends AppBase implements OnInit {

  @ViewChild(HrmCodeTypeGridComponent) gridHrmCodeType!: HrmCodeTypeGridComponent;  
  @ViewChild(HrmCodeGridComponent) gridHrmCode!: HrmCodeGridComponent;  
  
  drawerCodeType: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerCode: { visible: boolean, initLoadId: {typeId: any, code: any} | null } = {
    visible: false,
    initLoadId: null
  }

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  getGridHrmCodeType(): void {
    this.drawerCodeType.visible = false;    
    this.gridHrmCodeType.getList('');
  }

  rowClickHrmCodeType(row: any): void {        
    this.drawerCodeType.initLoadId = row.typeId;
    this.drawerCode.initLoadId = {typeId: row.typeId, code: ''};

    this.gridHrmCode.getGridList(row.typeId);
  }

  newHrmCodeType(): void {
    this.drawerCodeType.initLoadId = null;
    this.drawerCodeType.visible = true;        
  }

  editHrmCodeType(row: any): void {    
    this.drawerCodeType.initLoadId = row.typeId;
    this.drawerCodeType.visible = true;
  }  

  rowClickHrmCode(row: any): void {
    this.drawerCode.initLoadId = {typeId: row.typeId, code: row.code};
  }

  getGridHrmCode(): void {
    this.drawerCode.visible = false;    
    this.gridHrmCode.getGridList(this.drawerCodeType.initLoadId);
  }

  newHrmCode(): void {
    this.drawerCode.initLoadId = {typeId: this.drawerCodeType.initLoadId, code: null};
    this.drawerCode.visible = true;
  }

  editHrmCode(row: any): void {        
    this.drawerCode.initLoadId = {typeId: row.typeId, code: row.code};
    this.drawerCode.visible = true;
  }  

}
