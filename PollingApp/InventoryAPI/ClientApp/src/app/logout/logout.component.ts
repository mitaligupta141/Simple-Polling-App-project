import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
 constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Remove token from localStorage (if stored there too)
    localStorage.removeItem('token');

    // Call API to remove cookie from backend
    this.http.post('https://localhost:7022/api/Account/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          // Redirect to login after logout
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error: () => {
          alert("Logout failed");
        }
      });
  }
}
