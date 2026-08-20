import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoryhero',
  standalone: true,
  imports: [],
  templateUrl: './categoryhero.html',
  styleUrls: ['./categoryhero.css']
})
export class categoryhero {
  
  private router = inject(Router); 

  goToCategory(categoryName: string): void {
    this.router.navigate(['/allevent'], {
      queryParams: { category: categoryName }
    });
  }
}

