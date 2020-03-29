import { Component, OnInit, Input } from '@angular/core';
import PostComment from '../../model/postComment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input()
  comment: PostComment;
  constructor() { }


  ngOnInit() {
  }

}
