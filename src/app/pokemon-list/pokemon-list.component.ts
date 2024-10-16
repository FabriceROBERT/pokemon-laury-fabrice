import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPokemon().subscribe((data: any) => {
      console.log(data);
    });
  }
}
