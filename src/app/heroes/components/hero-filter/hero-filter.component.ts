import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../../core/models/Hero';

@Component({
  selector: 'app-hero-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.css']
})
export class HeroFilterComponent {
  @Input() heroes: Hero[] = [];
  @Output() filterChange = new EventEmitter<string>();

  searchTerm = '';
  filteredHeroes: Hero[] = [];

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredHeroes = term
      ? this.heroes.filter(h => h.name.toLowerCase().includes(term)).slice(0, 8)
      : [];
    this.filterChange.emit(this.searchTerm);
  }
  selectHero(name: string) {
    this.searchTerm = name;
    this.filteredHeroes = [];
    this.filterChange.emit(name);
  }
}
