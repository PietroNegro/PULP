import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilmsComponent} from './films/films.component';
import {
  DettaglioFilmComponent,
  FilterByDatePipe,
  MapToUniqueDatesPipe
} from './dettaglio-film/dettaglio-film.component';
import {MenuComponent} from './menu/menu.component';
import {HomepageComponent} from './homepage/homepage.component';
import {SalaComponent} from './sala/sala.component';
import {LoginComponent} from './login/login.component';
import { AcquistoBigliettoComponent } from './acquisto-biglietto/acquisto-biglietto.component';
@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    DettaglioFilmComponent,
    MenuComponent,
    HomepageComponent,
    MapToUniqueDatesPipe,
    FilterByDatePipe,
    SalaComponent,
    LoginComponent,
    AcquistoBigliettoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'it-IT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
