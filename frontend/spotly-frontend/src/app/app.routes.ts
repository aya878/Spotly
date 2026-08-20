import { Routes } from '@angular/router';
import { Home } from './User/pages/home/home';
import { CategoryComponent } from './User/pages/category/category'; 
import { SignupComponent } from './User/pages/signup/signup';
import { SigninComponent } from './User/pages/signin/signin';
import { AboutusComponent } from './User/pages/aboutus/aboutus';
import { ProfileComponent } from './User/pages/profileuser/profileuser';
import { EventsComponent } from './User/pages/allevent/allevent';
import { EventsdetailsComponent } from './User/pages/eventdetailspage/eventdetailspage'; 

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
  { path: 'category', component: CategoryComponent },
  { path: 'signup', component: SignupComponent },
{ path: 'signin', component: SigninComponent },
{ path: 'signin', component: SigninComponent },
{ path: 'aboutus', component: AboutusComponent },
{ path: 'profileuser', component: ProfileComponent },
{ path: 'allevent', component: EventsComponent },
{ path: 'eventdetails/:id', component: EventsdetailsComponent }

]
