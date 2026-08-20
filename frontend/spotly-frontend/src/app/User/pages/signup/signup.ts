import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { container } from '../../components/registration/registration'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, container], 
  templateUrl: './signup.html',
  styleUrl: './sigup.css'
})
export class SignupComponent {}