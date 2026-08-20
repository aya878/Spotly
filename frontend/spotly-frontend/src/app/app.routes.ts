import { Routes } from '@angular/router';

import { OrganizerLayout } from './organizer/organizer-layout/organizer-layout';

export const routes: Routes = [

  {  path: '',redirectTo: 'organizer/dashboard',pathMatch: 'full'},

  { path: 'home',loadComponent: () =>import('./User/pages/home/home').then(m => m.Home)},

  { path: 'organizer',component: OrganizerLayout,

      children: [

      { path: 'dashboard',loadComponent: () => import('./organizer/pages/dashboard/dashboard').then(m => m.Dashboard)},

      { path: 'events', loadComponent: () =>import('./organizer/pages/events/events').then(m => m.Events)},

      { path: 'bookings',loadComponent: () => import('./organizer/pages/bookings/bookings').then(m => m.Bookings)},

      { path: 'earnings',loadComponent: () => import('./organizer/pages/earnings/earnings').then(m => m.Earnings) },

      { path: 'profile',loadComponent: () =>import('./organizer/pages/profile/profile').then(m => m.Profile)}

    ]
  }
];