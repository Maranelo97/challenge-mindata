import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Hero } from '../models/Hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private heroesSubject = new BehaviorSubject<Hero[]>([]); // inicializamos con arreglo vacío
  public heroes$: Observable<Hero[]> = this.heroesSubject.asObservable(); // observable público

  constructor(private client: HttpClient) {}

  getAllHeroes(): void {
    this.client.get<Hero[]>(`${environment.apiUrl}/api/heroes`).subscribe({
      next: (response) => {
        console.log('Heroes:', response);
        this.heroesSubject.next(response); // ✅ emitimos a los suscriptores
      },
      error: (error) => console.error('Error fetching heroes:', error),
    });
  }
}
