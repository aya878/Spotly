import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-organizer-layout',
  imports: [
    RouterOutlet,
    Sidebar,
    Navbar
  ],
  templateUrl: './organizer-layout.html',
  styleUrl: './organizer-layout.css'
})
export class OrganizerLayout {

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

}
