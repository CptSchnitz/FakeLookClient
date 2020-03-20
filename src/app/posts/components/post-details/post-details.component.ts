import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../../services/posts-service/posts.service';
import { Post } from '../../model/post.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import PostComment from '../../model/postComment.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public postService: PostsService,
    private modalService: NgbModal
  ) {}

  imageUrlBase = environment.backendUrl + '/images/';

  post: Post;
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params =>
          this.postService.getPostById(params.get('id'))
        )
      )
      .subscribe(post => {
        return (this.post = post);
      });
  }

  openAddCommentModal() {
    const commentForm = this.modalService.open(CommentFormComponent);
    commentForm.componentInstance.postId = this.post.postId;
    commentForm.result.then((comment: PostComment) => {
      this.post.comments = [...this.post.comments, comment];
    });
  }
}
