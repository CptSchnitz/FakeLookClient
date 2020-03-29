import { Injectable, OnDestroy } from '@angular/core';
import { SocketService } from '../socketService/socket.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LikeAction } from '../../model/likeAction.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  unsubscribe$ = new Subject();
  constructor(private socket: SocketService, private toastr: ToastrService) {
    socket.getCommentLikes().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      if (data.action === LikeAction.add) {
        toastr.info(`comment ${data.commentId} of post ${data.postId}, was liked by userId ${data.userId}.
        it got ${data.count} likes`);
      }
    });

    socket.getNewComments().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      toastr.info(`${data.creator.firstName} ${data.creator.lastName}, has uploaded a new comment.`);
    });

    socket.getNewPosts().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      toastr.info(`${data.creator.firstName} ${data.creator.lastName}, has uploaded a new post.`);
    });

    socket.getPostLikes().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      if (data.action === LikeAction.add) {
        toastr.info(`post ${data.postId}, was liked by userId ${data.userId}.
        it got ${data.count} likes`);
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
