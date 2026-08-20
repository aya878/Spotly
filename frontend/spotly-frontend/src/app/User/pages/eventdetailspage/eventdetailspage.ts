import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { navbar } from '../../components/navbar/navbar';
import { details } from '../../components/eventdetails/eventdetails';
import { foot } from '../../components/footer/footer';

@Component({
  selector: 'app-eventdetailspage',
  standalone: true,
  imports: [
    CommonModule,
    navbar,
    details,
    foot
  ],
  templateUrl: './eventdetailspage.html',
  styleUrls: ['./eventdetailspage.css']
})
export class EventsdetailsComponent {
}