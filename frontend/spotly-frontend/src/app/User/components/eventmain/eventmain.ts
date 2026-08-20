import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-eventmain',
  imports: [CommonModule, FormsModule, RouterLink,HttpClientModule],
  templateUrl: './eventmain.html',
  styleUrl: './eventmain.css'
})
export class totalevent {

  private router = inject(Router);

  eventsList = [
    { id: 1, title: 'Acoustic Night', category: 'music', price: 250, date: '2026-09-14', image: 'image/1.jpg', desc: 'Enjoy beautiful acoustic performances.' },
    { id: 2, title: 'Football Match', category: 'sports', price: 300, date: '2026-09-15', image: 'image/2.jpg', desc: 'Exciting football match with top teams.' },
    { id: 3, title: 'Modern Art Show', category: 'art', price: 200, date: '2026-09-18', image: 'image/3.jpg', desc: 'Enjoy a unique collection of modern art.' },
    { id: 4, title: 'Tech Conference 2026', category: 'technology', price: 500, date: '2026-09-20', image: 'image/8.jpg', desc: 'Discover the latest trends in technology.' }
  ];

  filteredEvents: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';

  ngOnInit(): void {
    this.filteredEvents = this.eventsList;
  }

  filterEvents(): void {
    this.filteredEvents = this.eventsList.filter(event => {
      const matchesCategory = this.selectedCategory === 'all' || event.category === this.selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }

goToDetails(eventId: number): void {
  // هيوجه لصفحة التفاصيل مع تمرير الـ ID بتاع الأيفنت
  this.router.navigate(['/eventdetails', eventId]);
}}
