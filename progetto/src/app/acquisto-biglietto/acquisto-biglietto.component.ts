import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.film = this.route.snapshot.paramMap.get('film');
    this.data = this.route.snapshot.paramMap.get('data');
    this.sala = this.route.snapshot.paramMap.get('sala');
    let postiParam = this.route.snapshot.paramMap.get('posti');
    this.posti = postiParam ? postiParam.split(',') : [];
    this.costo = this.route.snapshot.paramMap.get('costo');
    console.log(this.costo);
  }
}
