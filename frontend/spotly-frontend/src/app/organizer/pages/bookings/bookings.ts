import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bookings',
  imports: [CurrencyPipe],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class Bookings {

  loading = false;

  bookings: any[] = [
    {
      id: 1,
      user: 'Ahmed Mohamed',
      event: 'Tech Conference 2026',
      date: '2026-08-20',
      tickets: 2,
      amount: 1200,
      status: 'Confirmed'
    },
    {
      id: 2,
      user: 'Sara Ali',
      event: 'Music Festival',
      date: '2026-08-22',
      tickets: 3,
      amount: 1800,
      status: 'Pending'
    },
    {
      id: 3,
      user: 'Omar Hassan',
      event: 'Business Summit',
      date: '2026-08-25',
      tickets: 1,
      amount: 750,
      status: 'Confirmed'
    },
    {
      id: 4,
      user: 'Mariam Ahmed',
      event: 'Startup Meetup',
      date: '2026-08-28',
      tickets: 4,
      amount: 2000,
      status: 'Confirmed'
    },
    {
      id: 5,
      user: 'Youssef Ali',
      event: 'Design Workshop',
      date: '2026-09-02',
      tickets: 2,
      amount: 900,
      status: 'Pending'
    },
    {
      id: 6,
      user: 'Nour Mohamed',
      event: 'Marketing Conference',
      date: '2026-09-05',
      tickets: 3,
      amount: 1500,
      status: 'Confirmed'
    }
  ];

}