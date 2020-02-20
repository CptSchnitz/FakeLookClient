import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommentsService } from '../../services/comments-service/comments.service';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import PostComment from '../../model/postComment.model';

@Component({
  selector: 'app-comment-like',
  templateUrl: './comment-like.component.html',
  styleUrls: ['./comment-like.component.css']
})
export class CommentLikeComponent implements OnDestroy {
    faHeartSolid = faHeartSolid;
    faHeartRegular = faHeartRegular;
    unsubscribe$ = new Subject();
  
    @Input()
    comment: PostComment;
    constructor(private commentService: CommentsService) { }
  
  
    handleClick() {
      if (this.comment.likedByUser) {
        this.DislikeComment();
      } else {
        this.LikeComment();
      }
    }
    ngOnDestroy(): void {
      this.unsubscribe$.next();
    }
  
    private LikeComment() {
      this.commentService.addCommentLike(this.comment.postId, this.comment.commentId).subscribe(() => {
        this.comment.likedByUser = true;
        this.comment.likes++;
      });
    }
  
    private DislikeComment() {
      this.commentService.deleteCommentLike(this.comment.postId, this.comment.commentId).subscribe(() => {
        this.comment.likedByUser = false;
        this.comment.likes--;
      });
    }
  }