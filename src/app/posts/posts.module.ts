import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { MapFeedComponent } from './components/map-feed/map-feed.component';
import { TimeFeedComponent } from './components/time-feed/time-feed.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { TimeFeedItemComponent } from './components/time-feed-item/time-feed-item.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { SocialModule } from '../social/social.module';
import { PostMapInfoWindowComponent } from './components/post-map-info-window/post-map-info-window.component';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule, NgbModalModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentFormComponent } from '../comments/components/comment-form/comment-form.component';
import { LikeComponent } from './components/post-like/post-like.component';
import { CommentsModule } from '../comments/comments.module';
import { NotificationService } from '../shared/services/notificationService/notification.service';

@NgModule({
  declarations: [
    MapFeedComponent,
    TimeFeedComponent,
    PostDetailsComponent,
    PostFormComponent,
    TimeFeedItemComponent,
    FilterFormComponent,
    PostMapInfoWindowComponent,
    LikeComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    SocialModule,
    SharedModule,
    NgbDatepickerModule,
    NgbModalModule,
    NgbPopoverModule,
    CommentsModule
  ],
})
export class PostsModule {}
