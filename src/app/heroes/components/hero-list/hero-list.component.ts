import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HeroesService } from '../../../core/services/heroes.service';
import { Hero } from '../../../core/models/Hero';
import { SHARED_MATERIAL_MODULES } from '../../../shared/components/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ...SHARED_MATERIAL_MODULES,
    MatSidenavModule,
    HeroDetailsComponent,
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  isImagesLoaded = false;
  heroes: Hero[] = [];
  visibleHeroes: Hero[] = [];
  batchSize = 24;
  currentIndex = 0;

  selectedHero: Hero | null = null;
  isDrawerOpen = false;

  @ViewChild('anchor', { static: true }) anchor!: ElementRef;

  private observer!: IntersectionObserver;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getAllHeroes();
    this.heroesService.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
      this.loadMore(); // Carga inicial
    });
  }

ngAfterViewInit(): void {
  this.observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      this.loadMore();
    }
  });
  this.observer.observe(this.anchor.nativeElement);
}

loadMore(): void {
  const nextChunk = this.heroes.slice(this.currentIndex, this.currentIndex + this.batchSize);
  this.visibleHeroes.push(...nextChunk);
  this.currentIndex += this.batchSize;

  // Esperamos a que se carguen todas las imágenes visibles
  setTimeout(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const imagePromises = images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    });
    Promise.all(imagePromises).then(() => {
      this.isImagesLoaded = true;
    });
  });
}

  openDetails(hero: Hero): void {
    this.selectedHero = hero;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }
}
