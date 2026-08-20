import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navbar } from '../../components/navbar/navbar';
import { totalevent } from '../../components/eventmain/eventmain';
import { foot } from '../../components/footer/footer';

@Component({
  selector: 'app-allevent',
  standalone: true,
  imports: [
    CommonModule,
    navbar,
    totalevent,
    foot
  ],
  templateUrl: './allevent.html',
  styleUrls: ['./allevent.css']
})
export class EventsComponent {
}