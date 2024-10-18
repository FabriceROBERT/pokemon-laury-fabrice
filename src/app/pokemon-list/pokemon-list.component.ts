import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  totalPokemons: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons(0, this.pageSize);
  }

  loadPokemons(offset: number, limit: number) {
    this.dataService.getPokemon(offset, limit).subscribe((data: any) => {
      this.totalPokemons = data.count;
      const pokemonDetailsRequests = data.results.map((pokemon: any) =>
        this.dataService.getPokemonDetails(pokemon.name)
      );

      forkJoin(pokemonDetailsRequests).subscribe((detailsList: any) => {
        this.pokemons = detailsList as any[];
      });
    });
  }

  goToDetail(pokemonId: number) {
    this.router.navigate(['/pokemon', pokemonId]);
  }

  onPageChange(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    this.loadPokemons(offset, event.pageSize);
  }

  catchPokemon(pokemonId: number) {
    let caughtPokemons: number[] = JSON.parse(localStorage.getItem('caughtPokemons') || '[]');
    if (!caughtPokemons.includes(pokemonId)) {
      caughtPokemons.push(pokemonId);
      localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
      alert('Pokemon caught and added to your Pokedex!');
    } else {
      alert('You have already caught this Pokemon!');
    }
  }
}
