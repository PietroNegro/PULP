import {Component, OnInit} from '@angular/core';
import {WebserviceService} from "../service/webservice.service";

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  films: any[] = [];
  constructor(public webService: WebserviceService, public ajaxRequest: WebserviceService) {}
  ngOnInit() {
    this.webService.getFilms("api/getFilms");
  }
}
