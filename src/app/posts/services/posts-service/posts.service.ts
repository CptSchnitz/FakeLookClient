import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostSimple } from 'src/app/posts/model/postSimple.model';
import { environment } from 'src/environments/environment';
import { NewPost } from '../../model/NewPost.model';
import { PostFilter } from '../../model/postFilter.model';
import { Post } from '../../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.backendUrl + '/api/posts';
  constructor(private http: HttpClient) { }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + '/' + id);
  }

  getPosts(filters?: PostFilter): Observable<PostSimple[]> {
    let url = this.apiUrl;
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
      queryString += `distance=${filters.distance}&lng=${filters.lng}&lat=${filters.lat}&`;
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
    return this.http.post<{ postId: number }>(this.apiUrl, formData);
  }
}
