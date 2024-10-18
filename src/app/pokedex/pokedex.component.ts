import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  caughtPokemons: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadCaughtPokemons();
  }

  loadCaughtPokemons() {
    const caughtPokemonIds = JSON.parse(localStorage.getItem('caughtPokemons') || '[]');
    console.log('Caught Pokemon IDs:', caughtPokemonIds);

    const pokemonRequests: Observable<any>[] = caughtPokemonIds.map((id: number) => 
      this.dataService.getPokemonDetails(id.toString())
    );

    if (pokemonRequests.length > 0) {
      forkJoin(pokemonRequests).subscribe({
        next: (pokemons: any[]) => {
          console.log('Loaded Pokemons:', pokemons);
          this.caughtPokemons = pokemons;
        },
        error: (error) => {
          console.error('Error loading caught Pokemons:', error);
        }
      });
    } else {
      console.log('No caught Pokemons found');
    }
  }

  releasePokemon(pokemonId: number) {
    let caughtPokemonIds = JSON.parse(localStorage.getItem('caughtPokemons') || '[]');
    caughtPokemonIds = caughtPokemonIds.filter((id: number) => id !== pokemonId);
    localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemonIds));
    this.loadCaughtPokemons();
  }
}
