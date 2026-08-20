import { Routes } from '@angular/router';
import { Home } from './User/pages/home/home';
import { CategoryComponent } from './User/pages/category/category'; 
import { SignupComponent } from './User/pages/signup/signup';
import { SigninComponent } from './User/pages/signin/signin';
import { AboutusComponent } from './User/pages/aboutus/aboutus';
import { ProfileComponent } from './User/pages/profileuser/profileuser';
import { EventsComponent } from './User/pages/allevent/allevent';
import { EventsdetailsComponent } from './User/pages/eventdetailspage/eventdetailspage'; 
import { NotFound } from './not-found/not-found';
import { OrganizerLayout } from './organizer/organizer-layout/organizer-layout';

export const routes: Routes = [

  {  path: '',redirectTo: 'organizer/dashboard',pathMatch: 'full'},

  { path: 'home',loadComponent: () => import('./User/pages/home/home').then(m => m.Home)},

  { path: 'category',loadComponent: () => import('./User/pages/category/category').then(m => m.CategoryComponent)},

  { path: 'signup',loadComponent: () => import('./User/pages/signup/signup').then(m => m.SignupComponent)},

  { path: 'signin',loadComponent: () => import('./User/pages/signin/signin').then(m => m.SigninComponent)},

  { path: 'aboutus',loadComponent: () => import('./User/pages/aboutus/aboutus').then(m => m.AboutusComponent)},

  { path: 'profile',loadComponent: () => import('./User/pages/profileuser/profileuser').then(m => m.ProfileComponent)},

  { path: 'events',loadComponent: () => import('./User/pages/allevent/allevent').then(m => m.EventsComponent)},

  { path: 'event-details',loadComponent: () => import('./User/pages/eventdetailspage/eventdetailspage').then(m => m.EventsdetailsComponent)},


  { path: 'organizer',component: OrganizerLayout,

      children: [

      { path: 'dashboard',loadComponent: () => import('./organizer/pages/dashboard/dashboard').then(m => m.Dashboard)},

      { path: 'events', loadComponent: () =>import('./organizer/pages/events/events').then(m => m.Events)},

      { path: 'bookings',loadComponent: () => import('./organizer/pages/bookings/bookings').then(m => m.Bookings)},

      { path: 'earnings',loadComponent: () => import('./organizer/pages/earnings/earnings').then(m => m.Earnings) },

      { path: 'profile',loadComponent: () =>import('./organizer/pages/profile/profile').then(m => m.Profile)}
    ]
  },

  { path: '**',loadComponent: () => import('./not-found/not-found').then(m => m.NotFound)},

];

