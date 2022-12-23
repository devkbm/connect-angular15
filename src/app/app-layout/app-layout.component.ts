import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AppLayoutService } from './app-layout.service';

import { ResponseList } from '../core/model/response-list';
import { UserSessionService } from '../core/service/user-session.service';
import { UserPopupComponent } from '../system/user/user-popup.component';
import { SelectControlModel } from '../core/model/select-control.model.ts';
import { MenuHierarchy } from './app-layout.model';



@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit  {

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  selectedValue: string = '';
  message: string = '';
  menuGroupCode: string = '';
  profileAvatarSrc: string = '';

  menuGroupList: SelectControlModel[] = [];
  menuItems: MenuHierarchy[] = [];

  @ViewChild('treeCom', {static: false}) treeCom: any;

  constructor(private appAlarmService: AppAlarmService,
              private sessionService: UserSessionService,
              private service: AppLayoutService,
              private viewContainerRef: ViewContainerRef,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.appAlarmService.currentMessage.subscribe(message => this.message = message);

    this.setInitMenuGroup();
    this.setAvatar();
  }

  /**
   * 초기 메뉴 그룹을 설정한다.
   */
  private setInitMenuGroup(): void {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList') as string;
    const selectedMenuGroup   = sessionStorage.getItem('selectedMenuGroup') as string;

    this.menuGroupList = JSON.parse(stringMenuGroupList);

    if ( selectedMenuGroup != null ) {
      this.selectedValue = selectedMenuGroup;
    } else {
      this.selectedValue = this.menuGroupList[0].value;
    }

    if (this.selectedValue != null) {
      this.selectMenuGroup(this.selectedValue);
    }
  }

  sendMen(mess: any): void {
    this.menuGroupCode = mess;
  }

  selectMenuGroup(value: string): void {

    sessionStorage.setItem('selectedMenuGroup', value);

    this.service
        .getMenuHierarchy(value)
        .subscribe(
          (model: ResponseList<MenuHierarchy>) => {
            if ( model.total > 0 ) {
              this.menuItems = model.data;
              sessionStorage.setItem('menuList', JSON.stringify(model.data));
            } else {
              this.menuItems = [];
              sessionStorage.setItem('menuList', '');
            }

            const seledtedMenu = sessionStorage.getItem('selectedMenu');
            this.selectMenuItem(seledtedMenu as string);
          }
        );
  }

  selectMenu(event: NzFormatEmitEvent): void {

    console.log(event.node?.origin);
    const node = event.node?.origin as NzTreeNodeOptions;
    sessionStorage.setItem('selectedMenu', node.key);
    this.router.navigate([node['url']]);
  }

  selectMenuItem(url: string): void {
    console.log(url);
    sessionStorage.setItem('selectedMenu', url);
    // '/home/' +
    this.router.navigate([url]);
  }

  setAvatar(): void {
    // this.profileAvatarSrc = `http://localhost:8090/static/${url}`;

    const profilePictureUrl: string | null = this.sessionService.getAvartarImageString();
    if (profilePictureUrl) {
      this.profileAvatarSrc = profilePictureUrl as string;
    }
  }



}
