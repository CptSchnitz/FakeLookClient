import { Component, OnInit, Input } from '@angular/core';
import PostComment from '../../model/postComment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input()
  comments: PostComment[];

  constructor() { }

  ngOnInit() {
  }

}
