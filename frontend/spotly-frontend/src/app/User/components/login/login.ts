import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  HttpClientModule,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class containerlog {

  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = {
    email: '',
    password: ''
  };

  isPasswordVisible = false;

  togglePassword(): void {
    this.isPasswordVisible =
      !this.isPasswordVisible;
  }

  loginUser(event?: Event): void {

    if (event) {
      event.preventDefault();
    }

    const email =
      this.loginData.email.trim();

    const password =
      this.loginData.password;

    if (!email || !password) {
      alert(
        'Please fill in all required fields.'
      );
      return;
    }

    const payload = {
      email,
      password
    };

    this.authService
      .login(payload)
      .subscribe({

        next: (result: any) => {

          console.log(
            'LOGIN SUCCESS:',
            result
          );

          // SAVE TOKEN

          if (result.token) {

            localStorage.setItem(
              'userToken',
              result.token
            );
          }

          // SAVE USER DATA

          if (result.user) {

            localStorage.setItem(
              'userData',
              JSON.stringify(result.user)
            );

            // GET USER-SPECIFIC AVATAR

            const userKey =
              `userAvatar_${result.user.email}`;

            const savedAvatar =
              localStorage.getItem(userKey);

            if (savedAvatar) {

              localStorage.setItem(
                'userAvatar',
                savedAvatar
              );

            } else {
              localStorage.removeItem(
                'userAvatar'
              );
            }
          }
          alert(
            'Logged in successfully!'
          );
          // REDIRECT BY ACCOUNT TYPE
          const accountType =
            result.user?.accountType || 'user';

          if (
            accountType === 'organizer'
          ) {

            this.router.navigate([
              '/organizer/dashboard'
            ]);

          } else {

            this.router.navigate([
              '/home'
            ]);
          }
        },
        error: (
          err: HttpErrorResponse
        ) => {

          console.error(
            'Login Error:',
            err
          );
          const errorMessage =
            err.error?.message ||
            'Invalid email or password. Please try again.';

          alert(errorMessage);
        }
      });
  }
}