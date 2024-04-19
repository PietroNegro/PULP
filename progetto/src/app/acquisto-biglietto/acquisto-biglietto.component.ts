import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {WebserviceService} from "../service/webservice.service";
@Component({
  selector: 'acquisto-biglietto',
  templateUrl: './acquisto-biglietto.component.html',
  styleUrls: ['./acquisto-biglietto.component.css']
})
export class AcquistoBigliettoComponent implements OnInit {
  film: any;
  data: any;
  sala: any;
  posti: any[] = [];
  costo: any;
  proiezione: any;
  prenotaError: string = '';
  prenotaSuccess: string = '';
  acquistoAvvenuto: boolean = false;
  constructor(private route: ActivatedRoute, public webService: WebserviceService) { }

  ngOnInit() {
    this.film = this.route.snapshot.paramMap.get('film');
    this.data = this.route.snapshot.paramMap.get('data');
    this.sala = this.route.snapshot.paramMap.get('sala');
    let postiParam = this.route.snapshot.paramMap.get('posti');
    this.posti = postiParam ? postiParam.split(',') : [];
    this.costo = this.route.snapshot.paramMap.get('costo');
    this.proiezione = this.route.snapshot.paramMap.get('proiezione');
  }

  async acquista() {
    const postiString = this.posti.join(', ');
    const prenotazione = {
      proiezione: parseInt(this.proiezione),
      utente: 1,
      posti: postiString,
    };
    await this.webService.inserisciPrenotazione("api/inserisciPrenotazione", prenotazione).then(data => {
        if (data) {
          this.prenotaSuccess = 'prenotazione effettuata con successo';
          this.prenotaError= '';
          this.acquistoAvvenuto = true;
        }
      },
      error => {
        this.prenotaError = 'errore di connessione al server';
      }
    );
  }
}
