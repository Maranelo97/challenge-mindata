import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Hero } from '../models/Hero';
import { PaginatedHeroes } from '../models/PaginatedHeroes';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private heroesSubject = new BehaviorSubject<Hero[]>([]); // inicializamos con arreglo vacío
  public heroes$: Observable<Hero[]> = this.heroesSubject.asObservable(); // observable público

  constructor(private client: HttpClient) {}
  getAllHeroes(): void {
    this.client
      .get<PaginatedHeroes>(`${environment.apiUrl}/api/heroes?&limit=50`)
      .subscribe({
        next: (response) => {
          const heroes = response.data.map((h) => this.parseHero(h));
          this.heroesSubject.next(heroes);
        },
        error: (error) => console.error('Error fetching heroes:', error),
      });
  }

  private parseHero(raw: any): Hero {
    return {
      ...raw,
      powerstats: JSON.parse(raw.powerstats),
      appearance: JSON.parse(raw.appearance),
      biography: JSON.parse(raw.biography),
      work: JSON.parse(raw.work),
      connections: JSON.parse(raw.connections),
      images: JSON.parse(raw.images),
    };
  }
}
