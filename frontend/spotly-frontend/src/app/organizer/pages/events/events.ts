import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {

  events: any[] = [
    {
      id: 1,
      title: 'Tech Conference 2026',
      category: 'Conference',
      date: '2026-08-25',
      location: 'Cairo, Egypt',
      ticketsSold: 10,
      totalTickets: 20,
      ticketPrice: 300,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Music Festival',
      category: 'Music',
      date: '2026-08-10',
      location: 'Giza, Egypt',
      ticketsSold: 15,
      totalTickets: 20,
      ticketPrice: 450,
      status: 'Past'
    },
    {
      id: 3,
      title: 'Business Summit',
      category: 'Business',
      date: '2026-09-15',
      location: 'New Cairo, Egypt',
      ticketsSold: 8,
      totalTickets: 15,
      ticketPrice: 500,
      status: 'Upcoming'
    },
    {
      id: 4,
      title: 'Startup Meetup',
      category: 'Workshop',
      date: '2026-07-20',
      location: 'Alexandria, Egypt',
      ticketsSold: 10,
      totalTickets: 20,
      ticketPrice: 250,
      status: 'Past'
    }
  ];

  loading = false;
  showForm = false;
  editingId: number | null = null;

  newEvent = {
    title: '',
    category: '',
    date: '',
    location: '',
    ticketsSold: 0,
    totalTickets: 0,
    ticketPrice: 0
  };

  getStatus(date: string): string {

    if (!date) {
      return 'Upcoming';
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(date);

    eventDate.setHours(0, 0, 0, 0);

    return eventDate >= today
      ? 'Upcoming'
      : 'Past';
  }

  openAddForm(): void {

    this.editingId = null;

    this.newEvent = {
      title: '',
      category: '',
      date: '',
      location: '',
      ticketsSold: 0,
      totalTickets: 0,
      ticketPrice: 0
    };

    this.showForm = true;
  }

  closeForm(): void {

    this.showForm = false;
    this.editingId = null;

    this.newEvent = {
      title: '',
      category: '',
      date: '',
      location: '',
      ticketsSold: 0,
      totalTickets: 0,
      ticketPrice: 0
    };
  }

  addEvent(): void {

    if (
      !this.newEvent.title.trim() ||
      !this.newEvent.category ||
      !this.newEvent.date ||
      !this.newEvent.location.trim()
    ) {
      return;
    }

    const event = {
      id: Date.now(),
      title: this.newEvent.title.trim(),
      category: this.newEvent.category,
      date: this.newEvent.date,
      location: this.newEvent.location.trim(),
      ticketsSold: Math.max(
        0,
        Number(this.newEvent.ticketsSold) || 0
      ),
      totalTickets: Math.max(
        0,
        Number(this.newEvent.totalTickets) || 0
      ),
      ticketPrice: Math.max(
        0,
        Number(this.newEvent.ticketPrice) || 0
      ),
      status: this.getStatus(this.newEvent.date)
    };

    this.events.unshift(event);

    this.closeForm();
  }

  startEdit(event: any): void {

    this.editingId = event.id;

    this.newEvent = {
      title: event.title,
      category: event.category,
      date: event.date,
      location: event.location,
      ticketsSold: event.ticketsSold,
      totalTickets: event.totalTickets,
      ticketPrice: event.ticketPrice
    };

    this.showForm = true;
  }

  updateEvent(): void {

    if (
      this.editingId === null ||
      !this.newEvent.title.trim() ||
      !this.newEvent.category ||
      !this.newEvent.date ||
      !this.newEvent.location.trim()
    ) {
      return;
    }

    this.events = this.events.map(event => {

      if (event.id !== this.editingId) {
        return event;
      }

      return {
        ...event,
        title: this.newEvent.title.trim(),
        category: this.newEvent.category,
        date: this.newEvent.date,
        location: this.newEvent.location.trim(),
        ticketsSold: Math.max(
          0,
          Number(this.newEvent.ticketsSold) || 0
        ),
        totalTickets: Math.max(
          0,
          Number(this.newEvent.totalTickets) || 0
        ),
        ticketPrice: Math.max(
          0,
          Number(this.newEvent.ticketPrice) || 0
        ),
        status: this.getStatus(this.newEvent.date)
      };

    });

    this.closeForm();
  }

  deleteEvent(id: number): void {

    this.events = this.events.filter(
      event => event.id !== id
    );
  }

}
