import { Component, OnInit, Input } from '@angular/core';
import { PostSimple } from 'src/app/posts/model/postSimple.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-time-feed-item',
  templateUrl: './time-feed-item.component.html',
  styleUrls: ['./time-feed-item.component.css']
})
export class TimeFeedItemComponent implements OnInit {
  @Input()
  post: PostSimple;

  imageUrlBase = environment.backendUrl + '/images/thumb/';

  constructor() {}

  ngOnInit() {}
}
