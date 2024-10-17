import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent }, // Route par défaut pour la liste
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent,
    outlet: 'pokemon-detail',
  }, // Route pour les détails d'un Pokémon
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AppRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
