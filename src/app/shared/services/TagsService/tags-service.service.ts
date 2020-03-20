import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthHttpService } from 'src/app/auth-http.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl = environment.backendUrl + '/api/tags';
  constructor(private http: AuthHttpService) {}

  getTags(filter? : string): Observable<string[]> {
    const queryString = filter ? `?filter=${filter}` : ''
    return this.http.get<string[]>(this.apiUrl + queryString);
  }
}
