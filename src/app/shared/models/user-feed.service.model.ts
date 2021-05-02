import { Observable } from 'rxjs';

export interface IUserFeedService {
  loadFeedsOfSelectedUser(user: string[]): Observable<any>;
}
