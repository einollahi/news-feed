import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IUserFeedService } from '../models/user-feed.service.model';

@Injectable({
  providedIn: 'root',
})
export class NewsFeedService implements IUserFeedService {
  constructor() {}

  loadFeedsOfSelectedUser(user: string[], offset = 0, limit = 5) {
    return of([]);
  }
}
