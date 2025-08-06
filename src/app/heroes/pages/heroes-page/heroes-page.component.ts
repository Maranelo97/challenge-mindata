import { Component } from '@angular/core';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroFilterComponent } from "../../components/hero-filter/hero-filter.component";

@Component({
  selector: 'app-heroes-page',
  imports: [HeroListComponent, HeroFilterComponent],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.css'
})
export class HeroesPageComponent {

}
