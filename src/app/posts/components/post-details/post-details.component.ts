import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../../services/posts-service/posts.service';
import { Post } from '../../model/post.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import PostComment from '../../model/postComment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private modalService: NgbModal
  ) {}

  post: Post;
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params =>
          this.postService.getPostById(Number(params.get('id')))
        )
      )
      .subscribe(post => {
        console.log(post);
        return (this.post = post);
      });
  }

  openAddCommentModal() {
    const commentForm = this.modalService.open(CommentFormComponent);
    commentForm.componentInstance.postId = this.post.postId;
    commentForm.result.then((comment: PostComment) => {
      console.log(comment);

      this.post.comments = [...this.post.comments, comment];
    });
  }
}
