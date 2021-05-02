import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { INewsFeed } from 'src/app/shared/models/news-feed.model';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent {
  @Input() data: INewsFeed = {
    id: null,
    date: null,
    avatar: null,
    name: null,
    username: null,
    email: null,
    content: null,
    number_of_likes: 0,
    number_of_comments: 0,
    number_of_shares: 0,
  };

  showDate(date: string) {
    return moment(date);
  }
}
