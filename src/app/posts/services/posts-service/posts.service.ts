import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostSimple } from 'src/app/posts/model/postSimple.model';
import { environment } from 'src/environments/environment';
import { NewPost } from '../../model/NewPost.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.backendUrl + '/api/posts';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostSimple[]> {
    return this.http.get<PostSimple[]>(this.apiUrl);
  }

  createPost(post: NewPost): Observable<object> {
    const formData = new FormData();
    for (const key of Object.keys(post)) {
      formData.append(key, post[key]);
    }
    return this.http.post(this.apiUrl, formData);
  }
}
