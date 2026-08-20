import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login-form', 
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class containerlog {
  private http = inject(HttpClient);
  private router = inject(Router);

  loginData = {
    email: '',
    password: ''
  };

  isPasswordVisible: boolean = false;

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  loginUser(event?: Event): void {
    if (event) event.preventDefault();

    const email = this.loginData.email.trim();
    const password = this.loginData.password;

    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      email: email,
      password: password
    };

    this.http.post<any>('https://api.spotly.com/v1/auth/login', payload)
      .subscribe({
        next: (result: any) => {
          if (result.token) {
            localStorage.setItem('userToken', result.token);
          }
          if (result.user) {
            localStorage.setItem('userData', JSON.stringify(result.user));
          }

          alert('Logged in successfully!');

          const userRole = result.user?.role || 'user';
          if (userRole === 'organizer') {
            this.router.navigate(['/organizer-dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Login Error:', err);
          const errorMessage = err.error?.message || 'Invalid email or password. Please try again.';
          alert(errorMessage);
        }
      });
  }
}