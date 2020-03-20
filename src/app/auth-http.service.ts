import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from './authentication/services/authentication.service';
import { Observable, ObservableInput } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {
    console.log(router);

  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.getHeaders() }).pipe(catchError((err) => this.handleUnauthorized(err)));
  }

  post<T>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.getHeaders() }).pipe(catchError((err) => this.handleUnauthorized(err)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.getHeaders() }).pipe(catchError((err) => this.handleUnauthorized(err)));
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken()
    });
  }

  private handleUnauthorized(error: HttpErrorResponse): ObservableInput<any> {
    if (!(error.error instanceof ErrorEvent) && error.status === 401) {
      this.router.navigate(['/auth/login']);
    }
    throw error;
  }
}
