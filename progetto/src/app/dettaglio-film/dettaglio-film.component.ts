import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebserviceService} from '../service/webservice.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mapToUniqueDates'
})
export class MapToUniqueDatesPipe implements PipeTransform {
  transform(value: any[]): any[] {
    const uniqueDates = value.map(proiezione => proiezione.ora_inizio.split('T')[0]).filter((value, index, self) => self.indexOf(value) === index);
    return uniqueDates;
  }
}

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {
  transform(value: any[], date: string): any[] {
    return value.filter(proiezione => proiezione.ora_inizio.split('T')[0] === date);
  }
}

@Component({
  selector: 'app-dettaglio-film',
  templateUrl: './dettaglio-film.component.html',
  styleUrls: ['./dettaglio-film.component.css']
})

export class DettaglioFilmComponent implements OnInit {
  film: any;
  proiezioni: any[] = [];

  constructor(private route: ActivatedRoute, public webService: WebserviceService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.film = await this.webService.getDettaglioFilm("api/getDettaglioFilm", {"id_film": id});
    this.proiezioni = await this.webService.getProiezioniFilm("api/getProiezioniFilm", {"id_film": id});
}

  getSala(proiezione: any) {
    if (proiezione.sala_nome === 'Sala Rossa') {
      return 'badge rounded-pill bg-danger';
    } else if (proiezione.sala_nome === 'Sala Verde') {
      return 'badge rounded-pill bg-success';
    } else if (proiezione.sala_nome === 'Sala Blu') {
      return 'badge rounded-pill bg-primary';
    } else {
      return '';
    }
  }
}
