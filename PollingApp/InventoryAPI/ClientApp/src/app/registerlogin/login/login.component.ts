import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.http.post('https://localhost:7022/api/Account/login', this.loginData)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.toastr.success('Login successful!');
          this.router.navigate(['/']);
        },
        error: err => {
          console.error(err);
          this.toastr.error('Login failed. ' + (err.error?.message || ''));
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}

