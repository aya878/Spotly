import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventmain',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './eventmain.html',
  styleUrls: ['./eventmain.css']
})
export class totalevent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute); 

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
    const paramCategory = this.route.snapshot.queryParams['category'] || 
                          this.route.parent?.snapshot.queryParams['category'];

    if (paramCategory) {
      this.selectedCategory = paramCategory.toLowerCase();
    }

    this.filterEvents();

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'].toLowerCase();
        this.filterEvents();
      }
    });
  }

  filterEvents(): void {
    this.filteredEvents = this.eventsList.filter(event => {
      const matchesCategory = this.selectedCategory === 'all' || 
                              event.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchesSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }

  goToDetails(eventId: number): void {
    this.router.navigate(['/eventdetails', eventId]);
  }
}