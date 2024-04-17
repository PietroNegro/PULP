import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  constructor(private connectionService: ConnectionService, private httpClient: HttpClient) {
  }

  films: any = [];

  getFilms(endPoint: string) {
    this.connectionService.sendGetRequest(endPoint).subscribe(
      (data: any) => {
        console.log(data);
        this.films = data;
      },
      (error: any) => {
        console.log('Errore GET Server Data');
        console.log(error);
      }
    );
  }

  getDettaglioFilm(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log("dettaglio film: ", data);
          resolve(data);
        },
        (error: any) => { // chiamata NON OK
          console.log("Errore Get Server Data");
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async getProiezioniFilm(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log("proiezioni film: ", data);
          resolve(data);
        },
        (error: any) => { // chiamata NON OK
          console.log("Errore Get Server Data");
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async getSalaFilm(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log("sala film: ", data);
          resolve(data);
        },
        (error: any) => { // chiamata NON OK
          console.log("Errore Get Server Data");
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async getProiezione(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          console.log("proiezione: ", data);
          resolve(data);
        },
        (error: any) => { // chiamata NON OK
          console.log("Errore Get Server Data");
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async getPrenotazioniProiezione(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
          (data: any) => {
            console.log("prenotazioni proiezione: ", data);
            resolve(data);
          },
          (error: any) => { // chiamata NON OK
            console.log("Errore Get Server Data");
            console.log(error);
            reject(error);
          }
      );
    });
  }

  async signup(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => { // chiamata NON OK
          console.log("Errore Get Server Data");
          console.log(error);
          reject(error);
        }
      );
    });
  }

  async login(endPoint: string, par: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connectionService.sendPostRequest(endPoint, par).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => { // chiamata NON OK
          console.log("Errore Get Server Data");
          console.log(error);
          reject(error);
        }
      );
    });
  }
}
