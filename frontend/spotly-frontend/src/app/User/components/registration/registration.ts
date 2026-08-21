import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class container {

  private authService = inject(AuthService);
  private router = inject(Router);

  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  };

  isPasswordVisible = false;
  isConfirmPasswordVisible = false;

  selectRole(role: string): void {
    this.registerData.role = role;
  }

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPassword(): void {
    this.isConfirmPasswordVisible =
      !this.isConfirmPasswordVisible;
  }

  createAccount(event?: Event): void {

    if (event) {
      event.preventDefault();
    }

    const name = this.registerData.fullName.trim();
    const email = this.registerData.email.trim();
    const password = this.registerData.password;
    const confirmPassword =
      this.registerData.confirmPassword;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Data expected by Backend
    const payload = {
      fullName: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      accountType: this.registerData.role
    };

    // Send registration request
    this.authService.register(payload).subscribe({

      next: (result: any) => {

        console.log('Registration Success:', result);

        if (result.token) {
          localStorage.setItem(
            'userToken',
            result.token
          );
        }

        if (result.user) {
          localStorage.setItem(
            'userData',
            JSON.stringify(result.user)
          );
        }

        alert('Account created successfully!');

        if (this.registerData.role === 'organizer') {
          this.router.navigate([
            '/organizer/dashboard'
          ]);
        } else {
          this.router.navigate(['/home']);
        }
      },

      error: (err: HttpErrorResponse) => {

        console.error(
          'Registration Error:',
          err
        );

        const errorMessage =
          err.error?.message ||
          'Registration failed. Please try again.';

        alert(errorMessage);
      }
    });
  }
}