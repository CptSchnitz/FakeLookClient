import { Injectable } from '@angular/core';
import { SimpleUser } from '../../model/simpleUser.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHttpService } from 'src/app/auth-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.backendUrl + '/api/users';
  constructor(private http: AuthHttpService) {}

  getUsers(filter? : string): Observable<SimpleUser[]> {
    const queryString = filter ? `?filter=${filter}` : ''
    return this.http.get<SimpleUser[]>(this.apiUrl + queryString);
  }
}
