import { Observable } from 'rxjs';
import { IUser } from './user.model';

export interface IUserService {
  getSelectedUser(): Observable<IUser[]>;
  setSelectedUser(users: IUser[]): void;
  getUserFriendsList(): Observable<IUser[]>;
}
