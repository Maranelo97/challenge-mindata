import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

apiGetTEst: string= 'http://localhost:3000/api/heroes'

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


  getHeroes(page: number, limit: number): Observable<{ data: Hero[], total: number }> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.client.get<{ data: Hero[], total: number }>(this.apiGetTEst, { params });
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
