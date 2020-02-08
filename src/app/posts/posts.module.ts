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
import { PostsService } from './services/posts-service/posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { SocialModule } from '../social/social.module';
import { PostMapInfoWindowComponent } from './components/post-map-info-window/post-map-info-window.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PostsLayoutComponent,
    MapFeedComponent,
    TimeFeedComponent,
    PostDetailsComponent,
    PostFormComponent,
    TimeFeedItemComponent,
    FilterFormComponent,
    PostMapInfoWindowComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    SocialModule,
    SharedModule,
    NgbDatepickerModule
  ],
  providers: [PostsService]
})
export class PostsModule {}
