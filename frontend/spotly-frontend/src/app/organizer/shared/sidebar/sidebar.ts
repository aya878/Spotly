import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  @Input() isOpen = false;

  profile = {
    name: 'Organizer',
    email: 'organizer@spotly.com',
    image: '/images/profile/organizer.png'
  };

}

