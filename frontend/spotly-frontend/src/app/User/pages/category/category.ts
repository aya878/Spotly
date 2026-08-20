import { Component } from '@angular/core';
import { navbar } from '../../components/navbar/navbar'; 
import { categoryhero } from '../../components/categoryhero/categoryhero'; 

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [navbar ,categoryhero], 
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent { }