import { MockNewsFeedService } from 'src/app/shared/mocks/news-feed.mock.service';
import { MockUserService } from 'src/app/shared/mocks/user.mock.service';
import { NewsFeedService } from 'src/app/shared/services/news-feed.service';
import { UserService } from 'src/app/shared/services/user.service';

export const environment = {
  production: true,
  providers: [
    { provide: NewsFeedService, useClass: MockNewsFeedService },
    { provide: UserService, useClass: MockUserService },
  ],
};
