import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {DettaglioFilmComponent} from './dettaglio-film/dettaglio-film.component';
import {MenuComponent} from "./menu/menu.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {SalaComponent} from "./sala/sala.component";
import {LoginComponent} from "./login/login.component";
import {AcquistoBigliettoComponent} from "./acquisto-biglietto/acquisto-biglietto.component";

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'film/:id', component: DettaglioFilmComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'sala/:id_sala/:id_film/:id_proiezione', component: SalaComponent},
  {path: 'login', component: LoginComponent},
  { path: 'acquisto-biglietto/:film/:data/:sala/:posti/:costo/:proiezione', component: AcquistoBigliettoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
