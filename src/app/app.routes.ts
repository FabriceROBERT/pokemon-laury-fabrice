import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent }, // Route principale
  { path: 'pokemon/:id', component: PokemonDetailComponent }, // Route de détail
  { path: 'pokedex', component: PokedexComponent }, // Nouvelle route pour Pokedex
  { path: '**', component: NotFoundComponent }, // Route 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
