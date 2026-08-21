import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:5000/api/auth';

  profile = {
    name: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  };

  passwordVisible = false;
  isEditing = false;
  isLoading = true;

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {

    const token = localStorage.getItem('userToken');

    if (!token) {
      alert('Please login first.');
      this.router.navigate(['/signin']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http
      .get<any>(`${this.apiUrl}/profile`, { headers })
      .subscribe({

        next: (response) => {

          console.log('ORGANIZER PROFILE:', response);

          const user =
            response.user ||
            response.data ||
            response;

          if (user) {

            this.profile.name =
              user.fullName || '';

            this.profile.email =
              user.email || '';

            this.profile.phone =
              user.phone || '';

            this.profile.location =
              user.city || '';

          }

          this.isLoading = false;
        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'PROFILE ERROR:',
            error
          );

          this.isLoading = false;

          if (error.status === 401) {

            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');

            alert('Please login again.');

            this.router.navigate(['/signin']);

          } else {

            alert(
              error.error?.message ||
              'Failed to load profile.'
            );

          }

        }

      });
  }

  updateProfile(): void {

    if (!this.isEditing) {

      this.isEditing = true;

      return;
    }

    this.saveProfile();
  }

  saveProfile(): void {

    const token =
      localStorage.getItem('userToken');

    if (!token) {

      alert('Please login first.');

      return;
    }

    const updatedData = {

      fullName:
        this.profile.name.trim(),

      phone:
        this.profile.phone.trim(),

      city:
        this.profile.location.trim()

    };

    console.log(
      'ORGANIZER UPDATE:',
      updatedData
    );

    const headers = new HttpHeaders({

      'Content-Type':
        'application/json',

      Authorization:
        `Bearer ${token}`

    });

    this.http
      .put<any>(
        `${this.apiUrl}/profile`,
        updatedData,
        { headers }
      )
      .subscribe({

        next: (response) => {

          console.log(
            'PROFILE UPDATED:',
            response
          );

          const updatedUser =
            response.user ||
            response.data ||
            response;

          if (updatedUser) {

            this.profile.name =
              updatedUser.fullName ||
              this.profile.name;

            this.profile.email =
              updatedUser.email ||
              this.profile.email;

            this.profile.phone =
              updatedUser.phone ||
              '';

            this.profile.location =
              updatedUser.city ||
              '';

            localStorage.setItem(
              'userData',
              JSON.stringify(updatedUser)
            );
          }

          this.isEditing = false;

          alert(
            'Profile updated successfully!'
          );
        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'UPDATE PROFILE ERROR:',
            error
          );

          alert(
            error.error?.message ||
            `Update failed. Status: ${error.status}`
          );

        }

      });
  }

  togglePassword(): void {

    this.passwordVisible =
      !this.passwordVisible;

  }

}