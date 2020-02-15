import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import LoginInfo from '../model/loginInfo.model';
import { map } from 'rxjs/operators';
import { parseJSON, isPast, isFuture } from 'date-fns';
import RegisterInfo from '../model/register.model';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';

interface LoginResult {
  idToken: string;
  userId: number;
  firstName: string;
  lastName: string;
  expiration: Date;
}

const storageKeys = {
  idToken: 'idToken',
  expire: 'expiration',
  user: 'loggedUser'
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedUser$: BehaviorSubject<SimpleUser>;

  constructor(private http: HttpClient) {
    const userString = localStorage.getItem(storageKeys.user);
    this.loggedUser$ = new BehaviorSubject(
      userString ? JSON.parse(userString) : null
    );
  }

  private apiUrl: string = environment.backendUrl + '/api/auth';

  isEmailTaken(email: string): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + '/isTaken', {email});
  };

  login(loginInfo: LoginInfo): Observable<any> {
    return this.http.post<LoginResult>(this.apiUrl + '/login', loginInfo).pipe(
      map(result => {
        this.setSession(result);
        return true;
      })
    );
  }

  logout() {
    localStorage.removeItem(storageKeys.idToken);
    localStorage.removeItem(storageKeys.expire);
    localStorage.removeItem(storageKeys.user);
    this.loggedUser$.next(null);
  }

  register(registerInfo: RegisterInfo): Observable<any> {
    return this.http.post(this.apiUrl + '/register', registerInfo);
  }

  getToken(): string {
    return localStorage.getItem(storageKeys.idToken);
  }

  isLoggedIn(): boolean {
    const isLogged = isFuture(this.getExpiration());
    if (!isLogged && this.loggedUser$.value) {
      this.logout();
    }
    return isLogged;
  }

  getLoggedInUser(): Observable<SimpleUser | null> {
    return this.loggedUser$.asObservable();
  }

  private setSession(result: LoginResult) {
    const { idToken, expiration, ...user } = result;
    this.loggedUser$.next(user);
    localStorage.setItem(storageKeys.idToken, idToken);
    localStorage.setItem(storageKeys.expire, JSON.stringify(expiration));
    localStorage.setItem(storageKeys.user, JSON.stringify(user));
  }

  getExpiration(): Date {
    const date = localStorage.getItem(storageKeys.expire);
    return parseJSON(date);
  }
}
