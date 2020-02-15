import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  ngOnInit() {}

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({next: () =>{
      this.toastr.success('logged in');
      this.router.navigate(['/posts/mapfeed']);
    }, error: () => this.toastr.error('login failed')});
  }
}
