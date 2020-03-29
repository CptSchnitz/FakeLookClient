import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostSimple } from 'src/app/posts/model/postSimple.model';
import { environment } from 'src/environments/environment';
import { NewPost } from '../../model/NewPost.model';
import { PostFilter } from '../../model/postFilter.model';
import { Post } from '../../model/post.model';
import { AuthHttpService } from 'src/app/auth-http.service';
// import { PostsModule } from '../../posts.module';

const END_POINT = '/api/posts';
const API_URL = environment.backendUrl + END_POINT;


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: AuthHttpService) { }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(API_URL + '/' + id);
  }

  getPosts(filters?: PostFilter): Observable<PostSimple[]> {
    let url = API_URL;
    if (filters) {
      url += this.getQueryString(filters);
    }

    return this.http.get<PostSimple[]>(url);
  }

  private getQueryString(filters: PostFilter) {
    let queryString = '?';
    if (filters.publishers) {
      filters.publishers.forEach(pub => (queryString += `publishers[]=${pub}&`));
    }
    if (filters.userTags) {
      filters.tags.forEach(tag => (queryString += `tags[]=${tag}&`));
    }
    if (filters.userTags) {
      filters.userTags.forEach(
        userTag => (queryString += `userTags[]=${userTag}&`)
      );
    }

    if (filters.distance) {
      queryString += `distance=${filters.distance}&lon=${filters.lon}&lat=${filters.lat}&`;
    }

    if (filters.minDate) {
      queryString += `minDate=${filters.minDate.toISOString()}&`;
    }

    if (filters.maxDate) {
      queryString += `maxDate=${filters.maxDate.toISOString()}&`;
    }
    if (filters.orderBy) {
      queryString += `orderBy=${filters.orderBy}&`;
    }

    return queryString.slice(0, -1);
  }

  createPost(post: NewPost): Observable<{ postId: number }> {
    const { image, ...data } = { ...post };
    const formData = new FormData();
    formData.append('image', image);
    formData.append('data', JSON.stringify(data));
    return this.http.post<{ postId: number }>(API_URL, formData);
  }

  addPostLike(postId: string): Observable<any>{
    return this.http.post(`${API_URL}/${postId}/like`, {});
  }

  deletePostLike(postId: string): Observable<any> {
    return this.http.delete(`${API_URL}/${postId}/like`);
  }
}
