import {Component, OnInit} from '@angular/core';
import {WebserviceService} from '../service/webservice.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: any[] = [];

  constructor(public webService: WebserviceService, public ajaxRequest: WebserviceService) {
  }

  ngOnInit() {
    this.webService.getFilms("api/getFilms");
  }

  getStato(film: any) {
    if (film.stato === 'In sala') {
      return 'badge rounded-pill bg-danger';
    } else if (film.stato === 'Flashback') {
      return 'badge rounded-pill bg-warning';
    } else if (film.stato === 'In arrivo') {
      return 'badge rounded-pill bg-primary';
    } else {
      return '';
    }
  }
}
