import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// shared modules
import { MaterialsModule } from './modules/materials.module';
// interceptors
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { NewsFeedComponent } from './components/business/news-feed/news-feed.component';
import { SelectUserComponent } from './components/business/select-user/select-user.component';
import { AddNewPostComponent } from './components/business/add-new-post/add-new-post.component';
import { NewsFeedListComponent } from './components/business/news-feed-list/news-feed-list.component';
// shared components

// directives

// business components

const sharedComponents: any[] = [];
const modules = [
  CommonModule,
  FlexLayoutModule,
  RouterModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  InfiniteScrollModule,
  MaterialsModule,
];
const business_components: any[] = [
  NewsFeedComponent,
  SelectUserComponent,
  AddNewPostComponent,
  NewsFeedListComponent,
];
const directives: any[] = [];

@NgModule({
  imports: [...modules],
  declarations: [...sharedComponents, ...directives, ...business_components],
  exports: [
    ...modules,
    ...sharedComponents,
    ...directives,
    ...business_components,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [],
})
export class SharedModule {}
