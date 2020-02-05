import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsLayoutComponent } from './components/posts-layout/posts-layout.component';
import { TimeFeedComponent } from './components/time-feed/time-feed.component';
import { MapFeedComponent } from './components/map-feed/map-feed.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    component: PostsLayoutComponent,
    children: [
      { path: 'timefeed', component: TimeFeedComponent },
      { path: 'mapfeed', component: MapFeedComponent },
      { path: 'details/:id', component: PostDetailsComponent },
      { path: 'newpost', component: PostFormComponent },
      { path: '', redirectTo: 'mapfeed', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
