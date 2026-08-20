import { Component } from '@angular/core';
import { navbar } from '../../components/navbar/navbar';
import { head } from '../../components/hero/hero';
import { upcoming } from '../../components/event/event';
import { popular } from '../../components/popular-events/popular-events';
import { features } from '../../components/features/features';
import { foot } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [navbar,head,upcoming,popular,features,foot],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}