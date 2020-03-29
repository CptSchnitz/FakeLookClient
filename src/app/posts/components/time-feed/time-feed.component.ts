import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../services/posts-service/posts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostSimple } from 'src/app/posts/model/postSimple.model';
import { OrderPostBy, PostFilter } from '../../model/postFilter.model';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from '../../services/feedService/feed.service';

@Component({
  selector: 'app-time-feed',
  templateUrl: './time-feed.component.html',
  styleUrls: ['./time-feed.component.css'],
  providers: [FeedService]
})
export class TimeFeedComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  posts: PostSimple[];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.filterPosts({ orderBy: OrderPostBy.date });
    this.feedService
      .getPosts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((posts) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleSearch(filter: PostFilter) {
    filter.orderBy = OrderPostBy.date;
    this.feedService.filterPosts(filter);
  }
}
