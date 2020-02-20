import { Injectable } from '@angular/core';
import { SimpleUser } from '../../model/simpleUser.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHttpService } from 'src/app/auth-http.service';

const END_POINT = '/api/users';
const API_URL = environment.backendUrl + END_POINT;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: AuthHttpService) {}

  getUsers(filter?: string): Observable<SimpleUser[]> {
    const queryString = filter ? `?filter=${filter}` : '';
    return this.http.get<SimpleUser[]>(API_URL + queryString);
  }
}
