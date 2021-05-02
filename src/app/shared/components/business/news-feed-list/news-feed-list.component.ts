import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { INewsFeed } from 'src/app/shared/models/news-feed.model';
import { IUser } from 'src/app/shared/models/user.model';
import { NewsFeedService } from 'src/app/shared/services/news-feed.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-news-feed-list',
  templateUrl: './news-feed-list.component.html',
  styleUrls: ['./news-feed-list.component.scss'],
})
export class NewsFeedListComponent implements OnInit, OnDestroy {
  feeds: INewsFeed[] = [];

  length: number = 0;
  pageIndex = 0;
  pageSize = 5;

  selectedUsers: IUser[] = [];
  selectedUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private newsFeedService: NewsFeedService
  ) {}

  ngOnInit(): void {
    this.selectedUserSubscription = this.userService
      .getSelectedUser()
      .subscribe((users: IUser[]) => {
        this.selectedUsers = users;
        this.loadData();
      });
  }

  ngOnDestroy(): void {
    this.selectedUserSubscription?.unsubscribe();
  }

  loadData() {
    this.newsFeedService
      .loadFeedsOfSelectedUser(
        this.selectedUsers.map((el) => el['username']),
        this.pageIndex * this.pageSize,
        this.pageIndex * this.pageSize + this.pageSize
      )
      .subscribe((res) => {
        this.feeds = [...res['data']];
        this.length = res['count'];
      });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.loadData();
  }
}
