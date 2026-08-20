import { Component } from '@angular/core';
import { navbar } from '../../components/navbar/navbar';
import { profilecontainer } from '../../components/profilemain/profilemain'; 


@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [navbar , profilecontainer], 
  templateUrl: './profileuser.html',
  styleUrl: './profileuser.css'
})
export class ProfileComponent { }