import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebserviceService} from "../service/webservice.service";

@Component({
  selector: 'sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  sala: any;
  film: any;
  proiezione: any;
  prenotazioni: any[] = [];
  poltrone: any[] = [];

  countPosti: number = 0;
  costo: number = 0;

  limitePostiRaggiunto: boolean = false;

  constructor(private route: ActivatedRoute, public webService: WebserviceService) {
  }

  async ngOnInit() {
    const idSala = this.route.snapshot.paramMap.get('id_sala');
    const idFilm = this.route.snapshot.paramMap.get('id_film');
    const idProiezione = this.route.snapshot.paramMap.get('id_proiezione');

    this.sala = await this.webService.getSalaFilm("api/getSalaFilm", {"id_sala": idSala});
    this.film = await this.webService.getDettaglioFilm("api/getDettaglioFilm", {"id_film": idFilm});
    this.proiezione = await this.webService.getProiezione("api/getProiezione", {"id_proiezione": idProiezione});
    this.prenotazioni = await this.webService.getPrenotazioniProiezione("api/getPrenotazioniProiezione", {"id_proiezione": idProiezione});

    var postiOccupati: any[] = [];
    this.prenotazioni.forEach(function (prenotazione) {
      postiOccupati = postiOccupati.concat(prenotazione.posti_prenotati.split(", "));
    });

    const numeroPosti = this.sala[0].capacita;
    this.poltrone = [];
    for (let i = 0; i < numeroPosti; i++) {
      const lettera = String.fromCharCode(65 + Math.floor(i / 15));
      const numero = (i % 15) + 1;
      const postoOccupato = postiOccupati.includes(lettera + numero);
      this.poltrone.push({numero: lettera + numero, stato: postoOccupato ? 'occupato' : 'disponibile'});
    }
  }

  chunk(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  selezionaPosto(posto: any) {
    if (posto.stato === 'occupato') {
      return;
    }

    this.countPosti = this.poltrone.filter(p => p.selezionato).length;

    if (this.countPosti < 10 || posto.selezionato || !this.limitePostiRaggiunto) {
      if (this.postiVicini(posto)) {
        posto.selezionato = !posto.selezionato;
        this.countPostiSelezionati();
        this.costoTotale();
        this.limitePostiRaggiunto = this.countPosti >= 10;
      } else {
        alert('Devi selezionare posti vicini.');
      }
    } else {
      alert('Puoi selezionare al massimo 10 posti.');
    }
  }

  postiVicini(posto: any) {
    const index = this.poltrone.flat().indexOf(posto);
    const prevSelezionato = index > 0 ? this.poltrone.flat()[index - 1]?.selezionato : false;
    const nextSelezionato = index < this.poltrone.flat().length - 1 ? this.poltrone.flat()[index + 1]?.selezionato : false;

    const nessunPostoSelezionato = !this.poltrone.flat().some((posto: any) => posto.selezionato);

    return nessunPostoSelezionato || posto.selezionato || prevSelezionato || nextSelezionato;
  }

  countPostiSelezionati() {
    this.countPosti = this.poltrone.filter(p => p.selezionato).length;
  }

  costoTotale() {
    const prezzoPoltrona = this.proiezione[0].prezzo_poltrona;
    this.costo = this.countPosti * prezzoPoltrona;
  }

  getPostiSelezionati() {
    return this.poltrone.filter(p => p.selezionato).map(p => p.numero).join(',');
  }
}
