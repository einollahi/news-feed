import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UiService } from './ui.service';
import { IHttpService } from '../models/http.service.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements IHttpService {
  private API_URL = '/api';
  constructor(private _http: HttpClient, private uiService: UiService) {}

  private _post(method, module, command, payload) {
    this.uiService.setShowProgress(true);
    return new Observable<any>((observer) => {
      this._http
        .post(this.API_URL, { method, module, command, payload })
        .pipe(map((data) => data))
        .subscribe(
          (res) => {
            observer.next(res);
            observer.complete();
            this.uiService.setShowProgress(false);
          },
          (err) => {
            observer.error(err);
            observer.complete();
            this.uiService.setShowProgress(false);
          }
        );
    });
  }

  post(module, command, payload) {
    return this._post('post', module, command, payload);
  }

  get(module, command, payload) {
    return this._post('get', module, command, payload);
  }

  login(username, password) {
    return this._http
      .post(this.API_URL + '/login', { username, password })
      .pipe(catchError(this.handleError));
  }

  logout() {
    return this._http
      .get(this.API_URL + '/logout')
      .pipe(catchError(this.handleError));
  }

  private handleError(err) {
    return throwError(err);
  }
}
