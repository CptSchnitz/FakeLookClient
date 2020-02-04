import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsLayoutComponent } from './posts-layout/posts-layout.component';
import { TimeFeedComponent } from './time-feed/time-feed.component';
import { MapFeedComponent } from './map-feed/map-feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    component: PostsLayoutComponent,
    children: [
      { path: 'timefeed', component: TimeFeedComponent },
      { path: 'mapfeed', component: MapFeedComponent },
      { path: 'details/:id', component: PostDetailsComponent },
      { path: '', redirectTo: 'mapfeed', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
