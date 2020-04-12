import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentLikeComponent } from './components/comment-like/comment-like.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialModule } from '../social/social.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CommentFormComponent, CommentItemComponent, CommentLikeComponent, CommentsComponent],
  imports: [CommonModule, ReactiveFormsModule,
    FontAwesomeModule, SocialModule,
    SharedModule,
    NgbModalModule],
  exports: [CommentsComponent],
  providers: [],
  entryComponents: [CommentFormComponent]
})
export class CommentsModule { }