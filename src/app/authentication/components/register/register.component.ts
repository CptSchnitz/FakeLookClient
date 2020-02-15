import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { subYears, isBefore } from 'date-fns';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.validateEmailNotUsed.bind(this)]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ]),
    workPlace: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    birthDate: new FormControl('', [
      Validators.required,
      this.validateAtLeastTwelve
    ])
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get workPlace() {
    return this.registerForm.get('workPlace');
  }
  get birthDate() {
    return this.registerForm.get('birthDate');
  }

  validateAtLeastTwelve(control: AbstractControl): ValidationErrors | null {
    const controlDate = new Date(control.value);
    const twelveYearsAgo = subYears(new Date(), 12);
    console.log(controlDate, twelveYearsAgo);
    
    if (isBefore(controlDate, twelveYearsAgo)) {
      return null;
    } else {
      console.log('lol');
      
      return { NotOldEnough: true };
    }
  }

  validateEmailNotUsed(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(1000).pipe(
      switchMap(() =>
        this.authService.isEmailTaken(control.value).pipe(
          catchError(() => of({ emailTaken: true })),
          map(isTaken => {
            if (isTaken) {
              return { emailTaken: true };
            } else {
              return null;
            }
          })
        )
      )
    );
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.toastr.success('Please log in.', 'Registration was successful.');
      this.router.navigate(['/auth/login']);
    });
  }
}
