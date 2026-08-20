import { RouterLinkActive } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class navbar {

  menuOpen = false;

  userAvatar = '/image/389068855330083718.jpg';

  private router = inject(Router);


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  ngOnInit(): void {

    this.loadAvatar();

    window.addEventListener(
      'profileUpdated',
      () => {
        this.loadAvatar();
      }
    );

  }


  loadAvatar(): void {

    const savedAvatar =
      localStorage.getItem('userAvatar');

    if (savedAvatar) {
      this.userAvatar = savedAvatar;
    }

  }


  goToContact() {

    this.router.navigate(['/']).then(() => {

      setTimeout(() => {

        const element =
          document.getElementById('contact');

        if (element) {

          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

        }

      }, 100);

    });

  }

}