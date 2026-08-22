import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = inject(ApiService);

  login(data: { email: string; password: string }) {
    return this.api.post('/auth/login', data);
  }

  register(data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
  }) {
    return this.api.post('/auth/register', data);
  }
}