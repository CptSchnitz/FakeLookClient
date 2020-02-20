import { Injectable } from '@angular/core';
import NewComment from '../../model/newComment.model';
import { Observable } from 'rxjs';
import Comment from '../../model/newComment.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AuthHttpService } from 'src/app/auth-http.service';

const END_POINT = '/api/posts/';
const API_URL = environment.backendUrl + END_POINT;

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: AuthHttpService) { }

  createComment(comment: NewComment, postId: number): Observable<Comment> {

    return this.http.post<Comment>(API_URL + postId + '/comments', comment)
      .pipe(
        catchError(err => {
          throw err;
        }));
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(API_URL + postId + '/comments');
  }

  addCommentLike(postId: number, commentId: number): Observable<any>{
    return this.http.post(`${API_URL}/${postId}/comments/${commentId}/like`, {});
  }

  deleteCommentLike(postId: number, commentId: number): Observable<any> {
    return this.http.delete(`${API_URL}/${postId}/comments/${commentId}/like`);
  }
}
