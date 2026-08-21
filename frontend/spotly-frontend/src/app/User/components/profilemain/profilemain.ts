import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

@Component({
  selector: 'app-profilemain',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profilemain.html',
  styleUrls: ['./profilemain.css']
})
export class profilecontainer implements OnInit {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:5000/api/auth';

  isLoading = true;
  isModalOpen = false;

  user = {
    name: '',
    email: '',
    role: 'Event Explorer',
    avatar: 'user-avatar.png',
    phone: '--',
    city: '--',
    favCategory: '--',
    stats: {
      booked: 0,
      saved: 0,
      reviews: 0
    },
    tickets: [] as any[]
  };

  editForm = {
    name: '',
    phone: '',
    city: '',
    avatarPreview: 'user-avatar.png'
  };

  selectedAvatarFile: File | null = null;

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

    this.http.get<any>(
      `${this.apiUrl}/profile`,
      { headers }
    ).subscribe({

      next: (response) => {

        console.log('PROFILE:', response);

        const data =
          response.user ||
          response.data ||
          response;

        console.log('NAME:', data.fullName);
        console.log('EMAIL:', data.email);

        if (data) {

          this.user.name =
            data.fullName || 'User';

          this.user.email =
            data.email || '';

          this.user.phone =
            data.phone || '--';

          this.user.city =
            data.city || '--';

          if (data.accountType === 'organizer') {

            this.user.role = 'Organizer';

          } else if (data.accountType === 'admin') {

            this.user.role = 'Admin';

          } else {

            this.user.role = 'Event Explorer';
          }

          const userKey =
            `userAvatar_${data.email}`;

          const savedAvatar =
            localStorage.getItem(userKey);

          if (savedAvatar) {

            this.user.avatar =
              savedAvatar;

          } else if (data.avatar) {

            this.user.avatar =
              data.avatar;

          } else {

            this.user.avatar =
              'user-avatar.png';
          }

          localStorage.setItem(
            'userData',
            JSON.stringify(data)
          );

          this.user.stats.booked =
            data.stats?.booked ??
            data.bookedEventsCount ??
            0;

          this.user.stats.saved =
            data.stats?.saved ??
            data.savedEventsCount ??
            0;

          this.user.stats.reviews =
            data.stats?.reviews ??
            data.reviewsCount ??
            0;

          this.user.tickets =
            Array.isArray(data.tickets)
              ? data.tickets
              : [];
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

          localStorage.removeItem(
            'userToken'
          );

          localStorage.removeItem(
            'userData'
          );

          alert('Please login again.');

          this.router.navigate([
            '/signin'
          ]);

        } else {

          alert(
            error.error?.message ||
            'Failed to load profile.'
          );
        }
      }
    });
  }

  openModal(): void {

    console.log(
      'EDIT BUTTON CLICKED'
    );

    this.editForm.name =
      this.user.name;

    this.editForm.phone =
      this.user.phone === '--'
        ? ''
        : this.user.phone;

    this.editForm.city =
      this.user.city === '--'
        ? ''
        : this.user.city;

    this.editForm.avatarPreview =
      this.user.avatar;

    this.selectedAvatarFile = null;

    this.isModalOpen = true;
  }

  closeModal(): void {

    this.isModalOpen = false;
  }

  onAvatarSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const file =
      input.files[0];

    this.selectedAvatarFile = file;

    const reader =
      new FileReader();

    reader.onload = () => {

      const image =
        reader.result as string;

      this.editForm.avatarPreview =
        image;

      this.user.avatar =
        image;
    };

    reader.readAsDataURL(file);
  }

  saveProfileChanges(
    event?: Event
  ): void {

    if (event) {
      event.preventDefault();
    }

    const token =
      localStorage.getItem(
        'userToken'
      );

    if (!token) {

      alert(
        'Please login first.'
      );

      return;
    }

    const updatedData = {

      fullName:
        this.editForm.name.trim(),

      phone:
        this.editForm.phone.trim(),

      city:
        this.editForm.city.trim()
    };

    console.log(
      'SENDING:',
      updatedData
    );

    const headers =
      new HttpHeaders({

        'Content-Type':
          'application/json',

        Authorization:
          `Bearer ${token}`
      });

    this.http.put<any>(
      `${this.apiUrl}/profile`,
      updatedData,
      { headers }
    ).subscribe({

      next: (result) => {

        console.log(
          'SAVE SUCCESS:',
          result
        );

        const updatedUser =
          result.user ||
          result.data ||
          result;

        this.user.name =
          updatedUser.fullName ||
          this.editForm.name;

        this.user.email =
          updatedUser.email ||
          this.user.email;

        this.user.phone =
          updatedUser.phone ||
          '--';

        this.user.city =
          updatedUser.city ||
          '--';

        localStorage.setItem(
          'userData',
          JSON.stringify(
            updatedUser
          )
        );

        if (
          this.selectedAvatarFile
        ) {

          this.user.avatar =
            this.editForm.avatarPreview;

          if (updatedUser.email) {

            const userKey =
              `userAvatar_${updatedUser.email}`;

            localStorage.setItem(
              userKey,
              this.editForm.avatarPreview
            );
          }
        }

        this.selectedAvatarFile =
          null;

        this.isModalOpen =
          false;

        alert(
          'Profile updated successfully!'
        );
      },

      error: (
        err: HttpErrorResponse
      ) => {

        console.error(
          'SAVE ERROR:',
          err
        );

        alert(
          err.error?.message ||
          `Update failed. Status: ${err.status}`
        );
      }
    });
  }
}