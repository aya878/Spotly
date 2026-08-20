import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-earnings',
  imports: [CurrencyPipe],
  templateUrl: './earnings.html',
  styleUrl: './earnings.css'
})
export class Earnings {

  totalEarnings = 65758.23;
  availableBalance = 52150.00;
  pendingBalance = 13608.23;

  transactions = [
    {
      id: 1,
      event: 'Tech Conference 2026',
      date: '2026-09-15',
      amount: 12500,
      status: 'Confirmed'
    },
    {
      id: 2,
      event: 'Music Festival',
      date: '2026-08-10',
      amount: 18500,
      status: 'Confirmed'
    },
    {
      id: 3,
      event: 'Business Summit',
      date: '2026-10-05',
      amount: 9600,
      status: 'Pending'
    },
    {
      id: 4,
      event: 'Startup Meetup',
      date: '2026-07-20',
      amount: 15158.23,
      status: 'Confirmed'
    }
  ];

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}