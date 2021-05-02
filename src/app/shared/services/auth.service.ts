import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    email: null,
    name: null,
    username: null,
    role: null,
  });
  private TOKEN_KEY = 'token';

  constructor(private httpService: HttpService) {}

  get authState(): Observable<IUser> {
    return this.authState$.asObservable();
  }

  setAuthState(value: IUser): void {
    this.authState$.next(value);
  }

  private saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private deleteToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  initializeRandomState() {
    let token = `
    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTYxOTkzNDEzOCwiZXhwIjoxNjE5OTM3NzUzLCJqdGkiOiI2MmY0MWNkNy1iY2JkLTRjNmQtYjdlNi04ZTI5NTA4MjE4YjAifQ.lDenqGj-HbaAvQdcewwIJ5-l9AGytP93MpHrG9aYkYc`;
    this.saveToken(token);
    this.setAuthState({
      email: 'john@doe.com',
      name: 'John Doe',
      username: 'johndoe',
      role: 'user',
    });
  }
}
