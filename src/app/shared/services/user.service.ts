import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { IUserService } from '../models/user.service.model';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor() {}

  private selectedUser: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(
    []
  );

  getSelectedUser(): Observable<IUser[]> {
    return this.selectedUser.asObservable();
  }

  setSelectedUser(users: IUser[]): void {
    return this.selectedUser.next(users);
  }

  getUserFriendsList(): Observable<IUser[]> {
    return of([]);
  }
}
