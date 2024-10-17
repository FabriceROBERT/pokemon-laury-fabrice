import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';

  constructor(private http: HttpClient) {}

  // Récupère une liste de Pokémon
  getPokemon(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError) // Gére les erreurs
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
