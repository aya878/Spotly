import { Component } from '@angular/core';
import { navbar } from '../../components/navbar/navbar';
import { spotlyabout } from '../../components/aboutmain/aboutmain'; 


@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [navbar , spotlyabout], 
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.css'
})
export class AboutusComponent { }