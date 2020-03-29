import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject, from } from 'rxjs';
import PostLikeNotifData from '../../model/postLikeNotification.model';
import CommentLikeNotifData from '../../model/commentLikeNotification.model';
import { Post } from 'src/app/posts/model/post.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import PostComment from 'src/app/comments/model/postComment.model';
import { parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private postLikes$ = new Subject<PostLikeNotifData>();
  private commentsLikes$ = new Subject<CommentLikeNotifData>();
  private newPosts$ = new Subject<Post>();
  private newComments$ = new Subject<PostComment>();
  private userId: number;

  private socket: SocketIOClient.Socket;
  constructor(private authService: AuthenticationService) {
    authService.getLoggedInUser().subscribe((user) => {
      if (user) {
        this.userId = user.userId;
        this.connect();
      } else if (this.socket) {
        this.disconnect();
      }
    });
  }

  private connect(): void {
    this.socket = io(environment.backendUrl, { query: { token: this.authService.getToken(), userId: this.userId } });
    this.socket.on('connect', () => console.log('socket connected'));
    this.socket.on('error', (err) => console.error(err));

    this.socket.on('postLike', (data) => this.postLikes$.next(data));

    this.socket.on('commentLike', (data) => this.commentsLikes$.next(data));

    this.socket.on('newPost', (data) => {
      const post = { ...data, publishDate: parseISO(data.publishDate) };

      return this.newPosts$.next(post);
    });

    this.socket.on('newComment', (data) => {
      const comment = { ...data, publishDate: parseISO(data.publishDate) };

      return this.newComments$.next(comment);
    });
  }

  private disconnect(): void {
    this.socket.disconnect();
    this.socket.removeAllListeners();
    this.socket = null;
  }

  getPostLikes(): Observable<PostLikeNotifData> {
    return this.postLikes$.asObservable();
  }

  getCommentLikes(): Observable<CommentLikeNotifData> {
    return this.commentsLikes$.asObservable();
  }

  getNewPosts(): Observable<Post> {
    return this.newPosts$.asObservable();
  }

  getNewComments(): Observable<PostComment> {
    return this.newComments$.asObservable();
  }
}
