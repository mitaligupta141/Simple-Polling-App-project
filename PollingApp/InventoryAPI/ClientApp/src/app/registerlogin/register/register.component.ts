import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  signupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isSubmitting = false;

  constructor(private http: HttpClient, private router: Router , private toastr: ToastrService) {}

  onSubmit() {
    if (this.isSubmitting) return;  // Prevent multiple submits

    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const registerData = {
      username: this.signupData.username,
      email: this.signupData.email,
      password: this.signupData.password
    };

    this.isSubmitting = true;

    this.http.post('https://localhost:7022/api/Account/register', registerData)
      .subscribe({
        next: () => {
          this.toastr.success("Registration successful!");
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Registration failed. ' + (err.error?.message || ''));
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
