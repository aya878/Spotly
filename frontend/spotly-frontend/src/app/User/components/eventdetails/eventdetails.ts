import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventdetails.html',
  styleUrls: ['./eventdetails.css']
})
export class details implements OnInit {
  private route = inject(ActivatedRoute);

  selectedEvent: any = null;

  eventsList = [
    { id: 1, title: 'Acoustic Night', category: 'music', price: 250, date: '14 Sep, 2026', image: 'image/1.jpg', desc: 'Enjoy beautiful acoustic performances in a relaxing atmosphere.' },
    { id: 2, title: 'Football Match', category: 'sports', price: 300, date: '15 Sep, 2026', image: 'image/2.jpg', desc: 'Exciting football match with top teams competing for the win.' },
    { id: 3, title: 'Modern Art Show', category: 'art', price: 200, date: '18 Sep, 2026', image: 'image/3.jpg', desc: 'Enjoy a unique collection of modern and creative artworks.' },
    { id: 4, title: 'Tech Conference 2026', category: 'technology', price: 500, date: '20 Sep, 2026', image: 'image/8.jpg', desc: 'Discover the latest trends and innovations in modern technology.' }
  ];

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id') || this.route.parent?.snapshot.paramMap.get('id');
    const eventId = Number(paramId);

    if (eventId) {
      this.selectedEvent = this.eventsList.find(event => event.id === eventId);
    }
  }

  confirmBooking(): void {
    if (this.selectedEvent) {
      alert(`🎉 Success! You booked a ticket for: ${this.selectedEvent.title}`);
    }
  }
}