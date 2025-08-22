import { Component } from '@angular/core';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';


@Component({
  selector: 'app-heroes-page',
  imports: [HeroListComponent],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.css'
})
export class HeroesPageComponent {

}
