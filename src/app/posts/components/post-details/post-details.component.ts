import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { PostsService } from '../../services/posts-service/posts.service';
import { Post } from '../../model/post.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentFormComponent } from '../../../comments/components/comment-form/comment-form.component';
import PostComment from '../../../comments/model/postComment.model';
import { environment } from '../../../../environments/environment';
import { SocketService } from 'src/app/shared/services/socketService/socket.service';
import { Subject } from 'rxjs';
import { LikeAction } from 'src/app/shared/model/likeAction.enum';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public postService: PostsService,
    private socket: SocketService,
    private modalService: NgbModal
  ) {

  }

  unsubscribe$ = new Subject();
  imageUrlBase = environment.backendUrl + '/images/';
  post: Post;



  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(params =>
          this.postService.getPostById(params.get('id'))
        )
      )
      .subscribe(post => {
        this.initSockets();
        return (this.post = post);
      });
  }

  initSockets(): void {
    this.socket.getCommentLikes().pipe(
      takeUntil(this.unsubscribe$),
      filter((likeData) => likeData.postId === this.post.postId))
      .subscribe((likeData) => {
        const commentIndex = this.post.comments.findIndex((comment) => comment.commentId === likeData.commentId);
        if (commentIndex !== -1) {
          this.post.comments[commentIndex].likes = likeData.count;
        }
      });

    this.socket.getPostLikes().pipe(
      takeUntil(this.unsubscribe$),
      filter((likeData) => likeData.postId === this.post.postId))
      .subscribe((likeData) => { 
        this.post.likes = likeData.count;
      });

    this.socket.getNewComments().pipe(
      takeUntil(this.unsubscribe$),
      filter((comment) => comment.postId === this.post.postId))
      .subscribe((comment) => {
        this.post.comments = [...this.post.comments, comment];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openAddCommentModal() {
    const commentForm = this.modalService.open(CommentFormComponent);
    commentForm.componentInstance.postId = this.post.postId;
    commentForm.result.then((comment: PostComment) => {
      this.post.comments = [...this.post.comments, comment];
    }).catch(() => { });
  }
}
