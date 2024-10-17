import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  // Charge les Pokémon avec leurs détails
  loadPokemons() {
    this.dataService.getPokemon().subscribe((data: any) => {
      const pokemonDetailsRequests = data.results.map((pokemon: any) =>
        this.dataService.getPokemonDetails(pokemon.name)
      );

      // Utilise forkJoin pour attendre que toutes les requêtes soient complètes
      forkJoin(pokemonDetailsRequests).subscribe((detailsList: any) => {
        this.pokemons = detailsList as any[];
      });
    });
  }

  // Cela redirige vers la page de détail en cliquant sur un Pokémon
  goToDetail(pokemonId: number) {
    this.router.navigate(['/pokemon', pokemonId]); // Navigue vers /pokemon/ID
  }
}
