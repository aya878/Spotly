import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  profile = {
    name: 'Esraa Saeed',
    email: 'organizer@spotly.com',
    phone: '+20 100 000 0000',
    location: 'Cairo, Egypt',
    password: 'Spotly@123'
  };

  passwordVisible = false;
  isEditing = false;

  ngOnInit(): void {

    const savedProfile = localStorage.getItem('spotlyProfile');

    if (savedProfile) {

      this.profile = JSON.parse(savedProfile);

    }

  }

  updateProfile(): void {

    if (!this.isEditing) {

      this.isEditing = true;

      return;

    }

    localStorage.setItem(
      'spotlyProfile',
      JSON.stringify(this.profile)
    );

    console.log('Updated Profile:', this.profile);

    this.isEditing = false;

  }

  togglePassword(): void {

    this.passwordVisible = !this.passwordVisible;

  }

}