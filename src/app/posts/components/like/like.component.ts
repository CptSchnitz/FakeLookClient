import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;

  @Input()
  isLiked = false;
  constructor() {}

  @Output()
  liked = new EventEmitter<void>();

  @Output()
  disliked = new EventEmitter<void>();

  ngOnInit() {}

  handleClick() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.liked.emit();
    } else {
      this.disliked.emit();
    }
  }
}
