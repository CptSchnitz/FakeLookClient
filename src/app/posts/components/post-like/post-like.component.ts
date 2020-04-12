import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Post } from '../../model/post.model';
import { PostSimple } from '../../model/postSimple.model';
import { PostsService } from '../../services/posts-service/posts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-like',
  templateUrl: './post-like.component.html',
  styleUrls: ['./post-like.component.css']
})
export class LikeComponent implements OnDestroy {
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;
  unsubscribe$ = new Subject();

  @Input()
  post: Post | PostSimple;
  constructor(private postService: PostsService) { }


  handleClick() {
    if (this.post.likedByUser) {
      this.DislikePost();
    } else {
      this.LikePost();
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private LikePost() {
    this.postService.addPostLike(this.post.postId).subscribe(() => {
      this.post.likedByUser = true;
      this.post.likes++;
    });
  }

  private DislikePost() {
    this.postService.deletePostLike(this.post.postId).subscribe(() => {
      this.post.likedByUser = false;
      this.post.likes--;
    });
  }
}
