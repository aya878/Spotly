import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  stats = {
    totalEvents: 12,
    totalBookings: 148,
    totalEarnings: 65758.23,
    upcomingEvents: 5
  };

  upcomingEvents = [
    {
      id: 1,
      title: 'Tech Conference 2026',
      date: '20 Aug 2026',
      location: 'Cairo, Egypt',
      tickets: 120,
      image: '/images/events/event-1.jpg'
    },
    {
      id: 2,
      title: 'Music Festival',
      date: '25 Aug 2026',
      location: 'New Cairo',
      tickets: 250,
      image: '/images/events/event-2.jpg'
    },
    {
      id: 3,
      title: 'Business Summit',
      date: '05 Sep 2026',
      location: 'Cairo Marriott Hotel',
      tickets: 85,
      image: '/images/events/event-3.jpg'
    }
  ];

  recentBookings = [
    {
      id: 1,
      customer: 'Ahmed Mohamed',
      event: 'Tech Conference 2026',
      date: '18 Aug 2026',
      tickets: 2,
      amount: 2500,
      image: '/images/customers/customer-1.jpg'
    },
    {
      id: 2,
      customer: 'Sara Ali',
      event: 'Music Festival',
      date: '17 Aug 2026',
      tickets: 3,
      amount: 3600,
      image: '/images/customers/customer-2.jpg'
    },
    {
      id: 3,
      customer: 'Omar Hassan',
      event: 'Business Summit',
      date: '16 Aug 2026',
      tickets: 1,
      amount: 1500,
      image: '/images/customers/customer-1.jpg'
    }
  ];

}