import { Injectable, OnDestroy } from '@angular/core';
import { PostsService } from '../posts-service/posts.service';
import { SocketService } from 'src/app/shared/services/socketService/socket.service';
import { Post } from '../../model/post.model';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PostFilter, OrderPostBy } from '../../model/postFilter.model';
import { takeUntil } from 'rxjs/operators';
import { PostSimple } from '../../model/postSimple.model';
import PostLikeNotifData from 'src/app/shared/model/postLikeNotification.model';
import isPostInFilter from './checkFilter';


@Injectable({
  providedIn: 'root'
})
export class FeedService implements OnDestroy {
  posts$ = new BehaviorSubject<PostSimple[]>([]);
  unsubscribe$ = new Subject();

  filter: PostFilter = null;
  constructor(private postService: PostsService, private socket: SocketService, private toastr: ToastrService) {
    socket.getNewPosts().pipe(takeUntil(this.unsubscribe$)).subscribe(this.handleNewPost.bind(this));
    socket.getPostLikes().pipe(takeUntil(this.unsubscribe$)).subscribe(this.handlePostLike.bind(this));
  }

  getPosts(): Observable<PostSimple[]> {
    return this.posts$.asObservable();
  }

  filterPosts(filter: PostFilter): void {
    this.filter = filter;
    this.postService.getPosts(filter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((posts) => {
        if (posts.length === 0) {
          this.toastr.info('your query returned zero posts');
        }
        this.posts$.next(posts);
      });
  }

  private handleNewPost(post: Post) {
    if (isPostInFilter(post, this.filter)) {
      const posts = this.posts$.getValue();
      if (this.filter.orderBy === OrderPostBy.date) {
        this.posts$.next([post, ...posts]);
      } else {
        this.posts$.next([...posts, post]);
      }
    }
  }

  private handlePostLike(likeData: PostLikeNotifData) {
    const posts = this.posts$.getValue();
    const post = posts.find(post => post.postId === likeData.postId);
    if (post) {
      post.likes = likeData.count;
      this.posts$.next(posts);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.posts$.complete();
  }
}
