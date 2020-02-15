import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SimpleUser } from 'src/app/social/model/simpleUser.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {
  unsubscribe$ = new Subject();
  constructor(
    public router: Router,
    public authService: AuthenticationService
  ) {}

  loggedUser: SimpleUser;
  ngOnInit() {
    this.authService
      .getLoggedInUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        console.log(user);
        return (this.loggedUser = user);
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
