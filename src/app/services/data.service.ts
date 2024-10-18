import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(offset: number = 0, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupère les détails d'un Pokémon spécifique
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      catchError(this.handleError) // Gérer$ les erreurs
    );
  }

  // Méthode de gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue', error);
    return throwError('Error');
  }
}
