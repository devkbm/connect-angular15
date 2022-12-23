import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';

import { WorkGroupSchedule } from './workgroup-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class WorkScheduleService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/grw', http, tokenExtractor);
  }

  /**
   * @description 스케쥴을 조회한다.
   * @param id 스케쥴id
   */
   public getWorkGroupSchedule(id: number): Observable<ResponseObject<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<WorkGroupSchedule>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroupSchedule>>('getWorkGroup', undefined))
      );
  }

  /**
   * @description 스케쥴을 저장한다.
   * @param workGroupSchedule
   */
  public saveWorkGroupSchedule(workGroupSchedule: WorkGroupSchedule): Observable<ResponseObject<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .post<ResponseObject<WorkGroupSchedule>>(url, workGroupSchedule, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroupSchedule>>('saveWorkGroupSchedule', undefined))
      );
  }

  /**
   * @description 스케쥴을 삭제한다.
   * @param id 스케쥴id
   */
  public deleteWorkGroupSchedule(id: number): Observable<ResponseObject<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<WorkGroupSchedule>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<WorkGroupSchedule>>('deleteWorkGroupSchedule', undefined))
      );
  }

  /**
   * @description 작업그룹명단을 조회한다.
   * @param params 조회 조건 객체
   */
  public getWorkScheduleList(params?: any): Observable<ResponseList<WorkGroupSchedule>> {
    const url = `${this.API_URL}/schedule`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http
      .get<ResponseList<WorkGroupSchedule>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<WorkGroupSchedule>>('getWorkScheduleList', undefined))
      );
  }

}
