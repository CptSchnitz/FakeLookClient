import { Component, OnInit, Input } from '@angular/core';
import { PostSimple } from 'src/app/posts/model/postSimple.model';

@Component({
  selector: 'app-time-feed-item',
  templateUrl: './time-feed-item.component.html',
  styleUrls: ['./time-feed-item.component.css']
})
export class TimeFeedItemComponent implements OnInit {
  @Input()
  post: PostSimple;

  constructor() {}

  ngOnInit() {}
}
