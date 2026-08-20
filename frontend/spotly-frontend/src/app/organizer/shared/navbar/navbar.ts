import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  @Output() menuClick = new EventEmitter<void>();

  profile = {
    name: 'Organizer',
    email: 'organizer@spotly.com',
    image: '/images/profile/organizer.png'
  };

  pageTitle = 'Dashboard';

  constructor(private router: Router) {

    this.router.events.subscribe(() => {
      this.updatePageTitle();
    });

  }

  updatePageTitle() {

    const url = this.router.url;

    if (url.includes('/organizer/dashboard')) {
      this.pageTitle = 'Dashboard';

    } else if (url.includes('/organizer/events')) {
      this.pageTitle = 'Events';

    } else if (url.includes('/organizer/bookings')) {
      this.pageTitle = 'Bookings';

    } else if (url.includes('/organizer/earnings')) {
      this.pageTitle = 'Earnings';

    } else if (url.includes('/organizer/profile')) {
      this.pageTitle = 'Profile';

    } else if (url.includes('/organizer/settings')) {
      this.pageTitle = 'Settings';

    } else if (url.includes('/organizer/my-event')) {
      this.pageTitle = 'My Events';
    }

  }

  toggleMenu() {
    this.menuClick.emit();
  }

}