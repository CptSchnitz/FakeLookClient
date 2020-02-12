import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import NewComment from '../../model/newComment.model';
import { Observable } from 'rxjs';
import Comment from '../../model/newComment.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.backendUrl + '/api/posts/';

  createComment(comment: NewComment, postId: number): Observable<Comment> {
    console.log(comment);

    return this.http.post<Comment>(this.apiUrl + postId + '/comments', comment)
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        }));
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl + postId + '/comments');
  }
}
