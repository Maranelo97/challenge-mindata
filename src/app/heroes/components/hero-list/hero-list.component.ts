import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HeroesService } from '../../../core/services/heroes.service';
import { Hero } from '../../../core/models/Hero';
import { SHARED_MATERIAL_MODULES } from '../../../shared/components/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroFilterComponent } from '../hero-filter/hero-filter.component';
import { ThanosEffectService } from '../../services/thanos-effect.service';
import { Subscription } from 'rxjs';

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
    MatProgressSpinnerModule,
    HeroFilterComponent,
  ],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  isImagesLoaded = false;
  heroes: Hero[] = [];
  visibleHeroes: Hero[] = [];
  batchSize = 20;
  currentIndex = 0;

isLoading = false;
    currentPage = 1;
  pageSize = 20; // Define el tamaño de página que deseas
  totalHeroes = 0;
  private subscription: Subscription = new Subscription();

  selectedHero: Hero | null = null;
  isDrawerOpen = false;

  @ViewChild('anchor', { static: true }) anchor!: ElementRef;
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;


   @ViewChild('sentinel', { static: true }) sentinel!: ElementRef;
  private observer!: IntersectionObserver;

  constructor(
    private heroesService: HeroesService,
    private thanos: ThanosEffectService
  ) {}

  ngOnInit(): void {

    /* 
    this.heroesService.getAllHeroes();
    this.heroesService.heroes$.subscribe((heroes) => {
      this.heroes = heroes; // ahora es un arreglo de héroes
      this.loadMore(); // carga inicial
    }); */


        this.loadHeroes();

  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadMore();
      }
    });
    this.observer.observe(this.anchor.nativeElement);


        this.setupIntersectionObserver();
  }

  loadMore(): void {
    const nextChunk = this.heroes.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );
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


    loadHeroes(): void {
    if (this.isLoading || (this.heroes.length >= this.totalHeroes && this.totalHeroes > 0)) {
      return;
    }

    this.isLoading = true;
    this.subscription.add(
      this.heroesService.getHeroes(this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.totalHeroes = response.total;
          this.heroes = [...this.heroes, ...response.data];
          this.visibleHeroes = this.heroes;
          this.isLoading = false;
          this.currentPage++;
        },
        error: (err) => {
          console.error('Error al cargar héroes', err);
          this.isLoading = false;
        },
      })
    );
  }

  openDetails(hero: Hero): void {
    this.selectedHero = hero;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  onFilterChange(searchTerm: string) {
    if (!searchTerm) {
      this.visibleHeroes = this.heroes.slice(0, this.batchSize);
      this.currentIndex = this.batchSize;
      return;
    }
    this.visibleHeroes = this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onMouseMove(event: MouseEvent, target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return;

    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    target.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // Actualizar posición del reflejo
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    target.style.setProperty('--glow-x', `${glowX}%`);
    target.style.setProperty('--glow-y', `${glowY}%`);
  }

  onMouseLeave(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return;
    target.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    target.style.setProperty('--glow-x', `50%`);
    target.style.setProperty('--glow-y', `50%`);
  }



  setupIntersectionObserver(): void {
    const options = {
      root: this.scrollContainer.nativeElement,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading) {
          this.loadHeroes();
        }
      });
    }, options);

    observer.observe(this.sentinel.nativeElement);
  }
}
