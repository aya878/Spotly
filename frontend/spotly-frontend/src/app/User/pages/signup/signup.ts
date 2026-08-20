import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { container } from '../../components/registration/registration'; // 👈 تأكدي من مسار ملف التسجيل المظبوط عندك

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, container], // 👈 إضافته هنا ليتم استخدامه في الـ HTML
  templateUrl: './signup.html',
  styleUrl: './sigup.css'
})
export class SignupComponent {}