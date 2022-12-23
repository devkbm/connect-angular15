import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { ResponseList } from 'src/app/core/model/response-list';
import { TeamJoinableUserModel, TeamModel } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
      super('/grw', http, tokenExtractor);
  }

  /**
   * @description 팀명단을 조회한다.
   * @param params 조회 조건 객체
   */
  getList(params?: any): Observable<ResponseList<TeamModel>> {
    const url = `${this.API_URL}/team`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      params: params
    };

    return this.http
      .get<ResponseList<TeamModel>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<TeamModel>>('getTeamList', undefined))
      );
  }

  /**
   * @description 팀명단을 조회한다.
   * @param id 팀 id
   */
  get(id: string): Observable<ResponseObject<TeamModel>> {
    const url = `${this.API_URL}/team/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http
      .get<ResponseObject<TeamModel>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<TeamModel>>('getTeam', undefined))
      );
  }

  /**
   * @description 팀을 저장한다.
   * @param team team 객체
   */
  save(team: TeamModel): Observable<ResponseObject<TeamModel>> {
    const url = `${this.API_URL}/team`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http
      .post<ResponseObject<TeamModel>>(url, team, options)
      .pipe(
        catchError(this.handleError<ResponseObject<TeamModel>>('save', undefined))
      );

  }

  /**
   * @description 팀을 삭제한다.
   * @param id team 객체 id
   */
  remove(id: string): Observable<ResponseObject<TeamModel>> {
    const url = `${this.API_URL}/team/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http
      .delete<ResponseObject<TeamModel>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<TeamModel>>('remove', undefined))
      );
  }

  getAllUserList(): Observable<ResponseList<TeamJoinableUserModel>> {
    const url = `${this.API_URL}/allmember`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http
      .get<ResponseList<TeamJoinableUserModel>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseList<TeamJoinableUserModel>>('getAllUserList', undefined))
      );
  }

}

