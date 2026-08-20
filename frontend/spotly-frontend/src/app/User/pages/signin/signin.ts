import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containerlog } from '../../components/login/login'; 

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [CommonModule, containerlog], 
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class SigninComponent {}