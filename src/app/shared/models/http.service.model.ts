import { Observable } from 'rxjs';

export interface IHttpService {
  post(module: string, command: string, payload: any): Observable<any>;
  get(module: string, command: string, payload: any): Observable<any>;
  login(username: string, password: string): Observable<any>;
  logout(): Observable<any>;
}
