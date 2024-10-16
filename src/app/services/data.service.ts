import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {} // Injection de HttpClient

  getPokemon(): Observable<any> {
    // Spécifiez le type de retour
    return this.http.get<any>(this.apiUrl);
  }
}
