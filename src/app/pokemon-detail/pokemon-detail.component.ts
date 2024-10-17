import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour *ngIf, *ngFor
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule], // Ajouter CommonModule ici
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id'); // Récupère l'ID du Pokémon depuis l'URL
    if (pokemonId) {
      this.dataService.getPokemonDetails(pokemonId).subscribe((data) => {
        this.pokemon = data; // Stocke les détails du Pokémon
      });
    }
  }

  // Fonction pour revenir à la liste des Pokémon
  goBack() {
    this.router.navigate(['/']); // Redirige vers la liste principale
  }
}
