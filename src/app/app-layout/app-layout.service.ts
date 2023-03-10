import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DataService } from 'src/app/core/service/data.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { MenuHierarchy } from './app-layout.model';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/system', http, tokenExtractor);
  }

  getMenuHierarchy(menuGroupId: String): Observable<ResponseList<MenuHierarchy>> {
    const url = `${this.API_URL}/menuhierarchy/${menuGroupId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .get<ResponseList<MenuHierarchy>>(url, options)
              .pipe(
                //catchError((err) => Observable.throw(err))
              );
  }

}

