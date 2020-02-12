import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts-service/posts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostSimple } from 'src/app/posts/model/postSimple.model';
import { OrderPostBy, PostFilter } from '../../model/postFilter.model';

@Component({
  selector: 'app-time-feed',
  templateUrl: './time-feed.component.html',
  styleUrls: ['./time-feed.component.css']
})
export class TimeFeedComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  posts: PostSimple[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService
      .getPosts({ orderBy: OrderPostBy.date })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((posts) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  handleSearch(filter: PostFilter){
    filter.orderBy = OrderPostBy.date;
    this.postsService
      .getPosts(filter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((posts) => (this.posts = posts));
  }
}
