import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsLayoutComponent } from './components/posts-layout/posts-layout.component';
import { MapFeedComponent } from './components/map-feed/map-feed.component';
import { TimeFeedComponent } from './components/time-feed/time-feed.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { TimeFeedItemComponent } from './components/time-feed-item/time-feed-item.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';

@NgModule({
  declarations: [
    PostsLayoutComponent,
    MapFeedComponent,
    TimeFeedComponent,
    PostDetailsComponent,
    PostFormComponent,
    TimeFeedItemComponent,
    FilterFormComponent
  ],
  imports: [CommonModule, PostsRoutingModule]
})
export class PostsModule {}
