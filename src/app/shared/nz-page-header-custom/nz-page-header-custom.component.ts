import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { MenuBreadCrumb, SessionManager } from 'src/app/core/session-manager';

@Component({
  selector: 'app-nz-page-header-custom',
  template: `
   <nz-page-header (nzBack)="goBack()" nzBackIcon [nzTitle]="title" [nzSubtitle]="subtitle">
    <nz-breadcrumb nz-page-header-breadcrumb nzSeparator=">" >
      <nz-breadcrumb-item><a routerLink="/home"><span nz-icon [nzType]="'home'"></span></a></nz-breadcrumb-item>
      <nz-breadcrumb-item *ngFor="let menu of menuBreadCrumb">{{menu.name}}</nz-breadcrumb-item>
    </nz-breadcrumb>
  </nz-page-header>
  `,
  styles: []
})
export class NzPageHeaderCustomComponent implements OnInit {

  menuBreadCrumb: MenuBreadCrumb[] = SessionManager.createBreadCrumb();
  @Input() title: string | TemplateRef<void> = '';
  @Input() subtitle: string | TemplateRef<void> = '';

  constructor(protected _location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

  goFoward() {
    this._location.forward();
  }

}
