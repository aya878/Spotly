import { Component, inject, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-profilemain',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profilemain.html',
  styleUrls: ['./profilemain.css']
})
export class profilecontainer implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  isLoading: boolean = true;
  isModalOpen: boolean = false;

  user: any = {
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
    tickets: []
  };

  editForm = {
    name: '',
    phone: '',
    city: '',
    avatarPreview: ''
  };

  selectedAvatarFile: File | null = null;

  ngOnInit(): void {
    this.fetchUserProfileData();
  }

// لو مش عامله لوجن وعايزه تشوفي البروفايل عطلي بتاعت التوكن عشان مش هتفتح لو مش عامله لوجن
  fetchUserProfileData(): void {
    const token = localStorage.getItem('userToken');

    if (!token) {
      alert('Please log in first.');
      this.router.navigate(['/signup']);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('https://api.spotly.com/v1/user/profile', { headers })
      .subscribe({
        next: (result) => {
          const userData = result.data || result;
          this.renderProfile(userData);
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching profile:', err);
          alert(err.error?.message || 'Network error. Unable to load profile data.');
          this.isLoading = false;
        }
      });
  }

  renderProfile(data: any): void {
    this.user.name = data.name || data.fullName || 'User';
    this.user.email = data.email || 'user@example.com';
    this.user.role = data.role || 'Event Explorer';
    this.user.phone = data.phone || '--';
    this.user.city = data.city || '--';
    this.user.favCategory = data.favCategory || '--';

    if (data.avatar || data.profileImage) {
      this.user.avatar = data.avatar || data.profileImage;
    }

    this.user.stats.booked = data.stats?.booked ?? data.bookedEventsCount ?? (data.tickets ? data.tickets.length : 0);
    this.user.stats.saved = data.stats?.saved ?? data.savedEventsCount ?? 0;
    this.user.stats.reviews = data.stats?.reviews ?? data.reviewsCount ?? 0;

    this.user.tickets = Array.isArray(data.tickets) ? data.tickets : [];
  }


  openModal(): void {
    this.editForm.name = this.user.name !== 'Loading...' ? this.user.name : '';
    this.editForm.phone = this.user.phone !== '--' ? this.user.phone : '';
    this.editForm.city = this.user.city !== '--' ? this.user.city : '';
    this.editForm.avatarPreview = this.user.avatar;
    this.selectedAvatarFile = null;

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


  onAvatarSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAvatarFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editForm.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  saveProfileChanges(event?: Event): void {
    if (event) event.preventDefault();

    const token = localStorage.getItem('userToken');

    const updatedData = {
      name: this.editForm.name.trim(),
      phone: this.editForm.phone.trim(),
      city: this.editForm.city.trim()
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.put<any>('https://api.spotly.com/v1/user/update-profile', updatedData, { headers })
      .subscribe({
        next: (result) => {
          this.user.name = this.editForm.name;
          this.user.phone = this.editForm.phone || '--';
          this.user.city = this.editForm.city || '--';

          if (this.selectedAvatarFile) {
            this.user.avatar = this.editForm.avatarPreview;
          }

          alert('Profile updated successfully!');
          this.closeModal();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Update Profile Error:', err);
          alert(err.error?.message || 'Network error. Failed to save changes.');
        }
      });
  }
saveProfile() {
  localStorage.setItem('userAvatar', this.editForm.avatarPreview);
  
  location.reload();
}


}