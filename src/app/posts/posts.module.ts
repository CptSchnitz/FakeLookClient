import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsLayoutComponent } from './posts-layout/posts-layout.component';
import { MapFeedComponent } from './map-feed/map-feed.component';
import { TimeFeedComponent } from './time-feed/time-feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormComponent } from './post-form/post-form.component';
import { TimeFeedItemComponent } from './time-feed-item/time-feed-item.component';
import { FilterFormComponent } from './filter-form/filter-form.component';

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
